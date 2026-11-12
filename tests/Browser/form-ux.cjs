const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
    const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
    try{
        for(const mobile of [false,true]){
            const page=await browser.newPage({viewport:mobile?{width:390,height:844}:{width:1100,height:850}});const errors=[],native=[];
            page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{native.push(d.type());d.dismiss();});
            await page.setContent('<html><head><style>body{font:14px Arial;padding:24px;background:#f2f6f8}form{background:white;border-radius:16px;padding:24px;max-width:640px;margin:auto}label{display:block;margin:18px 0}input{display:block;padding:12px;border:1px solid #b6c9d1;border-radius:8px;box-sizing:border-box;max-width:100%;width:100%}button{padding:12px;border-radius:9px;border:1px solid #adc8cf;background:#087c73;color:white}</style></head><body><form><h1>Informasi vendor</h1><label for="name">Nama vendor</label><input id="name" name="name" required aria-describedby="nameHelp"><small id="nameHelp">Gunakan nama sesuai dokumen.</small><label for="email">Email perusahaan</label><input id="email" name="email" type="email" required><button>Simpan</button></form><script>window.saves=0;document.querySelector("form").addEventListener("submit",e=>{e.preventDefault();window.saves++;});</script></body></html>');
            await page.addStyleTag({path:'public/assets/app/form-ux.css'});await page.addScriptTag({path:'public/assets/app/form-ux.js'});
            await page.getByRole('button',{name:'Simpan',exact:true}).click();await page.locator('.ux-error-summary').waitFor();
            assert.equal(await page.locator('[aria-invalid=true]').count(),2);assert.equal(await page.evaluate(()=>saves),0);
            assert.equal(await page.locator('#name').evaluate(el=>el===document.activeElement),true);
            assert.match(await page.locator('#name').getAttribute('aria-describedby'),/nameHelp uxError/);
            await page.locator('#name').fill('CV Dokumen Aman');await page.locator('#email').fill('email-belum-lengkap');
            await page.getByRole('button',{name:'Simpan',exact:true}).click();await page.getByText('Masukkan alamat email yang lengkap',{exact:false}).waitFor();
            await page.screenshot({path:`tmp/form-ux-${mobile?'mobile':'desktop'}.png`});
            await page.locator('#email').fill('vendor@example.test');await page.getByRole('button',{name:'Simpan',exact:true}).click();assert.equal(await page.evaluate(()=>saves),1);
            assert.equal(await page.locator('#name').getAttribute('aria-describedby'),'nameHelp');
            await page.evaluate(()=>window.FormUX.errors(document.querySelector('form'),{name:'<img src=x onerror=alert(1)> Nama sudah digunakan.'}));
            assert.equal(await page.locator('.ux-field-error img').count(),0);assert.match(await page.locator('.ux-field-error').innerText(),/Nama sudah/);
            await page.evaluate(()=>{window.decision=window.FormUX.confirm({title:'Hapus lampiran?',text:'Dokumen perusahaan akan dihapus.',accept:'Hapus',danger:true});});
            await page.locator('.ux-confirm').waitFor();await page.locator('.ux-confirm button').first().click();assert.equal(await page.evaluate(()=>window.decision),false);
            await page.evaluate(()=>{window.decision=window.FormUX.confirm({title:'Simpan perubahan?',text:'Teks telah diperiksa.',accept:'Simpan'});});
            await page.locator('.ux-confirm .ux-accept').click();assert.equal(await page.evaluate(()=>window.decision),true);
            assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(native,[]);assert.deepEqual(errors,[]);
            console.log(`FORM_UX_OK mobile=${mobile} native_popups=0 validation_accessible=true server_errors_safe=true confirmations=true`);await page.close();
        }
    }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
