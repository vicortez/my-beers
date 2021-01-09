import { useAuthState } from 'common/contexts/Auth'
import { AuthState } from 'common/contexts/Auth/AuthContext'
import React from 'react'
import { RouteProps } from 'react-router'
import { Navigate, Route, useLocation } from 'react-router-dom'
import { getLocalStorage } from '../utils/localStorage'

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { pathname } = useLocation()
  const url = pathname ? `/login?redirect=${pathname}` : '/login'
  const authState = useAuthState()
  const localStorageAuthState = getLocalStorage<AuthState>('authState')
  const loggedIn = authState.loggedIn || (localStorageAuthState && localStorageAuthState.loggedIn)
  if (!loggedIn) return <Navigate to={url} />
  return <Route {...props} />
}
