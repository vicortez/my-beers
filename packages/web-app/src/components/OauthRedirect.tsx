import { useAuthControl } from 'common/contexts/Auth'
import { IoauthResponse } from 'common/contexts/Auth/AuthContext'
import qs from 'qs'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cookies } from '../utils/cookies'

interface googleRedirectResponseQuery {
  // eslint-disable-next-line camelcase
  access_token: string
  authuser?: string
  // eslint-disable-next-line camelcase
  expires_in: string
  prompt?: string
  scope: string
  state?: string
}

// TODO handle error returned on auth
export const OauthRedirect: React.FC = () => {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const authControl = useAuthControl()
  let query = ''
  if (hash[0] === '#') {
    query = hash.substring(1)
  } else {
    console.error('Google authorization error')
  }
  const parsedQuery: googleRedirectResponseQuery = (qs.parse(query) as unknown) as googleRedirectResponseQuery
  const oauthResponse: IoauthResponse = {
    accessToken: parsedQuery.access_token,
    authuser: parsedQuery.access_token,
    expiresIn: parsedQuery.expires_in,
    prompt: parsedQuery.prompt,
    scope: parsedQuery.scope,
    state: parsedQuery.state,
  }

  // TODO implement redirect (possibly refactor to DRY)
  if (oauthResponse.accessToken) {
    authControl.tokenLogin(oauthResponse, (authState) => {
      navigate('/beers')
      cookies.set('authState', authState)
    })
  } else {
    console.error('Google authorization error: access token not found')
    navigate('/login')
  }

  return <p style={{ textAlign: 'center' }}>logging in...</p>
}
