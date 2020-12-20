import MUIAppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import { useAuth } from 'common/contexts/Auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { cookies } from '../utils/cookies'

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
    navigate('/login')
    if (auth.loggedIn) {
      authControl.logout()
      cookies.remove('authState')
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
