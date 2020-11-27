import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { Beers } from './Beers'
import { BeerSearchProvider } from 'common/contexts/BeerSearch'
import { useAuthState } from 'common/contexts/Auth'
import { AddBeer } from './AddBeer'

const Test = (props: any) => {
  const auth = useAuthState()
  return (
    <div>
      <h2>test</h2>
      <p>{`auth: ${auth}`}</p>
      <p>{`user: ${auth.user && auth.user.email}`}</p>
    </div>
  )
}

const AppContentBase = () => {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/*" element={<p>not found</p>} />
      <Route path="/beers" element={<Beers />} />
      <Route path="/add" element={<AddBeer />} />
    </Routes>
  )
}

export const AppContent = (props: any) => (
  <BeerSearchProvider>
    <AppContentBase {...props} />
  </BeerSearchProvider>
)
