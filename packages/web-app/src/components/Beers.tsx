/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useCallback } from 'react'
import { useBeerSearch } from 'common/contexts/BeerSearch/BeerSearchContext'
import { useNavigate } from 'react-router-dom'
import { defaultBeerImgUrl } from '../defaultBeerImgUrl'

const useInfiniteScroll = (
  onTrigger: () => void,
  loading: boolean,
  reachedEnd: boolean,
): [lastElement: (node: HTMLLIElement) => void] => {
  const observer: React.MutableRefObject<undefined> | { current: IntersectionObserver } = useRef()
  const lastElement = useCallback(
    (node: HTMLLIElement): void => {
      if (loading) {
        return
      }
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !reachedEnd) {
          console.log('last element is visible, triggering new data Fetch')
          onTrigger()
        }
      })
    },
    [loading, reachedEnd],
  )
  return [lastElement]
}

export const Beers: React.FC = () => {
  const [beerSearchState, beerSearchControl] = useBeerSearch()
  const navigate = useNavigate()

  const observer: React.MutableRefObject<undefined> | { current: IntersectionObserver } = useRef()
  const lastBeerElement = useCallback(
    (node: HTMLLIElement): void => {
      if (beerSearchState.loading) {
        return
      }
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !beerSearchState.fetchedAll) {
          console.log('visible')
          beerSearchControl.updateBeers()
        }
      })
      if (node) {
        observer.current.observe(node)
      }
    },
    [beerSearchState.loading, beerSearchState.fetchedAll],
  )

  useEffect(() => {
    beerSearchControl.updateBeers()
  }, [])
  return (
    <>
      <ul>
        {beerSearchState.beers.map((beer, index) => {
          if (beerSearchState.beers.length === index + 1) {
            return (
              <li key={beer.id} onClick={(): void => navigate(`/${beer.id}`)} ref={lastBeerElement}>
                <img src={beer.picture || defaultBeerImgUrl} alt={`${beer.name}`} style={{ width: '200px' }} />
                <br />
                {beer.name}
                <br />
                rating: {beer.rating}
              </li>
            )
          }
          return (
            <li key={beer.id} onClick={(): void => navigate(`/${beer.id}`)}>
              <img src={beer.picture || defaultBeerImgUrl} alt={`${beer.name}`} style={{ width: '200px' }} />
              <br />
              {beer.name}
              <br />
              rating: {beer.rating}
            </li>
          )
        })}
      </ul>

      {beerSearchState.loading && <p>loading..</p>}
      <div>
        <button type="button">filter</button>
        <button type="button" onClick={(): void => navigate('/add')}>
          add
        </button>
      </div>
    </>
  )
}
