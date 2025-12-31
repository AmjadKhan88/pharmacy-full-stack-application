/* eslint-disable prettier/prettier */
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AppLoader from '../components/AppLoader'
export const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading,setLoading] = useState(false)

  const token = localStorage.getItem('token')

  const getProfile = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // The standard format
        },
      })
      setUser(res.data.user)
    } catch (err) {
      console.error('Unauthorized or server error')
    } finally {
      setLoading(false)
    }
  }


useEffect(()=> {
    if (token) {
      getProfile()
    }
},[])
  return <GlobalContext.Provider value={{ user, setUser,loading }}>
          { loading ? <AppLoader/> : children }
         </GlobalContext.Provider>
}

export default GlobalProvider

export const useGlobalContext = () => useContext(GlobalContext)
