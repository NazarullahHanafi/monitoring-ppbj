const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');const{pathToFileURL}=require('node:url');
test('normal game begins compact and every control/info sheet can be closed without ending control',async()=>{
    const f=await fixture(),space=f.get('voWorkspace');assert.ok(space.classList.contains('vo-hud-hidden'));f.get('voToggleHud').events.click();assert.ok(!space.classList.contains('vo-hud-hidden'));f.get('voCloseHud').events.click();assert.ok(space.classList.contains('vo-hud-hidden'));f.get('voToggleInfo').events.click();assert.ok(space.classList.contains('vo-info-open'));f.get('voCloseInfo').events.click();assert.ok(!space.classList.contains('vo-info-open'));f.get('voToggleHud').events.click();f.events.keydown({key:'Escape',preventDefault(){}});assert.ok(space.classList.contains('vo-hud-hidden'));assert.equal(f.doc.fullscreenElement,null);
});
async function fixture(native=true,onEscape=()=>{}){const {mountOfficeViewport}=await import(pathToFileURL(path.resolve('resources/js/virtual-office-viewport.js'))),nodes=new Map(),events={};let sizes=0;
    const get=id=>{if(!nodes.has(id)){const classes=new Set();nodes.set(id,{hidden:false,attrs:{},events:{},classList:{contains:x=>classes.has(x),add:(...xs)=>xs.forEach(x=>classes.add(x)),remove:(...xs)=>xs.forEach(x=>classes.delete(x)),toggle(x,force){const add=force??!classes.has(x);if(add)classes.add(x);else classes.delete(x);return add;}},addEventListener(k,f){this.events[k]=f;},setAttribute(k,v){this.attrs[k]=v;}});}return nodes.get(id);};
    const doc={fullscreenElement:null,getElementById:get,addEventListener:(k,f)=>events[k]=f,async exitFullscreen(){this.fullscreenElement=null;events.fullscreenchange();}};
    if(native)get('voWorkspace').requestFullscreen=async()=>{doc.fullscreenElement=get('voWorkspace');events.fullscreenchange();};
    const api=mountOfficeViewport({document:doc,getScene:()=>({resize:()=>sizes++}),onEscape});return{api,get,doc,events,get sizes(){return sizes;}};
}
test('native fullscreen covers game, hides panels initially, and preserves accessible panel toggles',async()=>{const f=await fixture(),space=f.get('voWorkspace');await f.get('voEnterFullscreen').events.click();assert.equal(f.doc.fullscreenElement,space);assert.ok(space.classList.contains('vo-immersive'));assert.ok(space.classList.contains('vo-hud-hidden'));assert.equal(f.get('voExitFullscreen').hidden,false);
    for(const[id,cls]of[['voToggleInfo','vo-info-open'],['voToggleTeam','vo-team-open']]){f.get(id).events.click();assert.ok(space.classList.contains(cls));f.get(id).events.click();assert.ok(!space.classList.contains(cls));}f.get('voToggleHud').events.click();assert.ok(!space.classList.contains('vo-hud-hidden'));assert.equal(f.get('voToggleHud').attrs['aria-expanded'],'true');await f.get('voExitFullscreen').events.click();assert.ok(!space.classList.contains('vo-immersive'));assert.equal(f.get('voExitFullscreen').hidden,true);assert.ok(f.sizes>5);
});
test('team close works in fullscreen, sheets are exclusive, and refresh cannot reopen a dismissed panel',async()=>{
    const f=await fixture();await f.get('voEnterFullscreen').events.click();
    for(let i=0;i<30;i++){
        f.get('voGameTeam').events.click();assert.equal(f.get('voTeam').hidden,false);f.get('voCloseTeam').events.click();f.api.update();assert.equal(f.get('voTeam').hidden,true);
        f.get('voToggleInfo').events.click();assert.equal(f.get('voInfoPanel').hidden,false);f.get('voToggleHud').events.click();assert.equal(f.get('voInfoPanel').hidden,true);assert.equal(f.get('voHudPanels').hidden,false);
        f.get('voGameTeam').events.click();assert.equal(f.get('voHudPanels').hidden,true);assert.equal(f.get('voTeam').hidden,false);f.api.closePanels();assert.equal(f.get('voTeam').hidden,true);
    }
    f.api.show('team');f.events.keydown({key:'Escape'});assert.equal(f.get('voTeam').hidden,true);assert.equal(f.doc.fullscreenElement,f.get('voWorkspace'));
});
test('fullscreen fallback and Escape restore normal layout without leaving controls hidden',async()=>{const f=await fixture(false),space=f.get('voWorkspace');await f.get('voFullscreen').events.click();assert.ok(space.classList.contains('vo-expanded'));assert.ok(space.classList.contains('vo-immersive'));f.events.keydown({key:'Escape'});assert.ok(!space.classList.contains('vo-expanded'));assert.ok(space.classList.contains('vo-hud-hidden'));});

test('Escape closes the topmost detail before exiting fullscreen and respects an already handled key',async()=>{
    let opened=true,calls=0;const f=await fixture(false,()=>{calls++;if(opened){opened=false;return true;}return false;}),space=f.get('voWorkspace');await f.get('voFullscreen').events.click();
    f.events.keydown({key:'Escape',defaultPrevented:true});assert.equal(calls,0);f.events.keydown({key:'Escape'});assert.equal(opened,false);assert.ok(space.classList.contains('vo-expanded'));f.events.keydown({key:'Escape'});assert.ok(!space.classList.contains('vo-expanded'));
});
