import MUIAppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from 'common/contexts/Auth'
import { Link, useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  barButton: {
    textTransform: 'none',
  },
}))

export const AppBar: React.FC = () => {
  const classes = useStyles()
  const [auth, authControl] = useAuth()
  const navigate = useNavigate()
  const handleClickLog = (): void => {
    if (auth.loggedIn) {
      authControl.logout()
    } else {
      navigate('/login')
    }
  }
  return (
    <MUIAppBar position="static">
      <Toolbar className={classes.bar}>
        <Button size="large" color="inherit" className={classes.barButton} onClick={(): void => navigate('/beers')}>
          My beers
        </Button>
        <Button color="inherit" onClick={(): void => handleClickLog()}>
          {auth.loggedIn ? 'Logout' : 'LogIn'}
        </Button>
      </Toolbar>
    </MUIAppBar>
  )
}
