import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { IVerifyOptions } from 'passport-local'
import querystring from 'querystring'
import { User, UserDocument } from '../models/User'

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, passwordConf } = req.body
  const errs = []
  if (!email || !password || !passwordConf) {
    errs.push({
      msg: 'please provide email and password',
    })
  }
  if (password !== passwordConf) {
    errs.push({ msg: "passwords don't match" })
  }
  const exists = await User.findOne({ email })
  if (!exists) {
    const user = new User({ email, password })
    const savedUser = await user.save()
    res.send(savedUser.email)
  } else {
    errs.push({ msg: 'email is already registered' })
  }
  res.status(422).send(errs)
}

export const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions): void => {
    if (err) {
      next(err)
      return
    }
    if (!user) {
      res.status(401).send(info.message)
      next(null)
      return
    }
    req.login(user, (errLogin): void => {
      if (errLogin) {
        next(errLogin)
        return
      }
      res.status(200).send({ expires: req.session.cookie.expires, email: user.email })
      next(null)
    })
  })(req, res, next)
}

export const tokenLogin = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('token-strategy', (err: Error, user: UserDocument): void => {
    if (err) {
      res.status(401).send({ message: err.message })
      return
    }
    if (!user) {
      res.status(401).send('Error retreiving user')
      next(null)
      return
    }
    req.login(user, (errLogin): void => {
      if (errLogin) {
        next(errLogin)
        return
      }
      res.status(200).send({ expires: req.session.cookie.expires, email: user.email })
      next(null)
    })
  })(req, res, next)
}

export const requestGoogleAuthUrl = (req: Request, res: Response, next: NextFunction): void => {
  // https://www.googleapis.com/auth/userinfo.email
  // https://www.googleapis.com/auth/userinfo.profile

  // https://www.googleapis.com/oauth2/v3/userinfo

  // scopes email profile openid
  // 'https://www.googleapis.com/auth/userinfo.profile',
  // 'https://www.googleapis.com/auth/drive.metadata.readonly',
  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'token',
    include_granted_scopes: true,
    state: 'meuestado',
    scope: 'openid profile email',
  }
  const query = querystring.stringify(params)
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${query}`
  res.send(url)
}

export const logout = (req: Request, res: Response, next: NextFunction): void => {
  req.logout()
  res.send('ok')
}

export const getUser = (req: Request, res: Response, next: NextFunction): void => {
  res.send('TODO™')
}
