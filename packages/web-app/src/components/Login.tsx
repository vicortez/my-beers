import axios from 'axios'
import { useAuth, useAuthControl } from 'common/contexts/Auth'
import React from 'react'
import { useForm } from 'react-hook-form'

type RedirectUrl = string | boolean
interface Inputs {
  password: string
  email: string
}
export const Login = (props: any) => {
  const [redirectToReferrer, setRedirectToReferrer] = React.useState<RedirectUrl>(false)
  const { register, handleSubmit, watch, errors } = useForm<Inputs>()
  const authState = useAuth()
  const authControl = useAuthControl()

  const onSubmit = async (inputs: Inputs) => {
    console.log(inputs)
    // const { data } = await axios.post('oauth2/login', { email: inputs.email, password: inputs.password })
    authControl.login({ email: inputs.email, password: inputs.password })
    // if (redirectToReferrer)
  }

  console.log('auth', authState)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          Email: <input id="email" name="email" ref={register}></input>
        </label>
        <label htmlFor="password">
          Password: <input id="password" type="password" name="password" ref={register}></input>
        </label>
        <button>signin</button>
      </form>
    </div>
  )
}
