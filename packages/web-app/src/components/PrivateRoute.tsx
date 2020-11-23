import React from 'react'
import { Navigate, Route, useNavigate } from 'react-router-dom'
import { useAuthState } from 'common/contexts/Auth'

const isAuthenticated = false

export const PrivateRoute = (props: any) => {
  // const navigate = useNavigate()
  const authState = useAuthState()
  if (!authState.accessToken) return <Navigate to="/login" />
  return <Route {...props} />
}
