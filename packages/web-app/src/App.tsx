import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { AuthProvider, useAuthControl } from 'common/contexts/Auth'
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AppContent } from './components/AppContent'
import { Login } from './components/Login'
import { PrivateRoute } from './components/PrivateRoute'
import { createMyTheme } from './utils/createMyTheme'

const theme = createMyTheme()

const AppBase = () => {
  const authControl = useAuthControl()
  return (
    <>
      {/* TODO remove froom here, add an appbar */}
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
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <CssBaseline />
        <AppBase {...props} />
      </Container>
    </ThemeProvider>
  </AuthProvider>
)
