import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { IVerifyOptions } from 'passport-local'
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
      res.status(400).send('not found')
      next(null)
      return
    }
    req.login(user, (errLogin): void => {
      if (errLogin) {
        next(errLogin)
        return
      }
      res.status(200).send('success')
      next(null)
    })
  })(req, res, next)
}

export const logout = (req: Request, res: Response, next: NextFunction): void => {
  req.logOut()
  res.send('ok')
}

export const getUser = (req: Request, res: Response, next: NextFunction): void => {
  res.send('TODO™')
}
