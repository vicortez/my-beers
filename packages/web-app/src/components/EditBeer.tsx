import React, { useEffect, useState } from 'react'
import IBeer from 'common/models/Beer'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { BeerForm } from './BeerForm'

export const EditBeer: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [beer, setBeer] = useState<IBeer | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async (): Promise<void> => {
      setLoading(true)
      const { data: fetchedBeer } = await axios.get(`api/beers/${id}`)
      setBeer(fetchedBeer)
      setLoading(false)
    })()
  }, [])
  const onSubmit = async (submittedBeer: IBeer): Promise<void> => {
    const { data: beers } = await axios.patch(`api/beers/${id}`, submittedBeer)
    navigate('/beers')
  }
  return (
    <>
      {!loading && <BeerForm onSubmit={onSubmit} submitButtonText="save" beer={beer} />}
      {loading && <p>loading..</p>}
    </>
  )
}
