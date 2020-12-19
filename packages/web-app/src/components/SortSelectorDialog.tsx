import React from 'react'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Slide, { SlideProps } from '@material-ui/core/Slide'
import DialogTitle from '@material-ui/core/DialogTitle'

// eslint-disable-next-line react/display-name
// const Transition = React.forwardRef((props: SlideProps, ref) => {
//   return <Slide direction="up" ref={ref} {...props} />
// })

const useStyles = makeStyles((theme) => ({
  // modal: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  paper: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

interface IProps {
  open: boolean
  onClose: DialogProps['onClose']
}

export const SortSelectorDialog: React.FC<IProps> = ({ open, onClose }) => {
  const classes = useStyles()

  return (
    <Modal
      // fullWidth
      // maxWidth="xl"
      open={open}
      onClose={onClose}
      aria-labelledby="beer sorting"
      // className={classes.modal}
      keepMounted
    >
      <Slide direction="up" in={open}>
        <div className={classes.paper}>
          <DialogTitle id="alert-dialog-slide-title">meu teste</DialogTitle>
        </div>
      </Slide>
    </Modal>
  )
}
