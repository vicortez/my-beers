import React from 'react'
import User from '../../models/User'
import IUserLoginForm from '../../models/UserLoginForm'

export interface AuthState {
  loggedIn: boolean
  user: User | null
  expires?: string
}
export type CallBackFn = ((authState: AuthState) => void) | null

export interface IoauthResponse {
  accessToken: string
  authuser?: string
  expiresIn: string
  prompt?: string
  scope: string
  state?: string
}
export interface AuthControl {
  login({ email, password }: IUserLoginForm, callBack?: CallBackFn): Promise<boolean>
  tokenLogin(oauthResponse: IoauthResponse, callBack?: CallBackFn): Promise<boolean>
  logout(): void
  setAuthState(authState: AuthState): void
  requestGoogleAuthUrl(): Promise<string>
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
