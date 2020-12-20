import React from 'react'
import IBeer from '../../models/Beer'

export type IBeerSort = Array<[string, number]>
export interface BeerSearchState {
  beers: Array<IBeer>
  loading: boolean
  skip: number
  limit: number
  fetchedAll: boolean
  sort: IBeerSort
}

// interface UpdateBeersOptions {
//   reload?: boolean
// }
export interface BeerSearchControl {
  updateBeers(): void
  refreshBeers(): void
  setSort(sort: IBeerSort): void
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
