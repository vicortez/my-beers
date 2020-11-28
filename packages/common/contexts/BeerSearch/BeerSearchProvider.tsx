import axios from 'axios'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Rating from '../../models/Rating'
import { BeerSearchContext, BeerSearchState, BeerSearchControlContext, BeerSearchControl } from './BeerSearchContext'

interface Props {
  children: React.ReactNode
}

// const temp: BeerSearchState = {
//   beers: [{ name: 'Colorado Apia', picture: 'pic', rating: Rating.LIKE, id: 'asdf', userId: 'asdf' }],
// }

export const BeerSearchProvider: FunctionComponent<Props> = (props) => {
  const updateBeers = async (): Promise<void> => {
    const { data: beers } = await axios.get('api/beers')
    setBeerSearchState((prevState) => ({ ...prevState, beers, loading: false }))
  }
  const [beerSearchState, setBeerSearchState] = useState<BeerSearchState>({ beers: [], loading: false })
  const [beerSearchControl] = useState<BeerSearchControl>({ updateBeers })

  // useEffect(() => {
  //   console.log('chamando useEffect')
  //   setBeerSearchState((prevState) => ({ ...prevState, loading: true }))
  //   updateBeers()
  // }, [])
  return (
    <BeerSearchContext.Provider value={beerSearchState}>
      <BeerSearchControlContext.Provider value={beerSearchControl}>{props.children}</BeerSearchControlContext.Provider>
    </BeerSearchContext.Provider>
  )
}
