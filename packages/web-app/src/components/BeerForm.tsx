import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import IBeer from 'common/models/Beer'
import Rating from 'common/models/Rating'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ImageUpload, UploadedFile } from './ImageUpload'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formElement: {
    marginTop: '12px',
    '&:first-child': {
      marginTop: '0',
    },
  },
}))

const getBase64 = async (file: Blob): Promise<string | undefined> => {
  var reader = new FileReader()
  reader.readAsDataURL(file as Blob)

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result as any)
    reader.onerror = (error) => reject(error)
  })
}

interface Props {
  onSubmit(beer: IBeer): void
  submitButtonText: string
  beer?: IBeer | undefined
  // loading?: boolean
}

export const BeerForm: React.FC<Props> = ({ onSubmit, submitButtonText, beer }) => {
  const classes = useStyles()

  const [rating, setRating] = useState<Rating | undefined>()
  const [pictureURL, setPictureURL] = useState<string>()
  const { register, handleSubmit, watch, errors, reset } = useForm<IBeer>()

  useEffect(() => {
    reset(beer)
    setRating(beer && beer.rating)
    setPictureURL(beer && beer.picture)
  }, [beer])
  const handleRate = (event: SyntheticEvent, newRating: Rating) => {
    setRating(newRating)
  }
  const handleSubmitFile = async (file: UploadedFile): Promise<void> => {
    let picture = ''
    if (file) {
      picture = (await getBase64(file)) || ''
    }
    setPictureURL(picture)
  }
  const submitForm = async (baseBeer: IBeer) => {
    const beer: IBeer = { ...baseBeer, rating, picture: pictureURL }
    console.log(beer)
    onSubmit(beer)
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className={classes.root}>
        <Container maxWidth="xs" className={classes.formElement}>
          <ImageUpload onSubmitFile={handleSubmitFile} pictureURL={pictureURL} />
        </Container>
        <TextField id="name" name="name" label="Name" inputRef={register} className={classes.formElement} fullWidth />

        <ToggleButtonGroup exclusive value={rating} onChange={handleRate} className={classes.formElement}>
          <ToggleButton value={Rating.DISLIKE} aria-label="thumbs down">
            <ThumbDownIcon />
          </ToggleButton>
          <ToggleButton value={Rating.LIKE} aria-label="thumbs up">
            <ThumbUpIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <Button className={classes.formElement} variant="outlined" fullWidth type="submit">
          {submitButtonText}
        </Button>
      </form>
    </>
  )
}
