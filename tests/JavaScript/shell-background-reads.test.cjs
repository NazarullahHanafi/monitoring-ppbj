const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../../public/assets/app/app-shell.js'),'utf8');
const guard=source.slice(source.indexOf('/* BEGIN SHELL BACKGROUND READS */'),source.indexOf('/* END SHELL BACKGROUND READS */'));
const messages=source.slice(source.indexOf('            function loadMessages(initial, catchUpBudget)'),source.indexOf('            function loadOlderMessages()'));
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

test('hidden tabs cancel all pending reads and searches can be cancelled independently',()=>{
    const h=runtime();const first=h.begin('chat-search'),second=h.begin('chat-users');h.sandbox.window.SimonBackgroundReads.cancel('chat-search');
    assert.equal(first.signal.aborted,true);assert.equal(second.signal.aborted,false);
    h.sandbox.document.hidden=true;h.documentEvents.visibilitychange();assert.equal(second.signal.aborted,true);assert.equal(h.timers.size,0);
});

test('a cleared or replaced search ignores late responses and shares the bounded read deadline',async()=>{
    const start=source.indexOf('            function runSearch(query)');const search=source.slice(start,source.indexOf('            updateNotifyButton();',start));
    const h=runtime(search);Object.assign(h.sandbox,{URL_SEARCH:'/chat/search',searchStatus:{textContent:''},searchResults:{innerHTML:''},searchSequence:0,renderSearchResults:(rows,q)=>{h.sandbox.rendered=q;}});
    h.sandbox.runSearch('plastik');h.sandbox.runSearch('kursi');assert.equal(h.requests[0].options.signal.aborted,true);
    h.respond(0,{messages:[]});await tick();assert.equal(h.sandbox.rendered,undefined);
    h.sandbox.runSearch('');assert.equal(h.requests[1].options.signal.aborted,true);h.respond(1,{messages:[]});await tick();assert.equal(h.sandbox.rendered,undefined);
    assert.equal(h.requests.length,2);assert.equal(h.timers.size,0);
    h.sandbox.runSearch('ulang');const timeout=[...h.timers.values()][0];timeout.fn();h.respond(2,{},500);await tick();assert.match(h.sandbox.searchStatus.textContent,/dihentikan/);
});

test('typing mentions shares one directory request and never caches a cancelled response',async()=>{
    const users=source.slice(source.indexOf('            var usersRequest = null;'),source.indexOf('            function getQuickMoodReply()'));
    const h=runtime(users);Object.assign(h.sandbox,{allUsersLoaded:null,URL_USERS:'/chat/users',UCLS:['blue']});
    const first=h.sandbox.getAllUsers(),second=h.sandbox.getAllUsers();assert.equal(first,second);assert.equal(h.requests.length,1);
    h.events.pagehide.forEach(fn=>fn());h.respond(0,[{id:2,name:'Stale'}]);await first;assert.equal(h.sandbox.allUsersLoaded,null);
    const fresh=h.sandbox.getAllUsers();h.respond(1,[{id:2,name:'Current'}]);await fresh;assert.equal(h.sandbox.allUsersLoaded[0].name,'Current');
    await h.sandbox.getAllUsers();assert.equal(h.requests.length,2);
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

test('chat catches up in bounded consecutive pages without jumping over an optimistic own message',async()=>{
    const h=runtime(messages),received=[];
    Object.assign(h.sandbox,{MY_ID:1,messagesEl:{querySelector:()=>null},sE(){},isNB:()=>false,isChatReadable:()=>false,appendMsg:m=>received.push(m.id),
        unread:0,mentionUnread:0,uB(){},updateMentionBadges(){},amMentioned:()=>false});
    h.sandbox.loadMessages(false);
    for(let i=0;i<3;i++){
        h.respond(i,{messages:[{id:13+i,user_id:1}],max_id:13+i,has_more:true});await tick();
        const timer=[...h.timers.entries()].find(([,value])=>value.delay===150);
        if(i<2){assert.ok(timer);h.timers.delete(timer[0]);timer[1].fn();assert.match(h.requests[i+1].url,new RegExp('since='+(13+i)));}
        else assert.equal(timer,undefined);
    }
    assert.deepEqual(received,[13,14,15]);assert.equal(h.requests.length,3);
    assert.equal((source.match(/chatMaxId\s*=/g)||[]).length,2,'Only initial state and server pagination may set the shared read cursor.');
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

test('returning to a tab and BFCache refresh update existing approval badges without duplicating them',async()=>{
    const h=runtime(approval);
    const badges=new Map(['badgePendingPr','badgePendingPrMobile'].map(id=>{
        const classes=new Set();
        return [id,{textContent:'54',classList:{toggle(name,hidden){if(hidden)classes.add(name);else classes.delete(name);}},classes}];
    }));
    h.sandbox.document.getElementById=id=>badges.get(id)||null;
    for(let cycle=0;cycle<3;cycle++){
        h.sandbox.document.hidden=true;h.documentEvents.visibilitychange();
        assert.equal(h.intervals.size,0);
        h.sandbox.document.hidden=false;h.documentEvents.visibilitychange();
        h.documentEvents.visibilitychange(); // repeated focus cannot stack a fetch
        assert.equal(h.requests.length,cycle+1);
        h.respond(cycle,{count:54});await tick();
        assert.equal(h.intervals.size,1);
        assert.equal(badges.size,2); // one desktop + one mobile, never two in one link
        for(const badge of badges.values()){
            assert.equal(String(badge.textContent),'54');assert.equal(badge.classes.has('hidden'),false);
        }
    }
    h.events.pagehide.forEach(fn=>fn());
    h.events.pageshow.forEach(fn=>fn({persisted:true}));
    h.respond(3,{count:0});await tick();
    for(const badge of badges.values()){
        assert.equal(String(badge.textContent),'0');assert.equal(badge.classes.has('hidden'),true);
    }
});
