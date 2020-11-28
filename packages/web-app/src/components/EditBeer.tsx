import React, { useEffect, useState } from 'react'
import { BeerForm } from './BeerForm'
import IBeer from 'common/models/Beer'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const EditBeer = () => {
  const { id } = useParams()
  const [beer, setBeer] = useState<IBeer | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const { data: beer } = await axios.get(`api/beers/${id}`)
      setBeer(beer)
      setLoading(false)
    })()
  }, [])
  const onSubmit = async (beer: IBeer) => {
    const { data: beers } = await axios.put('api/beers', beer)
    console.log(beers)
  }
  return <BeerForm onSubmit={onSubmit} submitButtonText={'add'} loading={loading} beer={beer} />
}
