import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import IBeer from 'common/models/Beer'
import React from 'react'
import { defaultBeerImgUrl } from '../defaultBeerImgUrl'
import { MegaLikeIcon } from './icons/MegaLikeIcon'

const iconRatingMap = {
  MEGALIKE: <MegaLikeIcon svgProps={{ fontSize: 'large' }} color="#48a70b" />,
  LIKE: <ThumbUpIcon style={{ color: '#48a70b' }} fontSize="large" />,
  DISLIKE: <ThumbDownIcon style={{ color: '#b53737' }} fontSize="large" />,
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: '100%',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}))

interface IProps {
  beer: IBeer
}

export const BeerCard: React.FC<IProps> = ({ beer }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item className={classes.image}>
          <img src={beer.picture || defaultBeerImgUrl} alt={`${beer.name}`} className={classes.img} />
        </Grid>

        <Grid item container xs direction="column">
          <Grid item>
            <Typography gutterBottom variant="subtitle1">
              {beer.name}
            </Typography>
          </Grid>

          <Grid item container justify="center" style={{ display: 'flex', flex: '1 1 auto' }} alignItems="center">
            {
              /* <Typography gutterBottom variant="body2">
                {beer.rating}
              </Typography> */
              beer.rating && iconRatingMap[beer.rating]
            }
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
