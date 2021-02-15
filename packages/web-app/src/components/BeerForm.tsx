import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import axios from 'axios'
import { UploadApiResponse } from 'cloudinary'
import clsx from 'clsx'
import IBeer from 'common/models/Beer'
import Rating from 'common/models/Rating'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MegaLikeIcon } from './icons/MegaLikeIcon'
import { ImageUpload, UploadedFile } from './ImageUpload'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
  },
  formElement: {
    marginTop: '12px',
    '&:first-child': {
      marginTop: '0',
    },
  },
}))

const getFormData = (file: File, signature: string, timestamp: number, apiKey: string): FormData => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('signature', signature)
  formData.append('timestamp', timestamp.toString())
  formData.append('api_key', apiKey)
  return formData
}

interface Props {
  onSubmit(beer: IBeer): void
  submitButtonText: string
  beer?: IBeer | undefined
  // loading?: boolean
}

export const BeerForm: React.FC<Props> = ({ onSubmit, submitButtonText, beer }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [rating, setRating] = useState<Rating | undefined>()
  const [pictureURL, setPictureURL] = useState<string>()
  // const { register, handleSubmit, watch, errors, reset } = useForm<IBeer>()
  const { register, handleSubmit, reset } = useForm<IBeer>()

  useEffect(() => {
    reset(beer)
    setRating(beer && beer.rating)
    setPictureURL(beer && beer.picture)
  }, [beer])
  const handleRate = (event: SyntheticEvent, newRating: Rating): void => {
    setRating(newRating)
  }
  const handleSubmitFile = async (file: UploadedFile): Promise<void> => {
    let picture = ''
    if (file) {
      setLoading(true)
      const {
        data: { signature, timestamp, apiKey, apiUrl },
      } = await axios.get<{ signature: string; timestamp: number; apiKey: string; apiUrl: string }>(
        'api/beers/img-upload-signature',
      )
      const formData: FormData = getFormData(file, signature, timestamp, apiKey)
      const { data: assetMeta } = await axios.post<UploadApiResponse>(apiUrl, formData)
      console.log('assetMeta', assetMeta)
      picture = assetMeta.secure_url
      setLoading(false)
      // picture = (await getBase64(file)) || ''
    }
    setPictureURL(picture)
  }
  const submitForm = async (baseBeer: IBeer): Promise<void> => {
    const submittedBeer: IBeer = { ...baseBeer, rating, picture: pictureURL }
    console.log(beer)
    onSubmit(submittedBeer)
  }
  return (
    <>
      {loading && <p>loading..</p>}
      <form onSubmit={handleSubmit(submitForm)} className={classes.root}>
        <Container maxWidth="xs" className={classes.formElement}>
          <ImageUpload onSubmitFile={handleSubmitFile} pictureURL={pictureURL} />
        </Container>
        <TextField id="name" name="name" label="Name" inputRef={register} className={classes.formElement} fullWidth />

        <ToggleButtonGroup
          exclusive
          value={rating}
          onChange={handleRate}
          className={clsx({ [classes.formElement]: true })}
          size="large"
        >
          <ToggleButton value={Rating.DISLIKE} aria-label="thumbs down">
            <ThumbDownIcon />
          </ToggleButton>
          <ToggleButton value={Rating.LIKE} aria-label="thumbs up">
            <ThumbUpIcon style={{ color: '#48a70b' }} />
          </ToggleButton>
          <ToggleButton value={Rating.MEGALIKE} aria-label="mega thumbs up">
            <MegaLikeIcon svgProps={{ style: { overflow: 'visible' } }} />
          </ToggleButton>
        </ToggleButtonGroup>

        <Button className={classes.formElement} variant="outlined" fullWidth type="submit">
          {submitButtonText}
        </Button>
      </form>
    </>
  )
}
