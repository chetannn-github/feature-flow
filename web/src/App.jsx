import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Environments from './pages/Environments'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './store/authSlice'
import Signup from './pages/Signup'
import Landing from "./pages/Landing"
import Header from './components/Header'

function App() {
  const auth = useSelector(s => s.auth)

  return (
    <div className='min-h-screen flex flex-col'>
      <Header/>
      <main className='container mx-auto px-4 flex-1 mt-16'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/sign-in' element={auth.token ? <Navigate to={"/"}/> : <Login />} />
          <Route path="/sign-up" element={auth.token ? <Navigate to={"/"}/> : <Signup />} />
          

          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/projects' element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path='/projects/:projectId/environments' element={<ProtectedRoute><Environments /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const token = useSelector(s => s.auth.token)
  if (!token) return <Navigate to='/sign-in' />
  return children
}

export default App
