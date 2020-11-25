import { useAuthState } from 'common/contexts/Auth'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { Beers } from './Beers'

const Test = (props: any) => {
  const auth = useAuthState()
  return (
    <div>
      <h2>test</h2>
      <p>{`token: ${auth.accessToken}`}</p>
      <p>{`user: ${auth.user && auth.user.email}`}</p>
    </div>
  )
}

export const AppContent = () => {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/*" element={<p>not found</p>} />
      <Route path="/beers" element={<Beers />} />
    </Routes>
  )
}
