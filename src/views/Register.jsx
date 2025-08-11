import React, { useState } from 'react'
import { register } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const nav = useNavigate()

  async function doRegister(){
    try {
      const user = await register(email, password, name)
      alert('Registered. You can now login.')
      nav('/login')
    } catch(e){
      alert('Register failed: ' + e.message)
    }
  }

  return (
    <div className="card">
      <h3>Create Employee Account</h3>
      <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
      <div style={{height:8}} />
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <div style={{height:8}} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div style={{height:8}} />
      <div className="row">
        <button className="button" onClick={doRegister}>Register</button>
      </div>
    </div>
  )
}
