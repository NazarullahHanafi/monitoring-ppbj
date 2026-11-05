// The menu and cart are local interactions; only checkout/serving changes money.
export function createDiningCart() {
    const lines = new Map();
    return {
        add(id, delta = 1) { const quantity = Math.max(0, Math.min(10, (lines.get(id) || 0) + delta)); if (quantity) { if (!lines.has(id) && lines.size >= 20) return false; lines.set(id, quantity); } else lines.delete(id); return true; },
        restore(value) { lines.clear(); for (const row of Array.isArray(value) ? value.slice(0, 20) : []) if (typeof row?.item === 'string' && Number.isInteger(row.quantity) && row.quantity > 0 && row.quantity <= 10) lines.set(row.item, row.quantity); },
        items() { return [...lines].sort(([a], [b]) => a.localeCompare(b)).map(([item, quantity]) => ({ item, quantity })); },
        total(catalog) { return this.items().reduce((sum, row) => sum + (catalog.find(i => i.id === row.item)?.price || 0) * row.quantity, 0); },
        clear() { lines.clear(); },
    };
}

export function mountOfficeDining({ document: doc, config, request, post, move, focusArea, set }) {
    const $ = id => doc.getElementById(id), cart = createDiningCart(), favorites = new Set();
    const storageKey = 'simonpr:office:bar:'+config.myId;
    let catalog = [], account = null, group = '', favoritesOnly = false, loading = null, loadedAt = 0, locked = false, selectedVenue = 'bar', pendingCheckout = null;
    const money = n => '$'+Number(n || 0).toLocaleString('en-US');
    const node = (tag, className, text) => { const el = doc.createElement(tag); el.className = className; if (text !== undefined) el.textContent = text; return el; };
    const button = (label, action, className = 'vo-button') => { const b = node('button', className, label); b.type = 'button'; b.addEventListener('click', action); return b; };
    try { const saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); cart.restore(saved.cart); for (const id of (saved.favorites || []).slice(0, 44)) if (typeof id === 'string') favorites.add(id);
        if (/^[0-9a-f-]{36}$/i.test(saved.pending?.request_id) && Array.isArray(saved.pending.items) && typeof saved.pending.destination === 'string') { pendingCheckout=saved.pending;cart.restore(pendingCheckout.items); }
    } catch {}
    function save() { try { localStorage.setItem(storageKey, JSON.stringify({cart:cart.items(), favorites:[...favorites], pending:pendingCheckout})); } catch {} }
    const descriptions = { 'ayam-pop':'Ayam pop lembut, nasi hangat, dan sambal khas Minang.', 'nasi-padang':'Sajian lengkap bercita rasa Minang untuk rehat yang istimewa.', rendang:'Daging berbumbu rempah khas Nusantara.', croissant:'Pastry berlapis keemasan, pasangan sempurna untuk kopi.', 'creme-brulee':'Custard lembut dengan permukaan karamel renyah.', boeuf:'Hidangan bistrot Prancis dengan cita rasa yang kaya.', mojito:'Mocktail mint dan citrus yang menyegarkan.', tropical:'Racikan buah tropis, disajikan tanpa alkohol.' };
    function receiptList() {
        const host = $('voBarReceipts'); if (!host) return; host.replaceChildren();
        for (const row of account?.receipts || []) {
            const detail = node('details', 'vo-bar-receipt'), summary = node('summary','', `${money(row.total)} · ${new Date(row.created_at).toLocaleString('id-ID', {timeZone:'Asia/Jakarta'})}`);
            detail.append(summary); let items = []; try { items = typeof row.items === 'string' ? JSON.parse(row.items) : row.items; } catch {}
            for (const item of Array.isArray(items) ? items.slice(0,20) : []) detail.append(node('p','',`${item.quantity} × ${item.name} · ${money(item.price * item.quantity)}`));
            detail.append(node('small','', 'No. '+row.id+' · '+(account?.destinations?.[row.destination] || row.destination))); host.append(detail);
        }
        if (!host.children.length) host.append(node('p','','Belum ada struk keranjang. Pesanan lama tetap ada di Pesanan saya.'));
    }
    function renderCart() {
        const host = $('voBarCart'); if (!host) return; host.replaceChildren();
        for (const row of cart.items()) {
            const item = catalog.find(i => i.id === row.item); if (!item) continue;
            const line = node('div','vo-cart-line'), controls = node('div','vo-cart-quantity');
            const minus = button('−', () => change(row.item,-1)), plus = button('+', () => change(row.item,1)); minus.disabled = plus.disabled = locked || Boolean(pendingCheckout);
            minus.setAttribute('aria-label','Kurangi '+item.name); plus.setAttribute('aria-label','Tambah '+item.name);
            controls.append(minus, node('span','',row.quantity), plus);
            line.append(node('b','',item.name), node('small','',money(item.price * row.quantity)), controls); host.append(line);
        }
        if (!cart.items().length) host.append(node('p','vo-cart-empty','Pilih menu favorit Anda. Menambah ke keranjang belum memotong saldo.'));
        const total = cart.total(catalog); set('voBarCartTotal',money(total)); set('voBarCartCount',cart.items().reduce((n,r)=>n+r.quantity,0)+' porsi');
        set('voShowCart',cart.items().reduce((n,r)=>n+r.quantity,0)+' porsi · '+money(total)+' · Lihat keranjang ↓');
        $('voBarCheckout').disabled = locked || !total || !account || !pendingCheckout && total > account.balance || !config.canChat;
        set('voBarCheckout',pendingCheckout?'Cek / ulang pembayaran':'Bayar keranjang');
        set('voBarCartHint', pendingCheckout ? 'Hasil pembayaran belum terkonfirmasi. Keranjang dikunci; perbarui saldo atau ulang pembayaran yang sama dengan aman.' : total > (account?.balance || 0) && account ? 'Saldo belum cukup. Kurangi pesanan sebelum membayar.' : 'Satu pembayaran untuk seluruh menu. Harga diperiksa kembali oleh server.');
        $('voRelaxPlace').disabled=locked || Boolean(pendingCheckout);
        const clear = $('voClearCart'); if (clear) clear.disabled = locked || Boolean(pendingCheckout);
    }
    function change(id, delta) { if (locked || pendingCheckout) return; if (!cart.add(id,delta)) set('voClubStatus','Keranjang maksimal 20 pilihan menu.'); save(); renderCart(); }
    function menu() {
        const groups = ['Semua',...new Set(catalog.map(i=>i.group))];
        $('voMenuGroups').replaceChildren(...groups.map(name=>{const b=button(name,()=>{group=name==='Semua'?'':name;menu();});b.setAttribute('aria-pressed',String((group||'Semua')===name));return b;}));
        const query = $('voMenuSearch').value.trim().toLocaleLowerCase('id');
        const list = catalog.filter(i=>(!group||i.group===group)&&(!favoritesOnly||favorites.has(i.id))&&i.name.toLocaleLowerCase('id').includes(query));
        $('voFoodMenu').replaceChildren(...list.map(item=>{
            const card=node('article','vo-menu-card'), art=node('div','vo-menu-art '+(item.kind==='drink'?'vo-menu-drink':'vo-menu-food'));
            art.setAttribute('aria-hidden','true'); art.append(node('span','',item.kind==='drink'?(item.group==='Kopi & teh'?'☕':'🍹'):item.group==='Boulangerie & dessert'?'🥐':'🍽'));
            const favorite=button(favorites.has(item.id)?'♥':'♡',()=>{favorites.has(item.id)?favorites.delete(item.id):favorites.add(item.id);save();menu();},'vo-menu-favorite');
            favorite.setAttribute('aria-label',(favorites.has(item.id)?'Hapus favorit ':'Favoritkan ')+item.name);favorite.setAttribute('aria-pressed',String(favorites.has(item.id)));art.append(favorite);
            const add=button('+ Keranjang',()=>change(item.id,1),'vo-menu-add');add.disabled=!config.canChat||locked||Boolean(pendingCheckout);
            card.append(art,node('small','',item.group),node('h4','',item.name),node('p','',descriptions[item.id]||(item.kind==='drink'?'Racikan pilihan Maison du Rivage. Dinikmati dingin atau hangat sesuai sajian.':'Pilihan dapur Maison du Rivage, disiapkan untuk menemani waktu santai.')),node('b','',money(item.price)),add);return card;
        }));
        if (!list.length) $('voFoodMenu').append(node('p','','Belum ada menu yang cocok. Coba kategori atau pencarian lain.'));
        set('voMenuResult',list.length+' pilihan · semua harga memakai dolar virtual'); renderCart();
    }
    function balance(data) {
        account={...account,...data};
        if(pendingCheckout&&(account.receipts||[]).some(r=>r.id===pendingCheckout.request_id)){pendingCheckout=null;cart.clear();save();}
        set('voWallet',money(account.balance)+' · virtual');set('voDineBalance',money(account.balance));
        $('voWalletHistory').replaceChildren(...(account.ledger||[]).map(row=>node('p','',`${new Date(row.created_at).toLocaleString('id-ID',{timeZone:'Asia/Jakarta'})} · ${row.amount>0?'+':''}${money(row.amount)} · ${row.reference.startsWith('daily:')?'Bonus harian':'Pesanan'} · saldo ${money(row.balance)}`)));
        $('voMyOrders').replaceChildren(...(account.orders||[]).map(row=>{
            const item=catalog.find(i=>i.id===row.item),host=node('div',''),b=button('Nikmati di '+$('voRelaxPlace').selectedOptions[0].textContent,async()=>{
                if(locked)return;const destination=$('voRelaxPlace').value,result=await post('/virtual-office/recreation/consume',{id:row.id,destination},true);
                if(result){balance(result);move(destination,item?.kind||'drink',row.item,false);set('voClubStatus','Selamat menikmati '+(item?.name||row.item)+'. Satu porsi digunakan.');}
            });host.append(node('span','',`${item?.name||row.item} · ${row.remaining} porsi`),b);return host;
        }));if(!account.orders?.length)$('voMyOrders').append(node('p','','Belum ada pesanan tersimpan.'));renderCart();receiptList();
    }
    async function load(force=false) {
        if(!config.canChat){set('voClubStatus','Mode Viewer: Anda dapat melihat suasana bar. Pembelian tersedia untuk akun anggota.');return;}
        if(loading)return loading;if(!force&&account&&Date.now()-loadedAt<60000){menu();return;}
        const controller=new AbortController(),deadline=setTimeout(()=>controller.abort(),12000);
        loading=(async()=>{try{const data=await request('/virtual-office/recreation',null,controller.signal);catalog=data.catalog||[];
            cart.restore(cart.items().filter(r=>catalog.some(i=>i.id===r.item)));save();balance(data);menu();loadedAt=Date.now();
            set('voDailyBonus',`Bonus $1.000 virtual untuk ${data.awarded_on || 'hari berikutnya'} (WIB). Sekali sehari; tidak dapat diuangkan.`);
            set('voClubStatus','La Carte siap. Pilih beberapa menu, lalu bayar keranjang sekali.');
        }catch(error){set('voClubStatus',error.message);}finally{clearTimeout(deadline);loading=null;}})();return loading;
    }
    function venue(value) { selectedVenue=value==='disco'?'disco':'bar'; set('voBarVenueName',selectedVenue==='disco'?'Éclipse. After hours.':'Maison du Rivage.');
        $('voBarHero')?.setAttribute('data-venue',selectedVenue); doc.querySelectorAll('[data-vo-venue]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.voVenue===selectedVenue)));
        focusArea(selectedVenue); if(config.canChat)move(selectedVenue,selectedVenue==='disco'?'dance':'relax'); }
    doc.querySelectorAll('[data-vo-venue]').forEach(b=>b.addEventListener('click',()=>venue(b.dataset.voVenue)));
    $('voMenuSearch').addEventListener('input',menu);$('voRelaxPlace').addEventListener('change',()=>{if(account)balance(account);});
    $('voShowCart').addEventListener('click',()=>$('voBarCartAside').scrollIntoView?.({block:'start'}));
    $('voBackToMenu').addEventListener('click',()=>$('voMenuGroups').scrollIntoView?.({block:'start'}));
    $('voOnlyFavorites').addEventListener('click',()=>{favoritesOnly=!favoritesOnly;$('voOnlyFavorites').setAttribute('aria-pressed',String(favoritesOnly));menu();});
    $('voClearCart').addEventListener('click',()=>{if(!locked&&!pendingCheckout){cart.clear();save();renderCart();}});
    $('voRefreshWallet').addEventListener('click',()=>load(true));
    $('voBarCheckout').addEventListener('click',async()=>{
        if(locked||!cart.items().length)return;locked=true;renderCart();menu();
        pendingCheckout ||= {request_id:globalThis.crypto.randomUUID(),items:cart.items(),destination:$('voRelaxPlace').value};save();
        try{const result=await post('/virtual-office/recreation/checkout',pendingCheckout,true);if(result){pendingCheckout=null;cart.clear();save();balance(result);set('voClubStatus',`Pesanan dibayar. Struk ${result.receipt_id.slice(0,8).toUpperCase()} tersedia; pilih Nikmati di Pesanan saya.`);}
            else if([400,403,404,409,422].includes(post.lastError?.status)){pendingCheckout=null;save();}}
        finally{locked=false;renderCart();menu();}
    });
    return { load, balance, venue, open(){focusArea(selectedVenue);return load();} };
}
