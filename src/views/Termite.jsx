import React, { useState } from 'react'
import { priceTermite } from '../utils/pricingEngine'
import { saveQuote } from '../utils/quotes'

export default function Termite({config, user}){
  const [customerName, setCustomerName] = useState('')
  const [liquid, setLiquid] = useState(true)
  const [bait, setBait] = useState(false)
  const [liquidUnit, setLiquidUnit] = useState('sqft')
  const [baitUnit, setBaitUnit] = useState('station')
  const [sqft, setSqft] = useState('')
  const [linearft, setLinearft] = useState('')
  const [stations, setStations] = useState('0')
  const [infestation, setInfestation] = useState('low')
  const [extras, setExtras] = useState('0')
  const [result, setResult] = useState(null)

  function calculate(){
    const opts = {
      liquidSelected: liquid,
      baitSelected: bait,
      liquidUnit,
      baitUnit,
      sqft: parseFloat(sqft) || 0,
      linearft: parseFloat(linearft) || 0,
      stations: parseInt(stations) || 0,
      infestation,
      extras: parseFloat(extras) || 0
    }
    const r = priceTermite(config, opts)
    setResult(r)
  }

  function handleSave(){
    if(!result) return alert('Calculate first')
    const q = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      serviceType: 'Termite',
      customerName,
      details: {
        liquid: liquid.toString(),
        bait: bait.toString(),
        liquidUnit,
        baitUnit,
        sqft, linearft, stations, infestation, extras
      },
      total: result.total,
      createdByName: (user && user.displayName) || '',
      createdByEmail: (user && user.email) || ''
    }
    // save locally as fallback
    saveQuote(q)
    alert('Saved quote locally. When Firebase is configured it will sync to Cloud.')
  }

  return (
    <div>
      <div className="card">
        <h3>Termite Quote</h3>
        <input className="input" placeholder="Customer name" value={customerName} onChange={e=>setCustomerName(e.target.value)} />
        <div style={{height:8}} />
        <div className="row" style={{marginBottom:8}}>
          <label className="small">Liquid</label>
          <input type="checkbox" checked={liquid} onChange={e=>setLiquid(e.target.checked)} />
          <label className="small">Bait</label>
          <input type="checkbox" checked={bait} onChange={e=>setBait(e.target.checked)} />
        </div>

        {liquid && (
          <div className="card">
            <div className="small">Liquid Measurement</div>
            <div className="row" style={{marginTop:8}}>
              <button className="button" onClick={()=>setLiquidUnit('sqft')}>Sq Ft</button>
              <button className="button" onClick={()=>setLiquidUnit('linearft')}>Linear Ft</button>
            </div>
            <div style={{height:8}} />
            <input className="input" placeholder="Square Footage" value={sqft} onChange={e=>setSqft(e.target.value)} />
            <div style={{height:8}} />
            <input className="input" placeholder="Linear Footage" value={linearft} onChange={e=>setLinearft(e.target.value)} />
          </div>
        )}

# truncated due to message length - continue writing remaining view files
        )}

        {bait && (
          <div className="card">
            <div className="small">Bait Measurement</div>
            <div className="row" style={{marginTop:8}}>
              <button className="button" onClick={()=>setBaitUnit('station')}>Per Station</button>
              <button className="button" onClick={()=>setBaitUnit('linearft')}>Linear Ft</button>
            </div>
            <div style={{height:8}} />
            <input className="input" placeholder="Stations (count)" value={stations} onChange={e=>setStations(e.target.value)} />
            <div style={{height:8}} />
            <input className="input" placeholder="Linear Footage for bait (if used)" value={linearft} onChange={e=>setLinearft(e.target.value)} />
          </div>
        )}

        <div className="card">
          <div className="small">Other</div>
          <div style={{height:8}} />
          <div className="row">
            <label className="small">Infestation</label>
            <select className="input" value={infestation} onChange={e=>setInfestation(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div style={{height:8}} />
          <input className="input" placeholder="Extras Fee" value={extras} onChange={e=>setExtras(e.target.value)} />
        </div>

        <div style={{height:8}} />
        <div className="row">
          <button className="button" onClick={calculate}>Calculate</button>
          <button className="button" onClick={handleSave}>Save Quote</button>
        </div>

        {result && (
          <div style={{marginTop:12}}>
            <h4>Total: ${result.total.toFixed(2)}</h4>
            <div>
              {Object.entries(result.breakdown).map(([k,v])=>(
                <div key={k} className="row" style={{justifyContent:'space-between', marginTop:6}}>
                  <div className="small">{k}</div>
                  <div>${v.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
