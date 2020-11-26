import React from 'react'
import { useBeerSearch } from 'common/contexts/BeerSearch/BeerSearchContext'

export const Beers: React.FC = () => {
  const beerSearch = useBeerSearch()
  console.log(beerSearch)
  return (
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
  )
}
