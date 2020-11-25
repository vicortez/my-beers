import { Request, Response, NextFunction } from 'express'

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    next()
    return
  }
  res.status(401).json({ msg: 'You are not authorized to view this resource' })
}
