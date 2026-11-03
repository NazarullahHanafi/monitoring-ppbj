const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../../public/assets/app/app-shell.js'),'utf8');
const guard=source.slice(source.indexOf('/* BEGIN SHELL BACKGROUND READS */'),source.indexOf('/* END SHELL BACKGROUND READS */'));
const messages=source.slice(source.indexOf('            function loadMessages(initial)'),source.indexOf('            function loadOlderMessages()'));
const reactions=source.slice(source.indexOf('            function refreshVisibleReactions()'),source.indexOf('            function messageDataFromWrap('));
const approval=source.slice(source.indexOf('        /* ═══ APPROVAL PR POLLING ═══ */'));
const tick=()=>new Promise(setImmediate);
function runtime(extra=''){
    const events={},timers=new Map(),intervals=new Map(),requests=[],documentEvents={};let next=1;
    const sandbox={window:{addEventListener:(name,fn)=>(events[name]??=[]).push(fn),APP_SHELL_CONFIG:{approvalCountUrl:'/approval/count'}},
        document:{hidden:false,addEventListener:(name,fn)=>documentEvents[name]=fn,getElementById:()=>null},Map,Array,AbortController,Error,Number,
        setTimeout:(fn,delay)=>{const id=next++;timers.set(id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id),
        setInterval:(fn,delay)=>{const id=next++;intervals.set(id,{fn,delay});return id;},clearInterval:id=>intervals.delete(id),
        fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve})),chatOpen:true,chatMinimized:false,chatMaxId:12,URL_MSGS:'/chat/messages',URL_REACTIONS:'/chat/reactions',ensureReadPopupStillValid(){},closeReadPopup(){}};
    vm.createContext(sandbox);vm.runInContext(guard+'\n'+extra,sandbox);
    return {sandbox,events,documentEvents,timers,intervals,requests,begin:sandbox.window.SimonBackgroundReads.begin,respond:(i,data,status=200)=>requests[i].resolve({ok:status===200,status,json:async()=>data})};
}
test('one pending read per feature; independent features are not blocked',()=>{
    const h=runtime();const first=h.begin('chat');assert.equal(h.begin('chat'),null);assert.ok(h.begin('approval'));assert.equal(h.timers.size,2);
    first.release();assert.ok(h.begin('chat'));assert.doesNotMatch(guard,/localStorage|sessionStorage|cookie|fetch\(/);
});
test('timeout cancels a hung read and stale completion cannot unlock its replacement',()=>{
    const h=runtime();const first=h.begin('chat');const timer=[...h.timers.values()][0];assert.equal(timer.delay,20000);timer.fn();assert.equal(first.signal.aborted,true);assert.equal(first.current(),false);
    const second=h.begin('chat');first.release();assert.equal(h.begin('chat'),null);assert.equal(second.current(),true);
});
test('explicit reload supersedes previous read and pagehide cancels all feature reads',()=>{
    const h=runtime();const first=h.begin('chat');const next=h.begin('chat',true);assert.equal(first.signal.aborted,true);assert.equal(next.current(),true);
    const approval=h.begin('approval');h.events.pagehide.forEach(fn=>fn());assert.equal(next.signal.aborted,true);assert.equal(approval.signal.aborted,true);assert.equal(h.timers.size,0);assert.ok(h.begin('chat'));
});
test('slow chat polling cannot stack requests; completion allows the next poll',async()=>{
    const h=runtime(messages);h.sandbox.loadMessages(false);for(let i=0;i<10;i++)h.sandbox.loadMessages(false);assert.equal(h.requests.length,1);
    h.respond(0,{messages:[]});await tick();h.sandbox.loadMessages(false);assert.equal(h.requests.length,2);
});
test('chat makes no data requests while hidden, closed or minimized',()=>{
    const h=runtime(messages);h.sandbox.document.hidden=true;h.sandbox.loadMessages(false);h.sandbox.document.hidden=false;h.sandbox.chatMinimized=true;h.sandbox.loadMessages(false);h.sandbox.chatMinimized=false;h.sandbox.chatOpen=false;h.sandbox.loadMessages(true);assert.equal(h.requests.length,0);
    assert.match(source,/chatMinimized = true; chatFullscreen = false;\s+stopPoll\(\); stopReactionPoll\(\);/);
});
test('reopening chat aborts stale data and old finalizer cannot release the active reload',async()=>{
    const h=runtime(messages);h.sandbox.loadMessages(false);h.sandbox.loadMessages(true);assert.equal(h.requests.length,2);assert.equal(h.requests[0].options.signal.aborted,true);
    let reads=0;const old={get messages(){reads++;return [];}};h.respond(0,old);await tick();assert.equal(reads,0);h.sandbox.loadMessages(false);assert.equal(h.requests.length,2);
    h.respond(1,{},500);await tick();h.sandbox.loadMessages(false);assert.equal(h.requests.length,3);
});
test('reaction refresh is bounded, single-flight and skips hidden/minimized chat',async()=>{
    const h=runtime(reactions);h.sandbox.messagesEl={querySelectorAll:()=>Array.from({length:100},(_,i)=>({getAttribute:()=>String(i+1)}))};
    h.sandbox.refreshVisibleReactions();h.sandbox.refreshVisibleReactions();assert.equal(h.requests.length,1);assert.equal(decodeURIComponent(h.requests[0].url.split('=')[1]).split(',').length,40);
    h.respond(0,{},500);await tick();h.sandbox.chatMinimized=true;h.sandbox.refreshVisibleReactions();assert.equal(h.requests.length,1);h.sandbox.chatMinimized=false;h.sandbox.document.hidden=true;h.sandbox.refreshVisibleReactions();assert.equal(h.requests.length,1);
});
test('approval polling does not overlap and resumes once after BFCache restore',async()=>{
    const h=runtime(approval);assert.equal(h.requests.length,0);assert.equal(h.intervals.size,1);let interval=[...h.intervals.values()][0];interval.fn();interval.fn();assert.equal(h.requests.length,1);
    assert.equal(h.requests[0].options.headers['X-Requested-With'],'XMLHttpRequest');
    h.respond(0,{count:2});await tick();h.events.pagehide.forEach(fn=>fn());assert.equal(h.intervals.size,0);h.events.pageshow.forEach(fn=>fn({persisted:true}));assert.equal(h.intervals.size,1);assert.equal(h.requests.length,2);
    h.sandbox.document.hidden=true;h.documentEvents.visibilitychange();assert.equal(h.intervals.size,0);
});
