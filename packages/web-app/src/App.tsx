import { AuthProvider, useAuth, useAuthControl } from 'common/contexts/Auth'
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute'
import { Login } from './components/Login'
import { AppContent } from './components/AppContent'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

const AppBase = () => {
  const authControl = useAuthControl()
  return (
    <>
      <Link to="/test" style={{ padding: 5 }}>
        Test
      </Link>
      <Link to="/beers" style={{ padding: 5 }}>
        beers
      </Link>
      <button onClick={() => authControl.logout()}>logoff</button>
      <hr />
      <Routes>
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/*" element={<AppContent />} />
      </Routes>
    </>
  )
}

export const App = (props: any) => (
  <AuthProvider>
    <Container maxWidth="md">
      <CssBaseline />
      <AppBase {...props} />
    </Container>
  </AuthProvider>
)
