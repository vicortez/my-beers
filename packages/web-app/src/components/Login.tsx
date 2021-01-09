import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useAuthControl } from 'common/contexts/Auth'
import React from 'react'
import GoogleButton from 'react-google-button'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setLocalStorage } from '../utils/localStorage'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  marginBottom: {
    marginBottom: '10px',
  },
}))

interface Inputs {
  password: string
  email: string
}
export const Login: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { register, handleSubmit, watch, errors } = useForm<Inputs>()
  const authControl = useAuthControl()
  const classes = useStyles()

  const onSubmit = async (inputs: Inputs): Promise<void> => {
    const redirectTo = searchParams.get('redirect') || '/beers'
    console.log('will redirect to', redirectTo)
    authControl.login({ email: inputs.email, password: inputs.password }, (authState) => {
      navigate(redirectTo)
      setLocalStorage('authState', authState)
    })
  }

  const handleGoogleLogin = async (): Promise<void> => {
    const requestUrl = await authControl.requestGoogleAuthUrl()
    window.location.href = requestUrl
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Sign in
        </Typography>
        <div className="g-signin2" data-onsuccess="onSignIn" />
        <GoogleButton
          label="Sign in with Google"
          onClick={handleGoogleLogin}
          className={classes.marginBottom}
          // type="light"
        />
        <Typography variant="h6">or</Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}
