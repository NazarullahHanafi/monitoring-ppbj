const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('public/assets/app/app-shell.js','utf8');
const helpers=source.slice(source.indexOf('            function eH(s)'),source.indexOf('            function ensurePresenceScrollTools()'));
const render=source.slice(source.indexOf('            function render(u)'),source.indexOf('            function hb()'));
function runtime(enabled=true){
 const nodes=Object.fromEntries(['avatarStack','ppList','onlineCountLabel','ppCount','cpOnlineCount','myMoodFloat'].map(id=>[id,{innerHTML:'',textContent:'',hidden:true,classList:{add(){nodes[id].hidden=true;},remove(){nodes[id].hidden=false;}}}]));
 const sandbox={window:{},document:{getElementById:id=>nodes[id]||null},MO:[],CL:['#6366f1'],MA:4,MOOD_ENABLED:enabled,myM:null};
 vm.createContext(sandbox);vm.runInContext(helpers+render,sandbox);return {sandbox,nodes,render:rows=>sandbox.render(rows)};
}
const row=(extra={})=>({id:1,name:'Tester',department:'Umum',initials:'TE',color:'#123abc',mood:'Santuy',is_me:true,...extra});

test('names, initials, mood, department and action attributes are escaped in both presence surfaces',()=>{
 const h=runtime();h.render([row({name:'<img src=x>"',department:'<b>Umum</b>',initials:'<svg>',mood:'<svg/onload=1>',is_me:false})]);
 for(const id of ['avatarStack','ppList']){assert.doesNotMatch(h.nodes[id].innerHTML,/<svg|<img|<b>/);assert.match(h.nodes[id].innerHTML,/&lt;svg/);assert.match(h.nodes[id].innerHTML,/&lt;img/);assert.match(h.nodes[id].innerHTML,/&quot;/);}
 assert.match(h.nodes.ppList.innerHTML,/data-uname="&lt;img src=x&gt;&quot;"/);
});

test('invalid cache rows and optional field types do not break rendering or inject style attributes',()=>{
 const h=runtime();h.render([null,false,{},row({id:'1'}),row({id:-1}),row({id:Infinity}),row({id:2,name:[]}),row({initials:{bad:1},department:[],color:'red" onclick="bad',mood:[],is_me:'true',idle:'true'})]);
 assert.equal(h.sandbox.window._presenceUsers.length,1);assert.equal(h.nodes.ppCount.textContent,1);
 assert.match(h.nodes.avatarStack.innerHTML,/background:#6366f1/);assert.doesNotMatch(h.nodes.ppList.innerHTML,/onclick|\[object Object\]/);
 assert.equal(h.sandbox.window._presenceUsers[0].is_me,false);assert.equal(h.sandbox.window._presenceUsers[0].idle,false);
});

test('plain text, emoji and joined emoji remain readable and own mood uses textContent',()=>{
 for(const mood of ['Santuy','😄','👩‍💻']){const h=runtime();h.render([row({mood})]);assert.equal(h.nodes.myMoodFloat.textContent,mood);assert.equal(h.nodes.myMoodFloat.hidden,false);assert.equal(h.sandbox.window._myMood,mood);assert.match(h.nodes.ppList.innerHTML,new RegExp(mood));}
});

test('counts, overflow, own-account visibility and clearing an expired list stay consistent',()=>{
 const h=runtime();h.render(Array.from({length:7},(_,i)=>row({id:i+1,is_me:i===0})));assert.equal(h.nodes.ppCount.textContent,7);assert.match(h.nodes.avatarStack.innerHTML,/\+3<\/div>/);assert.equal((h.nodes.ppList.innerHTML.match(/pp-row/g)||[]).length,7);
 assert.equal((h.nodes.ppList.innerHTML.match(/pp-chat-btn/g)||[]).length,6);h.render([]);assert.equal(h.nodes.ppCount.textContent,0);assert.equal(h.nodes.avatarStack.innerHTML,'');assert.match(h.nodes.ppList.innerHTML,/Tidak ada yang online/);assert.equal(h.nodes.myMoodFloat.hidden,true);assert.equal(h.sandbox.window._myMood,null);
 const hidden=runtime(false);hidden.render([row()]);assert.equal(hidden.sandbox.window._myMood,null);assert.equal(hidden.nodes.myMoodFloat.hidden,true);
});

test('overlong mood payload is ignored and normalized public state drops unexpected private fields',()=>{
 const h=runtime();h.render([row({mood:'x'.repeat(41),email:'private@example.test',token:'secret'})]);assert.equal(h.sandbox.window._myMood,null);assert.equal(h.sandbox.window._presenceUsers[0].email,undefined);assert.equal(h.sandbox.window._presenceUsers[0].token,undefined);assert.doesNotMatch(h.nodes.ppList.innerHTML,/private@example|secret|x{41}/);
});
