import { AuthProvider, useAuth } from 'common/contexts/Auth';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute'


const Home = (props: any) => {
  const auth = useAuth()
  return (<div>
    <h2>home</h2>
    <p>{`token: ${auth.accessToken}`}</p>
    <p>{`user: ${auth.user && auth.user.name}`}</p>
  </div>)
}


const AppBase = () => (
  <Routes>
    <PrivateRoute path='/home' element={<Home />} />
    <Route path='/*' element={<p>not found</p>} />
  </Routes>
)

export const App = (props: any) => <AuthProvider>
  <AppBase {...props} />
</AuthProvider>
