import React from 'react'
import { Navigate, Route, useNavigate } from 'react-router-dom'
import { RouteProps } from 'react-router'
import { useAuthState } from 'common/contexts/Auth'

const isAuthenticated = false

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  // const navigate = useNavigate()
  const authState = useAuthState()
  if (!authState.loggedIn) return <Navigate to="/login" />
  return <Route {...props} />
}
