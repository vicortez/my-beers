import React, { SyntheticEvent, useState } from 'react'
import IBeer from 'common/models/Beer'
import { useForm } from 'react-hook-form'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import Rating from 'common/models/Rating'

const TEMP =
  'https://previews.123rf.com/images/alexpokusay/alexpokusay1601/alexpokusay160100117/50832219-barrel-of-beer-sketch-style-vector-illustration-old-engraving-imitation-hand-drawn-sketch-imitation.jpg'

interface Props {
  onSubmit(beer: IBeer): void
  submitButtonText: string
}

export const BeerForm: React.FC<Props> = ({ onSubmit, submitButtonText }) => {
  const [rating, setRating] = useState<Rating | undefined>()
  const { register, handleSubmit, watch, errors } = useForm<IBeer>()
  const handleRate = (event: SyntheticEvent, newRating: Rating) => {
    setRating(newRating)
  }
  const submitForm = async (beer: IBeer) => {
    onSubmit({ ...beer, rating })
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="picture">
          <input
            style={{ width: '90px' }}
            id="picture"
            name="picture"
            type="image"
            alt="beer"
            src={TEMP}
            ref={register}
          ></input>
        </label>
        <label htmlFor="name">
          Name: <input id="name" type="name" name="name" ref={register}></input>
        </label>
        <ToggleButtonGroup exclusive value={rating} onChange={handleRate}>
          <ToggleButton value={Rating.DISLIKE} aria-label="thumbs down">
            <ThumbDownIcon />
          </ToggleButton>
          <ToggleButton value={Rating.LIKE} aria-label="thumbs up">
            <ThumbUpIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <hr></hr>
        <button>{submitButtonText}</button>
      </form>
    </>
  )
}
