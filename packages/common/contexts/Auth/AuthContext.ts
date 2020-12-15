import React from 'react'
import User from '../../models/User'
import IUserForm from '../../models/UserForm'

export interface AuthState {
  loggedIn: boolean
  user: User | null
}
export interface AuthControl {
  login({ email, password }: IUserForm, callBack?: () => void): Promise<boolean>
  logout(): void
}

export const AuthContext = React.createContext<AuthState | undefined>(undefined)
AuthContext.displayName = 'authContext'
export const useAuthState = (): AuthState => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('context undefined. Are you using it within a provider?')
  }
  return context
}

// TODO ver o melhor jeito de definir o estado inicial quando é uma funcao, mas nao queremos inicializar aqui.
export const AuthControlContext = React.createContext<AuthControl | undefined>(undefined)
AuthContext.displayName = 'authControlContext'
export const useAuthControl = (): AuthControl => {
  const context = React.useContext(AuthControlContext)
  if (context === undefined) {
    throw new Error('context undefined. Are you using it within a provider?')
  }
  return context
}

export const useAuth = (): [AuthState, AuthControl] => [useAuthState(), useAuthControl()]
