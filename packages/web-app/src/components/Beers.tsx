import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
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
import { SortSelectorDialog } from './SortSelectorDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.footerButtonHeight,
    color: 'pink',
  },
  footer: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    height: theme.footerButtonHeight,
  },
  footerContent: {
    height: 'inherit',
  },
  footerButton: {
    height: '100%',
    width: '100%',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export const Beers: React.FC = () => {
  const [sortModalopen, setSortModalopen] = React.useState<boolean>(false)
  const handleOpenSortModal = (): void => {
    setSortModalopen(true)
  }

  const handleCloseSortModal = (): void => {
    setSortModalopen(false)
  }
  const [beerSearchState, beerSearchControl] = useBeerSearch()
  const navigate = useNavigate()
  const classes = useStyles()

  const [lastElementRef] = useInfiniteScroll(
    beerSearchControl.updateBeers,
    beerSearchState.loading,
    beerSearchState.fetchedAll,
  )

  useEffect(() => {
    beerSearchControl.refreshBeers()
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
      <Container maxWidth="md" className={classes.footer}>
        <Grid container className={classes.footerContent}>
          <Grid item xs>
            <Button
              type="button"
              variant="contained"
              className={classes.footerButton}
              onClick={(): void => {
                handleOpenSortModal()
              }}
            >
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
      </Container>
      <SortSelectorDialog open={sortModalopen} onClose={handleCloseSortModal} sort={beerSearchState.sort} />
    </>
  )
}
