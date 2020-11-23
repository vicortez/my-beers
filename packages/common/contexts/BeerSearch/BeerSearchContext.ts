import React from 'react'
import Beer from '../../models/Beer'
import Rating from '../../models/Rating'

export interface BeerSearch {
  beers: Array<Beer>
}

const initialBeerSearch: BeerSearch = {
  beers: [{ name: 'Colorado Apia', picture: 'pic', rating: Rating.LIKE, _id: 'asdf' }],
}

export const BeerSearchContext = React.createContext(initialBeerSearch)
BeerSearchContext.displayName = 'beerSearchContext'
export const useBeerSearch = () => React.useContext(BeerSearchContext)

export const BeerSearchControlContext = React.createContext<any>(null)
BeerSearchContext.displayName = 'beerSearchControlContext'
export const useBeerSearchControl = () => React.useContext(BeerSearchControlContext)
