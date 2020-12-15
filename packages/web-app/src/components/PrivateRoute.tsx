import React from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom'
import { RouteProps } from 'react-router'
import { useAuthState } from 'common/contexts/Auth'

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { pathname } = useLocation()
  const url = pathname ? `/login?redirect=${pathname}` : '/login'
  const authState = useAuthState()
  if (!authState.loggedIn) return <Navigate to={url} />
  return <Route {...props} />
}
