import React, { FunctionComponent, useState } from 'react'
import Rating from '../../models/Rating'
import { BeerSearch, BeerSearchContext } from './BeerSearchContext'

interface Props {
  children: React.ReactNode
}

const initialBeerSearch: BeerSearch = {
  beers: [{ name: 'Colorado Apia', picture: 'pic', rating: Rating.LIKE, _id: 'asdf' }],
}

export const BeerSearchProvider: FunctionComponent<Props> = (props) => {
  //TODO conciliate initial context value with initial state value on the provider
  const [beerSearchState, setBeerSearchState] = useState<BeerSearch>(initialBeerSearch)

  // const setToken = (accessToken: string, user: User) => setAuthState({ ...authState, accessToken, user })

  return (
    <BeerSearchContext.Provider value={beerSearchState}>
      {/* <AuthControlContext.Provider value={setToken}> */}
      {props.children}
      {/* </AuthControlContext.Provider> */}
    </BeerSearchContext.Provider>
  )
}
