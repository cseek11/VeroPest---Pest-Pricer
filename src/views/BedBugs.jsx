import React, { useState } from 'react'
import { priceBed } from '../utils/pricingEngine'
import { saveQuote } from '../utils/quotes'

export default function BedBugs({config, user}){
  const [customerName, setCustomerName] = useState('')
  const [sqft, setSqft] = useState('')
  const [bedCover, setBedCover] = useState(false)
  const [interceptors, setInterceptors] = useState(false)
  const [result, setResult] = useState(null)

  function calculate(){
    const r = priceBed(config, parseFloat(sqft)||0, bedCover, interceptors)
    setResult(r)
  }

  function handleSave(){
    if(!result) return alert('Calculate first')
    const q = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      serviceType: 'Bed Bugs',
      customerName,
      details: { sqft, bedCover: bedCover.toString(), interceptors: interceptors.toString() },
      total: result.total,
      createdByName: (user && user.displayName) || '',
      createdByEmail: (user && user.email) || ''
    }
    saveQuote(q)
    alert('Saved quote locally.')
  }

  return (
    <div>
      <div className="card">
        <h3>Bed Bug Treatment</h3>
        <input className="input" placeholder="Customer name" value={customerName} onChange={e=>setCustomerName(e.target.value)} />
        <div style={{height:8}} />
        <input className="input" placeholder="Square Footage" value={sqft} onChange={e=>setSqft(e.target.value)} />
        <div style={{height:8}} />
        <div className="row">
          <label className="small">Include Bed Cover</label>
          <input type="checkbox" checked={bedCover} onChange={e=>setBedCover(e.target.checked)} />
        </div>
        <div style={{height:8}} />
        <div className="row">
          <label className="small">Include Interceptors</label>
          <input type="checkbox" checked={interceptors} onChange={e=>setInterceptors(e.target.checked)} />
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
