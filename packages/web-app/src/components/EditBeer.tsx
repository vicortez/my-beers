import React, { useEffect, useState } from 'react'
import { BeerForm } from './BeerForm'
import IBeer from 'common/models/Beer'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export const EditBeer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
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
    const { data: beers } = await axios.patch(`api/beers/${id}`, beer)
    navigate('/beers')
  }
  return (
    <>
      {!loading && <BeerForm onSubmit={onSubmit} submitButtonText={'save'} beer={beer} />}
      {loading && <p>loading..</p>}
    </>
  )
}
