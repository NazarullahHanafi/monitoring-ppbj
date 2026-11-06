export function mountOfficeViewport({document:doc,getScene,onEscape=()=>{},onEnter=()=>{}}){
    const $=id=>doc.getElementById(id),workspace=$('voWorkspace');let immersive=false,hudOpen=false;
    function update(){
        const next=doc.fullscreenElement===workspace||workspace.classList.contains('vo-expanded');
        if(next!==immersive){immersive=next;hudOpen=false;workspace.classList.toggle('vo-immersive',next);workspace.classList.remove('vo-team-open','vo-info-open');}
        workspace.classList.toggle('vo-hud-hidden',!hudOpen);
        $('voExitFullscreen').hidden=!next;
        if($('voEnterFullscreen'))$('voEnterFullscreen').textContent=next?'Keluar layar penuh':'Game penuh';
        $('voToggleInfo')?.setAttribute('aria-expanded',String(workspace.classList.contains('vo-info-open')));
        $('voToggleHud')?.setAttribute('aria-expanded',String(!workspace.classList.contains('vo-hud-hidden')));
        $('voToggleTeam').setAttribute('aria-pressed',String(next?workspace.classList.contains('vo-team-open'):!workspace.classList.contains('vo-team-hidden')));
        getScene()?.resize();
    }
    async function enter(){onEnter();try{if(doc.fullscreenElement===workspace)await doc.exitFullscreen();else if(workspace.requestFullscreen)await workspace.requestFullscreen();else workspace.classList.toggle('vo-expanded');}catch{workspace.classList.toggle('vo-expanded');}update();getScene()?.focusPilot?.();}
    for(const id of['voFullscreen','voEnterFullscreen'])$(id)?.addEventListener('click',enter);
    $('voExitFullscreen').addEventListener('click',async()=>{try{if(doc.fullscreenElement)await doc.exitFullscreen();}finally{workspace.classList.remove('vo-expanded');update();}});
    $('voToggleTeam').addEventListener('click',()=>{workspace.classList.toggle(immersive?'vo-team-open':'vo-team-hidden');update();});
    $('voToggleInfo')?.addEventListener('click',()=>{workspace.classList.toggle('vo-info-open');hudOpen=false;update();});
    $('voToggleHud')?.addEventListener('click',()=>{hudOpen=!hudOpen;workspace.classList.remove('vo-info-open');update();});
    $('voCloseHud')?.addEventListener('click',()=>{hudOpen=false;update();getScene()?.focusPilot?.();});
    $('voCloseInfo')?.addEventListener('click',()=>{workspace.classList.remove('vo-info-open');update();getScene()?.focusPilot?.();});
    doc.addEventListener('fullscreenchange',update);
    doc.addEventListener('keydown',event=>{if(event.key==='Escape'&&!event.defaultPrevented){if(onEscape()===true){event.preventDefault?.();return;}if(hudOpen||workspace.classList.contains('vo-info-open')){hudOpen=false;workspace.classList.remove('vo-info-open');event.preventDefault?.();update();return;}workspace.classList.remove('vo-expanded');update();}});
    update();return{update};
}
