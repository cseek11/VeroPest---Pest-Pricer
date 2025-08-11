import React, { useState } from 'react'
import { saveConfig } from '../utils/pricingEngine'

export default function Admin({config, setConfig}){
  const [pin, setPin] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [text, setText] = useState(JSON.stringify(config, null, 2))

  function checkPin(){
    if(pin === '1234'){
      setAuthorized(true)
    } else {
      alert('Wrong PIN')
    }
  }

  function handleSave(){
    try{
      const obj = JSON.parse(text)
      saveConfig(obj)
      setConfig(obj)
      alert('Saved configuration to localStorage. If you configure Firebase, you can save remote pricing as well.')
    }catch(e){
      alert('JSON parse error: ' + e.message)
    }
  }

  function handleReset(){
    if(!confirm('Remove local overrides and reload bundled defaults?')) return
    localStorage.removeItem('pricing.json')
    location.reload()
  }

  return (
    <div>
      <div className="card">
        {!authorized ? (
          <div>
            <h3>Admin</h3>
            <div className="small">Enter PIN to edit pricing</div>
            <input className="input" placeholder="PIN" value={pin} onChange={e=>setPin(e.target.value)} />
            <div style={{height:8}}/>
            <button className="button" onClick={checkPin}>Unlock</button>
          </div>
        ) : (
          <div>
            <h3>Admin - Pricing JSON</h3>
            <div className="small">Edit pricing JSON and Save. Changes will be stored locally.</div>
            <textarea style={{width:'100%', height:300, marginTop:8}} value={text} onChange={e=>setText(e.target.value)} />
            <div style={{height:8}} />
            <div className="row">
              <button className="button" onClick={handleSave}>Save</button>
              <button className="button" onClick={handleReset}>Reset to bundled</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
