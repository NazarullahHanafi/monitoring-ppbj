import presets from '../data/virtual-office-costumes.json' with { type:'json' };
export const costumePresets=presets;
export const costumeFor=id=>presets.find(p=>p.id===id)||null;
