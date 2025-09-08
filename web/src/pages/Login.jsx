import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch()
  const auth = useSelector(s => s.auth)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e) {
    e.preventDefault()
    try {
      dispatch(loginStart())
      const res = await api.post('/auth/login', { email, password })
      dispatch(loginSuccess(res))
      navigate('/')
    } catch (err) {
      dispatch(loginFailure(err.message))
    }
  }

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded shadow'>
      <h2 className='text-xl font-semibold mb-4'>Login</h2>
      <form onSubmit={submit} className='space-y-4'>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='w-full p-2 border rounded' />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' type='password' className='w-full p-2 border rounded' />
        <button className='w-full bg-blue-600 text-white py-2 rounded'>Login</button>
        {auth.error && <p className='text-red-600'>{auth.error}</p>}
      </form>
    </div>
  )
}
