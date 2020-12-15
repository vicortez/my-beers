import { useAuthState } from 'common/contexts/Auth'
import { AuthState } from 'common/contexts/Auth/AuthContext'
import React from 'react'
import { RouteProps } from 'react-router'
import { Navigate, Route, useLocation } from 'react-router-dom'
import { cookies } from '../utils/cookies'

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { pathname } = useLocation()
  const url = pathname ? `/login?redirect=${pathname}` : '/login'
  const authState = useAuthState()
  const cookieAuthState: AuthState = cookies.get('authState')
  const loggedIn = authState.loggedIn || (cookieAuthState && cookieAuthState.loggedIn)
  if (!loggedIn) return <Navigate to={url} />
  return <Route {...props} />
}
