import axios from 'axios'
import React, { FunctionComponent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import User from '../../models/User'
import { AuthContext, AuthControlContext, AuthState } from './AuthContext'

interface Props {
  children: React.ReactNode
}

const initialAuth: AuthState = {
  loggedIn: false,
  user: null,
}

export const AuthProvider: FunctionComponent<Props> = ({ children }: Props) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (authState.loggedIn) {
      navigate('/beers')
    }
  }, [authState, navigate])
  // const setState = (newState: AuthState): void => setAuthState((prevAuthState) => ({ ...prevAuthState, ...newState }))
  const login = async ({ email, password }: User): Promise<boolean> => {
    try {
      const res = await axios.post(`/api/users/login`, {
        email,
        password,
      })
      console.log(res)
      setAuthState((prevState) => ({ ...prevState, loggedIn: true }))
      return true
    } catch (e) {
      return false
    }
  }
  const logout = (): void => setAuthState({ user: null, loggedIn: false })
  return (
    <AuthContext.Provider value={authState}>
      <AuthControlContext.Provider value={{ login, logout }}>{children}</AuthControlContext.Provider>
    </AuthContext.Provider>
  )
}
