import React from 'react'
import Beer from '../../models/Beer'
import Rating from '../../models/Rating'

export interface BeerSearchState {
  beers: Array<Beer>
}
export interface BeerSearchControl {
  // login({ email, password }: IUserForm): Promise<boolean>
  test(): void
}

const initialBeerSearch: BeerSearchState = {
  beers: [{ name: 'Colorado Apia', picture: 'pic', rating: Rating.LIKE, id: 'asdf', userId: 'asd' }],
}

export const BeerSearchContext = React.createContext<BeerSearchState | undefined>(undefined)
BeerSearchContext.displayName = 'beerSearchContext'
export const useBeerSearchState = (): BeerSearchState => {
  const context = React.useContext(BeerSearchContext)
  if (context === undefined) {
    throw new Error('context undefined. Are you using it within a provider?')
  }
  return context
}
export const BeerSearchControlContext = React.createContext<BeerSearchControl | undefined>(undefined)
BeerSearchContext.displayName = 'beerSearchControlContext'
export const useBeerSearchControl = (): BeerSearchControl => {
  const context = React.useContext(BeerSearchControlContext)
  if (context === undefined) {
    throw new Error('context undefined. Are you using it within a provider?')
  }
  return context
}

export const useBeerSearch = (): [BeerSearchState, BeerSearchControl] => [useBeerSearchState(), useBeerSearchControl()]
