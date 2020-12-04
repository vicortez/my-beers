/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useBeerSearch } from 'common/contexts/BeerSearch/BeerSearchContext'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { defaultBeerImgUrl } from '../defaultBeerImgUrl'
import { useInfiniteScroll } from '../utils/useInfiniteScroll'

export const Beers: React.FC = () => {
  const [beerSearchState, beerSearchControl] = useBeerSearch()
  const navigate = useNavigate()

  const [lastElementRef] = useInfiniteScroll(
    beerSearchControl.updateBeers,
    beerSearchState.loading,
    beerSearchState.fetchedAll,
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
              <li key={beer.id} onClick={(): void => navigate(`/${beer.id}`)} ref={lastElementRef}>
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
