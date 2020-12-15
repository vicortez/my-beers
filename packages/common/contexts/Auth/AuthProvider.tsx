import axios from 'axios'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import User from '../../models/User'
import { AuthContext, AuthControlContext, AuthState, CallBackFn } from './AuthContext'

interface Props {
  children: React.ReactNode
}

const initialAuth: AuthState = {
  loggedIn: false,
  user: null,
}

export const AuthProvider: FunctionComponent<Props> = ({ children }: Props) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuth)
  const loginCallBackFnContainer = useRef<CallBackFn>(null)
  useEffect(() => {
    if (authState.loggedIn && loginCallBackFnContainer.current) {
      loginCallBackFnContainer.current(authState)
      loginCallBackFnContainer.current = null
    }
  }, [authState])
  // const setState = (newState: AuthState): void => setAuthState((prevAuthState) => ({ ...prevAuthState, ...newState }))
  const login = async ({ email, password }: User, callBack: () => void): Promise<boolean> => {
    if (callBack) {
      loginCallBackFnContainer.current = callBack
    }
    try {
      const {
        data: { expires },
      } = await axios.post<{ expires: string }>(`/api/users/login`, {
        email,
        password,
      })
      setAuthState((prevState) => ({ ...prevState, loggedIn: true, expires }))
      return true
    } catch (e) {
      return false
    }
  }
  const logout = (): void => {
    setAuthState({ user: null, loggedIn: false })
    axios.get(`/api/users/logout`)
  }
  return (
    <AuthContext.Provider value={authState}>
      {/*  TODO doesnt object definition on the function body messes with re-renders of child components? */}
      <AuthControlContext.Provider value={{ login, logout, setAuthState }}>{children}</AuthControlContext.Provider>
    </AuthContext.Provider>
  )
}
