export async function loadConfig(){
  try {
    const raw = localStorage.getItem('pricing.json')
    if(raw){
      return JSON.parse(raw)
    }
  } catch(e){
    console.warn('failed reading local config', e)
  }
  const r = await fetch('/pricing.json')
  const cfg = await r.json()
  return cfg
}

export function saveConfig(cfg){
  localStorage.setItem('pricing.json', JSON.stringify(cfg, null, 2))
}

export function priceTermite(cfg, opts){
  let total = 0
  let breakdown = {}
  if(opts.liquidSelected){
    if(opts.liquidUnit === 'sqft' && cfg.termite.liquid.sqft){
      const u = cfg.termite.liquid.sqft
      const val = u.base + (opts.sqft * u.rate)
      total += val; breakdown['Liquid (sqft)'] = val
    } else if(opts.liquidUnit === 'linearft' && cfg.termite.liquid.linearft){
      const u = cfg.termite.liquid.linearft
      const val = u.base + (opts.linearft * u.rate)
      total += val; breakdown['Liquid (linearft)'] = val
    }
  }
  if(opts.baitSelected){
    if(opts.baitUnit === 'linearft' && cfg.termite.bait.linearft){
      const u = cfg.termite.bait.linearft
      const val = u.base + (opts.linearft * u.rate)
      total += val; breakdown['Bait (linearft)'] = val
    } else if(opts.baitUnit === 'station' && cfg.termite.bait.station){
      const u = cfg.termite.bait.station
      const val = u.base + (opts.stations * u.rate)
      total += val; breakdown['Bait (per station)'] = val
    }
  }
  if(opts.infestation && cfg.general_pest && cfg.general_pest.initial && cfg.general_pest.initial.perSeverity){
    const lvl = opts.infestation
    const fee = (lvl==='low')?0: (lvl==='medium'? cfg.general_pest.initial.perSeverity : cfg.general_pest.initial.perSeverity*2)
    if(fee) { total += fee; breakdown['Infestation Fee'] = fee }
  }
  if(opts.extras && opts.extras>0){ total += opts.extras; breakdown['Extras'] = opts.extras }
  return { total, breakdown }
}

export function priceFungus(cfg, sqft, extras=0){
  if(!cfg.fungus || !cfg.fungus.sqft) return { total:0, breakdown:{} }
  const u = cfg.fungus.sqft
  const val = u.base + (sqft * u.rate) + extras
  return { total: val, breakdown: { 'Fungus': val } }
}

export function priceGeneral(cfg, program, infestation){
  const base = cfg.general_pest.initial.base
  const per = cfg.general_pest.initial.perSeverity || 0
  const inf = (infestation === 'low')?0: (infestation==='medium'? per: per*2)
  const recurring = cfg.general_pest[program] || 0
  const total = base + inf + recurring
  return { total, breakdown: { 'Initial': base, 'Infestation': inf, 'Recurring': recurring } }
}

export function priceBed(cfg, sqft, bedCover, interceptors){
  if(!cfg.bed_bugs || !cfg.bed_bugs.sqft) return { total:0, breakdown:{} }
  const u = cfg.bed_bugs.sqft
  let total = u.base + (sqft * u.rate)
  const breakdown = { 'Base': u.base, 'Area': sqft * u.rate }
  if(bedCover){ total += cfg.bed_bugs.bed_cover || 0; breakdown['Bed Cover'] = cfg.bed_bugs.bed_cover || 0 }
  if(interceptors){ total += cfg.bed_bugs.interceptors || 0; breakdown['Interceptors'] = cfg.bed_bugs.interceptors || 0 }
  return { total, breakdown }
}

// Firebase helpers (placeholders)
import { initFirebase } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
const fb = (() => {
  try {
    const ob = initFirebase()
    return { db: ob.db }
  } catch(e) {
    return { db: null }
  }
})()

export async function loadConfigRemote(){
  if(!fb.db) return null
  const d = await getDoc(doc(fb.db, 'config', 'pricing'))
  if(d.exists()){
    return d.data()
  }
  return null
}

export async function saveConfigRemote(cfg){
  if(!fb.db) throw new Error('Firestore not configured')
  await setDoc(doc(fb.db, 'config', 'pricing'), cfg)
  localStorage.setItem('pricing.json', JSON.stringify(cfg, null, 2))
}
