import axios, { Canceler } from 'axios'
import React, { FunctionComponent, useEffect, useState, useCallback } from 'react'
import Rating from '../../models/Rating'
import IBeer from '../../models/Beer'
import { BeerSearchContext, BeerSearchState, BeerSearchControlContext, BeerSearchControl } from './BeerSearchContext'

interface Props {
  children: React.ReactNode
}

// const temp: BeerSearchState = {
//   beers: [{ name: 'Colorado Apia', picture: 'pic', rating: Rating.LIKE, id: 'asdf', userId: 'asdf' }],
// }

const defaultBeerSearchState = {
  beers: [],
  loading: false,
  limit: 8,
  skip: 0,
  fetchedAll: false,
}

export const BeerSearchProvider: FunctionComponent<Props> = (props) => {
  let cancelBeerFetchPromise: Canceler = () => console.warn('not set up yet')
  const [beerSearchState, setBeerSearchState] = useState<BeerSearchState>(defaultBeerSearchState)

  const updateBeers = async ({ reload = false } = {}): Promise<void> => {
    const { skip, limit } = reload ? defaultBeerSearchState : beerSearchState
    if (reload) {
      setBeerSearchState(defaultBeerSearchState)
    }
    try {
      console.log('skip', skip)
      console.log('limit', limit)
      setBeerSearchState((prevState) => ({ ...prevState, loading: true }))
      const { data: beers } = await axios.get<IBeer[]>('api/beers', {
        params: {
          skip,
          limit,
        },
        cancelToken: new axios.CancelToken((c): Canceler => (cancelBeerFetchPromise = c)),
      })
      const fetchedAll = beers.length < limit

      setBeerSearchState((prevState) => ({
        ...prevState,
        beers: [...prevState.beers, ...beers],
        loading: false,
        fetchedAll,
        skip: prevState.skip + prevState.limit,
      }))
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('Canceled GET request')
      } else {
        console.error(e)
      }
    }
  }
  const teste = (): void => console.log(beerSearchState)

  // const [beerSearchControl] = useState<BeerSearchControl>({
  //   updateBeers,
  // })

  const getBeerSearchControl = useCallback(() => ({ updateBeers }), [beerSearchState])

  useEffect(() => {
    return (): void => cancelBeerFetchPromise()
  }, [])

  // useEffect(() => {
  //   console.log('chamando useEffect')
  //   updateBeers()
  // }, [])
  return (
    <BeerSearchContext.Provider value={beerSearchState}>
      <BeerSearchControlContext.Provider value={getBeerSearchControl()}>
        {props.children}
      </BeerSearchControlContext.Provider>
    </BeerSearchContext.Provider>
  )
}
