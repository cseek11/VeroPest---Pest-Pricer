import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home(){
  const nav = useNavigate()
  return (
    <div>
      <div className="card">
        <h3>Create Quote</h3>
        <div className="row">
          <button className="button" onClick={()=>nav('/termite')}>Termite</button>
          <button className="button" onClick={()=>nav('/fungus')}>Fungus</button>
        </div>
        <div style={{height:8}} />
        <div className="row">
          <button className="button" onClick={()=>nav('/general')}>General Pest</button>
          <button className="button" onClick={()=>nav('/bedbugs')}>Bed Bugs</button>
        </div>
      </div>
      <div className="card">
        <h4>Saved Quotes</h4>
        <div><a href="/quotes">View Saved Quotes</a></div>
      </div>
    </div>
  )
}
