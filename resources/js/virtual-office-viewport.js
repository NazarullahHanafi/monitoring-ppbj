export function mountOfficeViewport({document:doc,getScene,onEscape=()=>{},onEnter=()=>{}}){
    const $=id=>doc.getElementById(id),workspace=$('voWorkspace');let immersive=false,panel=null;
    function update(){
        const next=doc.fullscreenElement===workspace||workspace.classList.contains('vo-expanded');
        if(next!==immersive){immersive=next;panel=null;}
        workspace.classList.toggle('vo-immersive',next);
        workspace.classList.toggle('vo-hud-hidden',panel!=='controls');
        workspace.classList.toggle('vo-info-open',panel==='info');
        workspace.classList.toggle('vo-team-open',panel==='team');
        workspace.classList.toggle('vo-team-hidden',panel!=='team');
        for(const[id,name]of[['voInfoPanel','info'],['voTeam','team'],['voHudPanels','controls']])if($(id))$(id).hidden=panel!==name;
        $('voExitFullscreen').hidden=!next;
        if($('voEnterFullscreen'))$('voEnterFullscreen').textContent=next?'Keluar layar penuh':'Game penuh';
        $('voToggleInfo')?.setAttribute('aria-expanded',String(panel==='info'));
        $('voToggleHud')?.setAttribute('aria-expanded',String(panel==='controls'));
        for(const id of['voToggleTeam','voGameTeam']){$(id)?.setAttribute('aria-pressed',String(panel==='team'));$(id)?.setAttribute('aria-expanded',String(panel==='team'));}
        getScene()?.resize();
    }
    function show(name){getScene()?.setAiming?.(false);panel=name;update();}
    function closePanels(){panel=null;update();}
    function close(){closePanels();getScene()?.focusPilot?.();}
    async function enter(){onEnter();try{if(doc.fullscreenElement===workspace)await doc.exitFullscreen();else if(workspace.requestFullscreen)await workspace.requestFullscreen();else workspace.classList.toggle('vo-expanded');}catch{workspace.classList.toggle('vo-expanded');}update();getScene()?.focusPilot?.();}
    for(const id of['voFullscreen','voEnterFullscreen'])$(id)?.addEventListener('click',enter);
    $('voExitFullscreen').addEventListener('click',async()=>{try{if(doc.fullscreenElement)await doc.exitFullscreen();}finally{workspace.classList.remove('vo-expanded');update();}});
    for(const[id,name]of[['voToggleTeam','team'],['voGameTeam','team'],['voToggleInfo','info'],['voToggleHud','controls']])$(id)?.addEventListener('click',()=>show(panel===name?null:name));
    for(const id of['voCloseHud','voCloseInfo','voCloseTeam'])$(id)?.addEventListener('click',close);
    doc.addEventListener('fullscreenchange',update);
    doc.addEventListener('keydown',event=>{if(event.key==='Escape'&&!event.defaultPrevented){if(onEscape()===true){event.preventDefault?.();return;}if(panel){close();event.preventDefault?.();return;}workspace.classList.remove('vo-expanded');update();}});
    update();return{update,show,closePanels};
}
