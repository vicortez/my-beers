import { DialogProps } from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal'
import Slide from '@material-ui/core/Slide'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { IBeerSort, useBeerSearchControl } from 'common/contexts/BeerSearch/BeerSearchContext'
import React from 'react'
import { SortAlphAsc } from './icons/SortAlphAsc'
import { SortAlphDesc } from './icons/SortAlphDesc'
import { SortThumbsUpDownAsc } from './icons/SortThumbsUpDownAsc'
import { SortThumbsUpDownDesc } from './icons/SortThumbsUpDownDesc'
import { SortTimeAsc } from './icons/SortTimeAsc'
import { SortTimeDesc } from './icons/SortTimeDesc'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    paper: {
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      width: '100%',
      justifyContent: 'center',
    },
    icon: {
      fontSize: '2em',
    },
    center: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  }),
)

interface IProps {
  open: boolean
  onClose: DialogProps['onClose']
  sort: IBeerSort
}

export const SortSelectorDialog: React.FC<IProps> = ({ open, onClose, sort }) => {
  const classes = useStyles()
  const { setSort } = useBeerSearchControl()
  const theme = useTheme()

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="beer sorting" keepMounted>
      <Slide direction="up" in={open}>
        <div className={classes.paper}>
          <div>
            <Typography id="alert-dialog-slide-title" variant="h5">
              Order by
            </Typography>
          </div>
          <div className={classes.center}>
            <IconButton
              aria-label="sort by name"
              className={classes.margin}
              onClick={(): void => {
                setSort([['name', 1]])
              }}
            >
              <SortAlphAsc svgProps={{ className: classes.icon }} />
            </IconButton>
            <IconButton
              aria-label="sort by name"
              className={classes.margin}
              onClick={(): void => {
                setSort([['name', -1]])
              }}
            >
              <SortAlphDesc svgProps={{ className: classes.icon }} />
            </IconButton>
            <IconButton
              aria-label="sort by time"
              className={classes.margin}
              onClick={(): void => {
                setSort([['createdAt', -1]])
              }}
            >
              <SortTimeAsc svgProps={{ className: classes.icon }} />
            </IconButton>
            <IconButton
              aria-label="sort by time"
              className={classes.margin}
              onClick={(): void => {
                setSort([['createdAt', 1]])
              }}
            >
              <SortTimeDesc svgProps={{ className: classes.icon }} />
            </IconButton>

            <IconButton
              aria-label="sort by rating"
              className={classes.margin}
              onClick={(): void => {
                setSort([['rating', -1]])
              }}
            >
              <SortThumbsUpDownDesc svgProps={{ className: classes.icon }} />
            </IconButton>
            <IconButton
              aria-label="sort by rating"
              className={classes.margin}
              onClick={(): void => {
                setSort([['rating', 1]])
              }}
            >
              <SortThumbsUpDownAsc svgProps={{ className: classes.icon }} />
            </IconButton>
          </div>
          {/* {sort.map((sortParam) => {
            const sortType = sortParam[0]
            const sortOrder = sortParam[1]
            return (
              <IconButton aria-label="sort by name" className={classes.margin} key={`${sortType}-${sortOrder}`}>
                {sortIconMap[sortType][sortOrder]}
              </IconButton>
            )
          })} */}
        </div>
      </Slide>
    </Modal>
  )
}
