import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { AuthProvider } from 'common/contexts/Auth'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppBar } from './components/AppBar'
import { AppContent } from './components/AppContent'
import { Login } from './components/Login'
import { PrivateRoute } from './components/PrivateRoute'
import { createMyTheme } from './utils/createMyTheme'

const theme = createMyTheme()

const AppBase: React.FC = () => {
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
