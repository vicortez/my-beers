import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { useBeerSearch } from 'common/contexts/BeerSearch/BeerSearchContext'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useInfiniteScroll } from '../utils/useInfiniteScroll'
import { BeerCard } from './BeerCard'
import { FunnelIcon } from './icons/FunnelIcon'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.footerButtonHeight,
    color: 'pink',
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
  footer: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    // width: '100%',
    height: theme.footerButtonHeight,
  },
  footerButton: {
    height: '100%',
    width: '100%',
  },
}))

export const Beers: React.FC = () => {
  const [beerSearchState, beerSearchControl] = useBeerSearch()
  const navigate = useNavigate()
  const classes = useStyles()

  const [lastElementRef] = useInfiniteScroll(
    beerSearchControl.updateBeers,
    beerSearchState.loading,
    beerSearchState.fetchedAll,
  )

  useEffect(() => {
    beerSearchControl.updateBeers({ reload: true })
  }, [])
  return (
    <>
      <List aria-label="beer list" className={classes.root}>
        {beerSearchState.beers.map((beer, index) => {
          if (beerSearchState.beers.length === index + 1) {
            return (
              <ListItem ref={lastElementRef} key={beer.id} button to={`/${beer.id}`} component={Link}>
                <BeerCard beer={beer} />
              </ListItem>
            )
          }
          return (
            <ListItem key={beer.id} button onClick={(): void => navigate(`/${beer.id}`)} component="a">
              <BeerCard beer={beer} />
            </ListItem>
          )
        })}
      </List>
      {beerSearchState.loading && <p>loading..</p>}
      <Grid className={classes.footer} container>
        <Grid item xs>
          <Button type="button" variant="contained" className={classes.footerButton}>
            <FunnelIcon svgProps={{ fontSize: 'large' }} />
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            type="button"
            onClick={(): void => navigate('/add')}
            className={classes.footerButton}
            variant="contained"
          >
            <AddIcon fontSize="large" />
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
