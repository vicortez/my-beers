import React, { SyntheticEvent, useEffect, useState, useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  dropzone: {
    display: 'flex',
    justifyContent: 'center',
    color: '#bdbdbd',
    padding: '20px',
    border: '3px dashed #eeeeee',
    backgroundColor: 'white',
    '&:hover': {
      cursor: 'pointer',
    },
    boxSizing: 'border-box',
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
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },

  emptyFileInput: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
}))

export interface UploadedFile extends File {
  preview?: string
}
interface IProps {
  onSubmitFile(uploadedFile: UploadedFile): void
  pictureURL?: string
}

// TODO props?
export const ImageUpload: React.FC<IProps> = ({ onSubmitFile, pictureURL }) => {
  const [file, setFile] = useState<UploadedFile>()

  useEffect(() => {
    return (): void => {
      if (file && file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    }
  }, [])
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      // TODO "error toast" something
      console.log('rejectedFiles', rejectedFiles)
    }
    const uploadedFile: UploadedFile = acceptedFiles[0]
    if (uploadedFile) {
      setFile(
        Object.assign(uploadedFile, {
          preview: URL.createObjectURL(uploadedFile),
        }),
      )
      onSubmitFile(uploadedFile)
    }
  }, [])

  const classes = useStyles()
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    maxSize: 5242880,
    minSize: 2,
    maxFiles: 1,
    accept: 'image/*',
  })

  return (
    <>
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
        <input {...getInputProps()} />
        {!pictureURL && (
          <div className={classes.emptyFileInput}>
            <AddIcon fontSize="large" />
            <p>Import your beer picture by dragging it or clicking here</p>
          </div>
        )}
        {pictureURL && <img src={pictureURL} alt="beer" className={classes.img} />}
      </div>
    </>
  )
}
