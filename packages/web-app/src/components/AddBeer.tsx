import React from 'react'
import { BeerForm } from './BeerForm'
import IBeer from 'common/models/Beer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AddBeer = () => {
  const navigate = useNavigate()
  const onSubmit = async (beer: IBeer) => {
    try {
      await axios.post('api/beers', beer)
      navigate('/beers')
    } catch (e) {
      console.error(e)
    }
  }
  return <BeerForm onSubmit={onSubmit} submitButtonText={'add'} />
}
