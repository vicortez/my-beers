import React, { FunctionComponent, useState } from 'react'
import User from '../../models/User'
import { AuthContext, AuthControlContext, AuthState } from './AuthContext'

interface Props {
  children: React.ReactNode
}

const initialAuth: AuthState = {
  accessToken: '',
  user: null,
}

export const AuthProvider: FunctionComponent<Props> = ({ children }: Props) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuth)

  const setState = (accessToken: string, user: User): void => setAuthState({ ...authState, accessToken, user })

  return (
    <AuthContext.Provider value={authState}>
      <AuthControlContext.Provider value={{ setAuthState: setState }}>{children}</AuthControlContext.Provider>
    </AuthContext.Provider>
  )
}
