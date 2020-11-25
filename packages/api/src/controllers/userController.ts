import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { IVerifyOptions } from 'passport-local'
import { UserDocument } from '../models/User'

export const register = (req: Request, res: Response, next: NextFunction): void => {
  console.log('TODO')
}

export const login = (req: Request, res: Response, next: NextFunction): void => {
  console.log(req.session.id)
  passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions): void => {
    if (err) {
      next(err)
    }
    if (!user) {
      res.status(400).send('not found')
    }
    // res.status(200).send('success')
  })(req, res, next)
}

export const logout = (req: Request, res: Response, next: NextFunction): void => {
  req.logOut()
}
