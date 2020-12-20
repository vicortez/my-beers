import axios, { Canceler } from 'axios'
import qs from 'qs'
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import IBeer from '../../models/Beer'
import {
  BeerSearchContext,
  BeerSearchControl,
  BeerSearchControlContext,
  BeerSearchState,
  IBeerSort,
} from './BeerSearchContext'

interface Props {
  children: React.ReactNode
}

// const temp: BeerSearchState = {
//   beers: [{ name: 'Colorado Apia', picture: 'pic', rating: Rating.LIKE, id: 'asdf', userId: 'asdf' }],
// }

const defaultBeerSearchState: BeerSearchState = {
  beers: [],
  loading: false,
  limit: 8,
  skip: 0,
  fetchedAll: false,
  sort: [
    ['createdAt', -1],
    // ['rating', -1],
    // ['name', 1],
  ],
}

export const BeerSearchProvider: FunctionComponent<Props> = (props) => {
  let cancelBeerFetchPromise: Canceler = () => console.warn('not set up yet')
  const [beerSearchState, setBeerSearchState] = useState<BeerSearchState>(defaultBeerSearchState)
  const [initialRender, setIninitalRender] = useState<boolean>(true)
  useEffect(() => {
    setIninitalRender(false)
  }, [])
  const updateBeers = async (): Promise<void> => {
    const { skip, limit, sort } = beerSearchState

    try {
      console.log('skip', skip)
      console.log('limit', limit)
      setBeerSearchState((prevState) => ({ ...prevState, loading: true }))
      const { data: beers } = await axios.get<IBeer[]>('api/beers', {
        params: {
          skip,
          limit,
          sort,
        },
        cancelToken: new axios.CancelToken((c): Canceler => (cancelBeerFetchPromise = c)),
        paramsSerializer: (params) => qs.stringify(params),
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

  const refreshBeers = async (): Promise<void> => {
    const refreshedBeerSearchState = { ...defaultBeerSearchState, sort: beerSearchState.sort }
    setBeerSearchState((prevState) => ({ ...prevState, loading: true }))
    const { data: beers } = await axios.get<IBeer[]>('api/beers', {
      params: {
        skip: refreshedBeerSearchState.skip,
        limit: refreshedBeerSearchState.limit,
        sort: refreshedBeerSearchState.sort,
      },
      cancelToken: new axios.CancelToken((c): Canceler => (cancelBeerFetchPromise = c)),
      paramsSerializer: (params) => qs.stringify(params),
    })
    const fetchedAll = beers.length < refreshedBeerSearchState.limit
    setBeerSearchState({
      ...refreshedBeerSearchState,
      beers,
      loading: false,
      fetchedAll,
      skip: refreshedBeerSearchState.skip + refreshedBeerSearchState.limit,
    })
  }

  const setSort = (sort: IBeerSort): void => setBeerSearchState((prevState) => ({ ...prevState, sort }))
  useEffect(() => {
    if (!initialRender) {
      console.log('changed', [beerSearchState.sort[0][0], beerSearchState.sort[0][1]])
      refreshBeers()
    }
  }, [beerSearchState.sort[0][0], beerSearchState.sort[0][1]])

  const getBeerSearchControl = useCallback<() => BeerSearchControl>(() => ({ updateBeers, setSort, refreshBeers }), [
    beerSearchState,
  ])

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
