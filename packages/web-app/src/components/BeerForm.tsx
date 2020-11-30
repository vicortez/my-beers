import React, { SyntheticEvent, useEffect, useState, useCallback } from 'react'
import IBeer from 'common/models/Beer'
import { useForm } from 'react-hook-form'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import Rating from 'common/models/Rating'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const TEMP =
  'https://previews.123rf.com/images/alexpokusay/alexpokusay1601/alexpokusay160100117/50832219-barrel-of-beer-sketch-style-vector-illustration-old-engraving-imitation-hand-drawn-sketch-imitation.jpg'

const useStyles = makeStyles((theme) => ({
  dropzone: {
    color: '#bdbdbd',
    padding: '20px',
    border: '3px dashed #eeeeee',
    backgroundColor: 'white',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  dropReject: {
    borderColor: 'red',
  },
  dropAccept: {
    borderColor: 'lightgreen',
  },
  dropActive: {
    backgroundColor: '#eeeeee',
    color: 'black',
  },
}))

interface Props {
  onSubmit(beer: IBeer): void
  submitButtonText: string
  beer?: IBeer | undefined
  loading?: boolean
}

export const BeerForm: React.FC<Props> = ({ onSubmit, submitButtonText, beer, loading }) => {
  const classes = useStyles()

  const [rating, setRating] = useState<Rating | undefined>()
  const { register, handleSubmit, watch, errors, reset } = useForm<IBeer>()
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFileNames(acceptedFiles.map((file) => file.name))
  }, [])

  const [fileNames, setFileNames] = useState<string[]>([])
  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    maxSize: 5242880,
    minSize: 2,
    maxFiles: 1,
    accept: 'image/*',
  })

  useEffect(() => {
    reset(beer)
    setRating(beer && beer.rating)
  }, [beer])
  const handleRate = (event: SyntheticEvent, newRating: Rating) => {
    setRating(newRating)
  }
  const submitForm = async (beer: IBeer) => {
    console.log(beer)
    // onSubmit({ ...beer, rating })
  }
  return (
    <>
      {!loading && (
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
            />
          </label>

          <hr></hr>
          <div
            {...getRootProps({
              className: clsx({
                [classes.dropzone]: true,
                [classes.dropReject]: isDragReject,
                [classes.dropAccept]: isDragAccept,
                [classes.dropActive]: isDragActive,
              }),
            })}
          >
            <input {...getInputProps()} name="teste" ref={register} />
            <p>Import your beer picture by dragging it or clicking here</p>
            <div>
              <strong>Files:</strong>
              <ul>
                {fileNames.map((fileName) => (
                  <li key={fileName}>{fileName}</li>
                ))}
              </ul>
            </div>
          </div>
          <hr></hr>

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
      )}
      {/* {loading && <p>carregando</p>} */}
    </>
  )
}
