import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { App } from './App'

test('main app component renders without breaking', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  )
  const myBeersTitle = screen.getByText(/My beers/i)
  expect(myBeersTitle).toBeInTheDocument()
})
