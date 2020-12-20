import { useAuthState } from 'common/contexts/Auth'
import { BeerSearchProvider } from 'common/contexts/BeerSearch'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddBeer } from './AddBeer'
import { Beers } from './Beers'
import { EditBeer } from './EditBeer'

const Test: React.FC = () => {
  const auth = useAuthState()
  return (
    <div>
      <h2>test</h2>
      <p>{`auth: ${auth}`}</p>
      <p>{`user: ${auth.user && auth.user.email}`}</p>
    </div>
  )
}

const AppContentBase: React.FC = () => {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/*" element={<p>not found</p>} />
      <Route path="/beers" element={<Beers />} />
      <Route path="/add" element={<AddBeer />} />
      <Route path="/:id" element={<EditBeer />} />
    </Routes>
  )
}

export const AppContent: React.FC = () => (
  <BeerSearchProvider>
    <AppContentBase />
  </BeerSearchProvider>
)
