import React from 'react'
import IBeer from 'common/models/Beer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BeerForm } from './BeerForm'

export const AddBeer: React.FC = () => {
  const navigate = useNavigate()
  const onSubmit = async (beer: IBeer): Promise<void> => {
    try {
      await axios.post('api/beers', beer)
      navigate('/beers')
    } catch (e) {
      console.error(e)
    }
  }
  return <BeerForm onSubmit={onSubmit} submitButtonText="add" />
}
