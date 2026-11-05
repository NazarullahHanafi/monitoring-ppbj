import { createChess } from './virtual-office-chess.js';

export const playInstructions = {
    archery: 'Panahan · geser bidikan ke sasaran. Atur kekuatan; gravitasi memengaruhi terbang anak panah. Tekan Tembak atau klik sasaran. 5 anak panah per ronde.',
    billiards: 'Biliar latihan · arah 0–100 mengelilingi meja 360°. Stik di belakang bola putih menunjukkan arah pukulan. Atur kekuatan lalu pukul; bola harus benar-benar masuk lubang.',
    badminton: 'Badminton · dua pemain. Geser raket ke posisi kok masuk (penanda emas), arahkan pengembalian dan atur kekuatan 18–94%. Duel online memakai giliran tersinkron server; 21 poin, selisih 2.',
    tennis: 'Tenis arcade · gerakkan raket dengan penunjuk atau penggeser posisi. Tekan pukul untuk servis. Dalam duel online, temui bola di penanda emas lalu kirim pukulan bergiliran.',
    pingpong: 'Tenis meja · gerakkan bet untuk mengembalikan bola. Pukulan tidak boleh menembus net: bola melintas di atas net. Duel online bergiliran sampai 11 poin.',
    foosball: 'Foosball · gerakkan batang pemain dengan penunjuk atau penggeser. Tekan pukul untuk memulai bola. Tujuh gol memenangkan latihan.',
    basketball: 'Basket · arah menggeser sudut lemparan; kekuatan menentukan jarak. Bola perlu melintasi ring dari atas. Sepuluh tembakan per ronde.',
    golf: 'Mini golf · bidik dan pukul bola melewati rintangan sampai masuk lubang. Arah 0–100 = 360°. Sedikit pukulan lebih baik.',
    bowling: 'Bowling · arah menentukan posisi bola di lintasan, kekuatan menentukan laju. Bola menjatuhkan pin hanya jika menyentuhnya. Sepuluh lemparan.',
    darts: 'Dart · bidik papan dengan penunjuk atau penggeser arah. Kekuatan mengatur tinggi lemparan. Lima dart; semakin dekat pusat semakin tinggi poin.',
    arcade: 'Arcade Racing · arah kiri/kanan atau tombol panah untuk pindah lajur. Kekuatan mengatur kecepatan. Hindari mobil lain selama 60 detik. Klik Mulai untuk berjalan.',
    uno: 'UNO latihan · pilih kartu dengan warna atau angka yang sama, atau Wild. +2/+4 menarik kartu dan melewati giliran; Skip/Reverse melewati lawan. Tekan tombol aksi untuk menarik kartu. Pertama habis menang.',
    chess: 'Catur latihan · Anda putih. Klik bidak lalu kotak tujuan yang ditandai, atau pilih langkah dengan tombol. Rokade, en passant, skak dan skakmat berlaku. Promosi otomatis menjadi menteri.',
};
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
export function createOfficePlay({ canvas, onScore = () => {}, onStatus = () => {}, onCards = () => {}, controls = () => ({ aim: .5, power: .6, racket: .5 }), onPointer = () => {}, random = Math.random, raf = requestAnimationFrame, caf = cancelAnimationFrame }) {
    const ctx = canvas.getContext('2d'); let kind = 'archery', frame = null, active = false, last = 0, state = {}, pointer = null, network = null, chosen = -1, shot = null, flight = null;
    function circle(x, y, r, fill, stroke) { ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); } }
    function line(x,y,xx,yy,color,width=2) { ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(xx,yy); ctx.strokeStyle=color; ctx.lineWidth=width; ctx.stroke(); }
    function label(text,x,y,color='#f4eddc',size=20) { ctx.fillStyle=color; ctx.font=`${size}px system-ui`; ctx.fillText(text,x,y); }
    function reset(value = kind) {
        kind = Object.hasOwn(playInstructions,value) ? value : 'archery'; network = null; chosen = -1; shot = null; pointer = null;
        state = { score:0, tries:0, moving:false, balls:[], time:0, hits:0, done:false, player:.5, cpu:.5, ball:{x:400,y:320,vx:0,vy:0}, pins:[], traffic:[], hand:[], ai:[] };
        if (kind === 'billiards') { state.balls.push({x:230,y:240,vx:0,vy:0,color:'#fff',cue:true}); for(let r=0;r<4;r++) for(let n=0;n<=r;n++) state.balls.push({x:510+r*19,y:240+(n-r/2)*22,vx:0,vy:0,color:['#e7bb5e','#ca7462','#6685ab','#ad8cbb'][n%4]}); }
        if (kind === 'golf') state.balls = [{x:130,y:350,vx:0,vy:0,color:'#fff'}];
        if (kind === 'bowling') resetPins();
        if (kind === 'chess') state.chess = createChess();
        if (kind === 'uno') { state.deck=[]; for(const color of ['red','blue','green','gold']) { for(let n=0;n<10;n++) for(let k=0;k<(n?2:1);k++) state.deck.push({color,n}); for(const n of ['+2','skip','reverse']) for(let k=0;k<2;k++) state.deck.push({color,n}); } for(let k=0;k<4;k++) state.deck.push({color:'wild',n:'W'},{color:'wild',n:'+4'}); for(let i=state.deck.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[state.deck[i],state.deck[j]]=[state.deck[j],state.deck[i]];} state.hand=state.deck.splice(0,7);state.ai=state.deck.splice(0,7);state.discard=[{color:'red',n:3}];state.top=state.discard[0];state.color='red'; }
        onStatus(playInstructions[kind]); cards(); score(); draw();
    }
    function resetPins(){ state.pins=[];for(let r=0;r<4;r++)for(let n=0;n<=r;n++)state.pins.push({x:400+(n-r/2)*38,y:130-r*26,down:false}); }
    function drawCards(hand,count){ if(!state.deck.length){const top=state.discard.pop();state.deck=state.discard.reverse();state.discard=[top];}for(let i=0;i<count;i++){const c=state.deck.pop();if(c)hand.push(c);} }
    function legalCard(c){return c.color==='wild'||c.color===state.color||c.n===state.top.n;}
    function playCard(hand,index){const c=hand.splice(index,1)[0];state.top=c;state.discard.push(c);state.color=c.color==='wild'?(hand.find(c=>c.color!=='wild')?.color||'blue'):c.color;return c;}
    function cpuUno(){if(!state.ai.length||!state.hand.length)return;let i=state.ai.findIndex(legalCard);if(i<0){drawCards(state.ai,1);i=state.ai.findIndex(legalCard);}if(i>=0){const c=playCard(state.ai,i);if(c.n==='+2'||c.n==='+4'){drawCards(state.hand,c.n==='+2'?2:4);cpuUno();}else if(['skip','reverse'].includes(c.n))cpuUno();} }
    function cards(){
        if(kind==='uno') onCards(state.hand.map((c,i)=>({label:`${{red:'Merah',blue:'Biru',green:'Hijau',gold:'Kuning',wild:'Wild'}[c.color]} ${c.n}`,disabled:state.done||!legalCard(c),action:()=>{const card=playCard(state.hand,i);if(state.hand.length){if(card.n==='+2'||card.n==='+4')drawCards(state.ai,card.n==='+2'?2:4);else if(!['skip','reverse'].includes(card.n))cpuUno();}state.done=!state.hand.length||!state.ai.length;cards();score();draw();}})));
        else if(kind==='chess') { const square=i=>'abcdefgh'[i%8]+(8-(i>>3)); onCards(state.chess.finished()?[]:state.chess.all().slice(0,60).map(m=>({label:`${square(m.from)} → ${square(m.to)}`,disabled:state.chess.turn()!=='w',action:()=>chessMove(m.from,m.to)}))); }
        else onCards([]);
    }
    function chessMove(from,to){if(state.chess.turn()!=='w'||!state.chess.move(from,to))return;state.chess.bot();chosen=-1;cards();score();draw();}
    function score(){
        if(network){onScore(`${network.score[0]} : ${network.score[1]} · ${network.status==='finished'?'Selesai':`Rally ${network.rally}`} ${network.bot?'· NPC':''}`);return;}
        if(kind==='chess')onScore(state.chess.status());
        else if(kind==='uno')onScore(state.done?(!state.hand.length?'Anda menang!':'Komputer menang'): `Anda ${state.hand.length} kartu · Komputer ${state.ai.length} kartu`);
        else if(['badminton','tennis','pingpong','foosball'].includes(kind))onScore(`${state.score} : ${state.hits} · latihan vs komputer`);
        else if(kind==='golf')onScore(`${state.tries} pukulan${state.done?' · masuk lubang!':''}`);
        else if(kind==='billiards')onScore(`${state.score}/10 bola · ${state.tries} pukulan`);
        else if(kind==='arcade')onScore(`${Math.floor(state.time)} / 60 detik · ${state.hits} tabrakan`);
        else onScore(`${state.score} poin · ${state.tries}/${kind==='basketball'||kind==='bowling'?10:5}${state.done?' · ronde selesai':''}`);
    }
    function action(){
        if(network||state.done)return;
        const {aim,power}=controls();
        if(kind==='chess')return;
        if(kind==='uno'){drawCards(state.hand,1);cpuUno();state.done=!state.ai.length;cards();score();draw();return;}
        if(state.moving)return;
        if(kind==='billiards'||kind==='golf'){const b=kind==='billiards'?state.balls.find(b=>b.cue):state.balls[0];if(!b)return;const a=aim*Math.PI*2;b.vx=Math.cos(a)*power*680;b.vy=Math.sin(a)*power*680;state.tries++;state.moving=true;}
        else if(['badminton','tennis','pingpong','foosball'].includes(kind)){state.ball={x:400,y:365,vx:(aim-.5)*340,vy:-230-power*200};state.moving=true;}
        else if(kind==='arcade'){state.moving=true;}
        else if(kind==='bowling'){state.ball={x:240+aim*320,y:420,vx:0,vy:-180-power*480};state.moving=true;state.tries++;if(state.pins.every(p=>p.down))resetPins();}
        else if(kind==='basketball'){const a=-Math.PI*.1-aim*Math.PI*.65;state.ball={x:110,y:380,vx:Math.cos(a)*(350+power*500),vy:Math.sin(a)*(350+power*500)};state.moving=true;state.tries++;state.scored=false;}
        else {const target=pointer||{x:170+aim*470,y:150+(1-power)*230};const dx=target.x-90,dy=target.y-390;const duration=.45+power*.45;state.ball={x:90,y:390,vx:dx/duration,vy:dy/duration-(kind==='archery'?145:0),life:0,duration};state.moving=true;state.tries++;}
        score();draw();
    }
    function step(dt){
        if(network||!state.moving)return;
        const {aim,power,racket}=controls();
        if(kind==='billiards'||kind==='golf'){
            // Substeps keep fast balls from tunnelling through balls and rails.
            const steps=Math.max(1,Math.ceil(dt/.006));for(let s=0;s<steps;s++){
                const delta=dt/steps;
                for(const b of state.balls){b.x+=b.vx*delta;b.y+=b.vy*delta;b.vx*=Math.exp(-1.15*delta);b.vy*=Math.exp(-1.15*delta);
                    if(b.x<60||b.x>740){b.x=clamp(b.x,60,740);b.vx*=-.88;}if(b.y<65||b.y>415){b.y=clamp(b.y,65,415);b.vy*=-.88;}
                    if(kind==='golf'&&b.x>350&&b.x<385&&b.y>145&&b.y<360){b.x=b.vx>0?350:385;b.vx*=-.8;}
                }
                for(let i=0;i<state.balls.length;i++)for(let j=i+1;j<state.balls.length;j++){const a=state.balls[i],b=state.balls[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d>0&&d<20){const nx=dx/d,ny=dy/d,v=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;if(v>0){a.vx-=v*nx;a.vy-=v*ny;b.vx+=v*nx;b.vy+=v*ny;}const push=(20-d)/2;a.x-=nx*push;a.y-=ny*push;b.x+=nx*push;b.y+=ny*push;}}
                if(kind==='billiards'){const pockets=[[62,65],[400,65],[738,65],[62,415],[400,415],[738,415]];state.balls=state.balls.filter(b=>{if(!pockets.some(p=>Math.hypot(b.x-p[0],b.y-p[1])<21))return true;if(b.cue){b.x=230;b.y=240;b.vx=b.vy=0;onStatus('Bola putih masuk. Diletakkan kembali tanpa poin.');return true;}state.score++;return false;});}
                else if(Math.hypot(state.balls[0].x-670,state.balls[0].y-130)<18&&Math.hypot(state.balls[0].vx,state.balls[0].vy)<240){state.done=true;state.moving=false;state.balls[0].vx=state.balls[0].vy=0;}
            }
            if(!state.balls.some(b=>Math.hypot(b.vx,b.vy)>4))state.moving=false;
            if(kind==='billiards'&&state.balls.length===1){state.done=true;state.moving=false;}
        }else if(['badminton','tennis','pingpong','foosball'].includes(kind)){
            const b=state.ball;state.player=racket;state.cpu+=clamp(b.x/800-state.cpu,-dt*.48,dt*.48);b.x+=b.vx*dt;b.y+=b.vy*dt;
            if(b.x<55||b.x>745){b.x=clamp(b.x,55,745);b.vx*=-1;}
            if(b.vy<0&&b.y<100&&Math.abs(b.x-(80+state.cpu*640))<65){b.vy=Math.abs(b.vy);b.vx+=(random()-.5)*150;}
            if(b.vy>0&&b.y>380&&Math.abs(b.x-(80+racket*640))<65){b.vy=-Math.min(530,Math.abs(b.vy)+12);b.vx=(aim-.5)*500;}
            if(b.y<40||b.y>445){if(b.y<40)state.score++;else state.hits++;state.moving=false;if(Math.max(state.score,state.hits)>=(kind==='badminton'?21:kind==='foosball'?7:11))state.done=true;}
        }else if(kind==='arcade'){
            state.time+=dt;const speed=160+power*270;state.player=aim;
            if(Math.floor(state.time/.9)!==Math.floor((state.time-dt)/.9))state.traffic.push({x:225+Math.floor(random()*3)*175,y:-60});
            for(const car of state.traffic){car.y+=speed*dt;if(!car.hit&&Math.abs(car.x-(225+aim*350))<60&&Math.abs(car.y-385)<60){car.hit=true;state.hits++;}}
            state.traffic=state.traffic.filter(c=>c.y<550);if(state.time>=60){state.done=true;state.moving=false;}
        }else{
            const b=state.ball,oldY=b.y;b.x+=b.vx*dt;b.y+=b.vy*dt;
            if(kind==='basketball'){b.vy+=650*dt;if(!state.scored&&b.vy>0&&oldY<155&&b.y>=155&&Math.abs(b.x-650)<34){state.score+=2;state.scored=true;}if(b.x>790||b.y>490){state.moving=false;state.done=state.tries>=10;}}
            else if(kind==='bowling'){for(const p of state.pins)if(!p.down&&Math.hypot(p.x-b.x,p.y-b.y)<30){p.down=true;state.score++;for(const q of state.pins)if(!q.down&&Math.hypot(p.x-q.x,p.y-q.y)<43&&power>.45){q.down=true;state.score++;}}if(b.y<0){state.moving=false;state.done=state.tries>=10;}}
            else {b.life+=dt;if(kind==='archery')b.vy+=290*dt;if(b.life>=b.duration){const d=Math.hypot(b.x-540,b.y-210),points=d<18?10:d<40?8:d<65?6:d<95?4:d<120?2:0;state.score+=points;shot={x:b.x,y:b.y};state.moving=false;state.done=state.tries>=5;onStatus(`${points} poin · ${kind==='archery'?'anak panah':'dart'} mendarat. ${state.done?'Ronde selesai; tekan Ulang latihan.':'Bidik lagi.'}`);}}
        }
        score();
    }
    function draw(){
        if(!ctx)return;ctx.clearRect(0,0,800,480);ctx.fillStyle='#153e35';ctx.fillRect(0,0,800,480);
        if(kind==='chess'){
            const icons={k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟',K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙'},legal=chosen<0?[]:state.chess.moves(chosen);
            for(let i=0;i<64;i++){const x=160+i%8*60,y=(i>>3)*60;ctx.fillStyle=(i+(i>>3))%2?'#729286':'#e8dfc9';ctx.fillRect(x,y,60,60);if(i===chosen||legal.includes(i)){ctx.fillStyle='#e4b65a88';ctx.fillRect(x,y,60,60);}if(state.chess.board[i])label(icons[state.chess.board[i]],x+9,y+46,state.chess.board[i]===state.chess.board[i].toUpperCase()?'#fff8e6':'#183b33',45);}
        }else if(kind==='uno'){ctx.fillStyle='#bc7664';ctx.fillRect(330,150,140,190);label(String(state.top.n),365,250,'#fff',50);label(`Warna: ${{red:'merah',blue:'biru',green:'hijau',gold:'kuning'}[state.color]}`,300,390);label(`${state.ai.length} kartu lawan`,310,80);}
        else if(kind==='archery'||kind==='darts'){
            for(const [r,c] of [[120,'#eae5d7'],[95,'#263b43'],[65,'#4c8aa1'],[40,'#c46e62'],[18,'#ebc66b']])circle(540,210,r,c);
            line(90,345,90,430,'#d6b784',5);ctx.beginPath();ctx.arc(70,390,47,-1.1,1.1);ctx.strokeStyle='#d6b784';ctx.lineWidth=5;ctx.stroke();
            const target=pointer||{x:170+controls().aim*470,y:150+(1-controls().power)*230};line(target.x-12,target.y,target.x+12,target.y,'#fff');line(target.x,target.y-12,target.x,target.y+12,'#fff');
            if(state.moving||shot){const b=state.moving?state.ball:shot;line(b.x-28,b.y+10,b.x,b.y,'#e7bb5e',4);line(b.x-6,b.y-1,b.x,b.y,'#fff',3);}
        }else if(kind==='billiards'||kind==='golf'){
            ctx.strokeStyle='#b18d5f';ctx.lineWidth=20;ctx.strokeRect(45,50,710,380);
            if(kind==='billiards')for(const [x,y]of [[62,65],[400,65],[738,65],[62,415],[400,415],[738,415]])circle(x,y,20,'#0b201a');
            else{circle(670,130,18,'#0b201a');line(670,130,670,65,'#d6b784');ctx.fillStyle='#c57662';ctx.fillRect(670,65,35,20);ctx.fillStyle='#b18d5f';ctx.fillRect(360,155,15,195);}
            for(const b of state.balls)circle(b.x,b.y,10,b.color);
            if(!state.moving){const b=state.balls[0],a=controls().aim*Math.PI*2;if(b){line(b.x-Math.cos(a)*30,b.y-Math.sin(a)*30,b.x-Math.cos(a)*150,b.y-Math.sin(a)*150,'#dfbb84',5);line(b.x,b.y,b.x+Math.cos(a)*90,b.y+Math.sin(a)*90,'#ffffff55',1);}}
        }else if(['badminton','tennis','pingpong','foosball'].includes(kind)){
            ctx.strokeStyle='#f2e8d5';ctx.lineWidth=2;ctx.strokeRect(55,40,690,400);line(55,240,745,240,'#d4d2bd',4);
            for(let x=60;x<745;x+=22)line(x,230,x,250,'#a1b9a4',1);
            const p=network?controls().racket:state.player,c=network?network.target:state.cpu;
            circle(80+p*640,380,30,'#dfbc77');line(80+p*640,400,80+p*640,437,'#d4c5a4',5);
            circle(80+c*640,100,30,'#87afb0');line(80+c*640,60,80+c*640,80,'#d4c5a4',5);
            if(network){line(80+network.target*640,350,80+network.target*640,415,'#f1c361',3);label('Posisikan raket di penanda emas',175,465,'#f3d696',18);}
            const progress=flight?clamp((Date.now()-flight.started)/900,0,1):1;
            const b=network?(flight&&progress<1?{x:80+(flight.from+(flight.to-flight.from)*progress)*640,y:380-progress*280-Math.sin(progress*Math.PI)*70}:{x:80+network.target*640,y:320}):state.ball;circle(b.x,b.y,kind==='badminton'?6:9,'#fff5d8');if(kind==='badminton'){line(b.x,b.y,b.x-8,b.y-15,'#fff');line(b.x,b.y,b.x+8,b.y-15,'#fff');}
        }else if(kind==='basketball'){
            ctx.fillStyle='#dfd2ac';ctx.fillRect(690,75,12,140);line(614,155,686,155,'#f2b565',6);for(let i=0;i<5;i++)line(619+i*15,157,629+i*10,197,'#d2dbcd',1);circle(state.ball.x,state.ball.y,16,'#d18b4d');
        }else if(kind==='bowling'){
            ctx.fillStyle='#bb9c70';ctx.fillRect(220,0,360,480);for(const p of state.pins){circle(p.x,p.y,p.down?8:13,p.down?'#8b7d65':'#fff0db');if(!p.down)line(p.x-8,p.y,p.x+8,p.y,'#c66d61',4);}circle(state.ball.x,state.ball.y,19,'#615a86');
        }else if(kind==='arcade'){
            ctx.fillStyle='#30493f';ctx.fillRect(140,0,520,480);for(let x=312;x<650;x+=175)for(let y=(state.time*220)%80-80;y<480;y+=80)line(x,y,x,y+40,'#e7dfbf',4);
            ctx.fillStyle='#e0bc74';ctx.fillRect(200+controls().aim*350,350,50,80);for(const c of state.traffic){ctx.fillStyle=c.hit?'#85665b':'#b96e62';ctx.fillRect(c.x-25,c.y-40,50,80);}
        }
        if(state.done)label('Ronde selesai · Ulang untuk bermain lagi',180,30,'#f1cf88',20);
    }
    function loop(now){frame=null;if(!active)return;if(last&&now-last<1000/30){frame=raf(loop);return;}const dt=last?Math.min(.04,(now-last)/1000):0;last=now;step(dt);draw();frame=raf(loop);}
    const move=e=>{const rect=canvas.getBoundingClientRect();pointer={x:clamp((e.clientX-rect.left)/rect.width*800,0,800),y:clamp((e.clientY-rect.top)/rect.height*480,0,480)};onPointer(pointer.x/800);draw();};
    const click=e=>{move(e);if(kind==='chess'){const c=Math.floor((pointer.x-160)/60),r=Math.floor(pointer.y/60);if(c<0||c>7||r<0||r>7)return;const i=r*8+c;if(chosen>=0&&state.chess.moves(chosen).includes(i))chessMove(chosen,i);else chosen=state.chess.board[i]===state.chess.board[i]?.toUpperCase()?i:-1;draw();}};
    canvas.addEventListener('pointermove',move);canvas.addEventListener('click',click);
    reset();
    return {reset,action,draw,kind:()=>kind,state:()=>state,
        network(value){if(value?.shot&&value.revision!==network?.revision)flight={...value.shot,started:Date.now()};network=value;if(value){kind=value.kind;score();draw();}},
        visible(value){active=Boolean(value);if(!active&&frame!==null){caf(frame);frame=null;}else if(active&&frame===null){last=0;frame=raf(loop);}},
        dispose(){active=false;if(frame!==null)caf(frame);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('click',click);},
        step(dt){step(Math.min(.04,dt));return state;}
    };
}
