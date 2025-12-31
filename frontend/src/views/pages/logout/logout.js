import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
      })
      localStorage.removeItem('token') // clear token
      navigate('/login') // redirect login page
    } catch (err) {
      console.error('Logout error', err)
    }
  }

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  )
}
