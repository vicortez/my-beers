import axios from 'axios'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Rating from '../../models/Rating'
import { BeerSearchContext, BeerSearchState } from './BeerSearchContext'

interface Props {
  children: React.ReactNode
}

const temp: BeerSearchState = {
  beers: [{ name: 'Colorado Apia', picture: 'pic', rating: Rating.LIKE, id: 'asdf', userId: 'asdf' }],
}

export const BeerSearchProvider: FunctionComponent<Props> = (props) => {
  // TODO conciliate initial context value with initial state value on the provider
  const [beerSearchState, setBeerSearchState] = useState<BeerSearchState>({ beers: [] })
  useEffect(() => {
    console.log('chamando useEffect')
    ;(async (): Promise<void> => {
      const { data: beers } = await axios.get('api/beers')
      setBeerSearchState({ beers })
    })()
  }, [])
  return (
    <BeerSearchContext.Provider value={beerSearchState}>
      {/* <AuthControlContext.Provider value={setToken}> */}
      {props.children}
      {/* </AuthControlContext.Provider> */}
    </BeerSearchContext.Provider>
  )
}
