import React from 'react'
import { BeerForm } from './BeerForm'
import IBeer from 'common/models/Beer'
import axios from 'axios'

export const AddBeer = () => {
  const onSubmit = async (beer: IBeer) => {
    const { data: beers } = await axios.post('api/beers', beer)
    console.log(beers)
  }
  return <BeerForm onSubmit={onSubmit} submitButtonText={'add'} />
}
