import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Termite from './views/Termite'
import Fungus from './views/Fungus'
import GeneralPest from './views/GeneralPest'
import BedBugs from './views/BedBugs'
import Quotes from './views/Quotes'
import Admin from './views/Admin'
import { loadConfig } from './utils/pricingEngine'

export default function App(){
  const [config, setConfig] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    loadConfig().then(cfg=>{
      setConfig(cfg)
    })
  },[])

  if(!config) return <div className="app">Loading...</div>

  return (
    <div className="app">
      <div className="header">
        <h2>VeroPest Solutions</h2>
        <div><a href="/admin" className="small">Admin</a> | <a href="/login" className="small">Login</a></div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={(u)=>setUser(u)} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/termite" element={<Termite config={config} user={user} />} />
        <Route path="/fungus" element={<Fungus config={config} user={user} />} />
        <Route path="/general" element={<GeneralPest config={config} user={user} />} />
        <Route path="/bedbugs" element={<BedBugs config={config} user={user} />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/admin" element={<Admin config={config} setConfig={setConfig} />} />
      </Routes>
      <div className="footer">Designed for mobile use — tap Share → Add to Home Screen on iPhone.</div>
    </div>
  )
}
