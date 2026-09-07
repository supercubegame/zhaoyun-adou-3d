export const PRESENTATION_EVENTS=Object.freeze(['attack-start','hit','defeat','protect','wave-start','victory','defeat-result']);
export function createPresentation(){return{events:[],effects:[]};}
export function pushPresentation(state,event){if(!PRESENTATION_EVENTS.includes(event.type))throw new Error(`unknown presentation event: ${event.type}`);const next=structuredClone(state);next.events.push({...event,at:Date.now()});next.effects.push({type:event.type,ttl:event.type==='hit'?.18:.45});return next;}
export function tickPresentation(state,dt=.016){const next=structuredClone(state);next.effects=next.effects.map(e=>({...e,ttl:e.ttl-dt})).filter(e=>e.ttl>0);return next;}
