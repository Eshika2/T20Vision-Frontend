import { createContext, useContext, useEffect, useState } from 'react'
import { getAuthUser, logoutUser } from '../api/authApi'
import {
  setToken as saveToken,
  getToken,
  removeToken,
  setUser as saveUser,
  getUser,
  removeUser,
  clearAuthStorage,
} from '../utils/storage'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken() || '')
  const [user, setUser] = useState(getUser())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = getToken()

      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        const response = await getAuthUser()

        if (response?.success) {
          setToken(storedToken)
          setUser(response.output || null)
          saveUser(response.output || null)
        } else {
          clearAuthStorage()
          setToken('')
          setUser(null)
        }
      } catch (error) {
        clearAuthStorage()
        setToken('')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = (newToken, userData = null) => {
    setToken(newToken)
    setUser(userData)

    saveToken(newToken)

    if (userData) {
      saveUser(userData)
    }
  }

  const updateUser = (userData) => {
    setUser(userData)
    saveUser(userData)
  }

  const logout = async () => {
    try {
      await logoutUser()
    } catch (error) {
      console.log('Logout API failed:', error)
    } finally {
      removeToken()
      removeUser()
      setToken('')
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}