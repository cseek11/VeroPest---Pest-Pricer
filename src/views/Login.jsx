import React, { useState } from 'react'
import { login } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Login({onLogin}){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  async function doLogin(){
    try {
      const user = await login(email, password)
      onLogin(user)
      nav('/')
    } catch(e){
      alert('Login failed: ' + e.message)
    }
  }

  return (
    <div className="card">
      <h3>Employee Login</h3>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <div style={{height:8}} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div style={{height:8}} />
      <div className="row">
        <button className="button" onClick={doLogin}>Login</button>
        <button className="button" onClick={()=>nav('/register')}>Register</button>
      </div>
    </div>
  )
}
