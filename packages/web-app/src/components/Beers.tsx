import React, { useEffect } from 'react'
import { useBeerSearch } from 'common/contexts/BeerSearch/BeerSearchContext'
import { useNavigate } from 'react-router-dom'
import { defaultBeerImgUrl } from '../defaultBeerImgUrl'

export const Beers: React.FC = () => {
  const [beerSearchState, beerSearchControl] = useBeerSearch()
  const navigate = useNavigate()
  useEffect(() => {
    beerSearchControl.updateBeers()
  }, [beerSearchControl])
  return (
    <>
      <ul>
        {beerSearchState.beers.map((beer) => {
          return (
            <li key={beer.id} onClick={() => navigate(`/${beer.id}`)}>
              <img src={beer.picture || defaultBeerImgUrl} alt={`${beer.name}`} />
              <br />
              {beer.name}
              <br />
              rating: {beer.rating}
            </li>
          )
        })}
      </ul>
      <div>
        <button>filter</button>
        <button onClick={() => navigate('/add')}>add</button>
      </div>
    </>
  )
}
