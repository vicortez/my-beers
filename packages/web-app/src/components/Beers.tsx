import React from 'react'
import { useBeerSearchState } from 'common/contexts/BeerSearch/BeerSearchContext'
import { useNavigate } from 'react-router-dom'

export const Beers: React.FC = () => {
  const beerSearch = useBeerSearchState()
  const navigate = useNavigate()
  return (
    <>
      <ul>
        {beerSearch.beers.map((beer) => {
          return (
            <li>
              <img src={beer.picture} alt={`${beer.name}`} />
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
