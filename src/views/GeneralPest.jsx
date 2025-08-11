import React, { useState } from 'react'
import { priceGeneral } from '../utils/pricingEngine'
import { saveQuote } from '../utils/quotes'

export default function GeneralPest({config, user}){
  const [customerName, setCustomerName] = useState('')
  const [program, setProgram] = useState('monthly')
  const [infestation, setInfestation] = useState('low')
  const [result, setResult] = useState(null)

  function calculate(){
    const r = priceGeneral(config, program, infestation)
    setResult(r)
  }

  function handleSave(){
    if(!result) return alert('Calculate first')
    const q = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      serviceType: 'General Pest',
      customerName,
      details: { program, infestation },
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
        <h3>General Pest Program</h3>
        <input className="input" placeholder="Customer name" value={customerName} onChange={e=>setCustomerName(e.target.value)} />
        <div style={{height:8}} />
        <div className="small">Program</div>
        <select className="input" value={program} onChange={e=>setProgram(e.target.value)}>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="seasonal">Seasonal</option>
        </select>
        <div style={{height:8}} />
        <div className="small">Infestation Level</div>
        <select className="input" value={infestation} onChange={e=>setInfestation(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

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
