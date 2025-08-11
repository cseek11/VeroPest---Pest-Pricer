import React, { useState, useEffect } from 'react'
import { getQuotes, deleteQuote } from '../utils/quotes'
import { downloadPDF } from '../utils/pdf'

export default function Quotes(){
  const [items, setItems] = useState([])

  useEffect(()=>{ refresh() }, [])

  function refresh(){
    setItems(getQuotes())
  }

  function handleDelete(id){
    if(!confirm('Delete this quote?')) return
    deleteQuote(id)
    refresh()
  }

  return (
    <div>
      <div className="card">
        <h3>Saved Quotes</h3>
        {items.length===0 && <div className="small">No quotes yet</div>}
        {items.map(q=>(
          <div key={q.id} className="card">
            <div className="row" style={{justifyContent:'space-between'}}>
              <div>
                <strong>{q.serviceType}</strong>
                <div className="small">{new Date(q.date).toLocaleString()}</div>
                <div className="small">By: {q.createdByName} ({q.createdByEmail})</div>
              </div>
              <div>
                <div>${q.total.toFixed(2)}</div>
                <div style={{height:8}} />
                <button className="button" onClick={()=>downloadPDF(q, '/logo.png')}>Export PDF</button>
                <div style={{height:8}} />
                <button className="button" onClick={()=>handleDelete(q.id)}>Delete</button>
              </div>
            </div>
            <div style={{marginTop:8}}>
              <div className="small">Details</div>
              <pre style={{whiteSpace:'pre-wrap', margin:0}}>{JSON.stringify(q.details, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
