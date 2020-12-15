import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { AuthProvider, useAuthControl } from 'common/contexts/Auth'
import { AuthState } from 'common/contexts/Auth/AuthContext'
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { AppBar } from './components/AppBar'
import { AppContent } from './components/AppContent'
import { Login } from './components/Login'
import { PrivateRoute } from './components/PrivateRoute'
import { cookies } from './utils/cookies'
import { createMyTheme } from './utils/createMyTheme'

const theme = createMyTheme()

const AppBase: React.FC = () => {
  const navigate = useNavigate()
  const authControl = useAuthControl()
  useEffect(() => {
    const authState: AuthState = cookies.get('authState')
    console.log(authState)
    if (authState && authState.loggedIn) {
      console.log('detected previous login')
      authControl.setAuthState(authState)
      // cookies.remove('authState')
    }
  }, [])

  return (
    <>
      <Container maxWidth="md">
        <CssBaseline />
        {/* TODO remove froom here, add an appbar */}
        <AppBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <PrivateRoute path="/*" element={<AppContent />} />
        </Routes>
      </Container>
    </>
  )
}

export const App: React.FC = (props: Record<string, unknown>) => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <AppBase {...props} />
    </ThemeProvider>
  </AuthProvider>
)
