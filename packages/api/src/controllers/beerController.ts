import IBeer from 'common/models/Beer'
import IUser from 'common/models/User'
import { NextFunction, Request, Response } from 'express'
import { Beer } from '../models/Beer'

export const postBeer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.user && (req.user as IUser).id
  const { name, rating } = req.body
  // TODO validate
  const beer = new Beer({
    picture: 'base64url',
    name,
    rating,
    userId,
  } as IBeer)
  try {
    const createdBeer = await beer.save()
    console.log(createdBeer)
    res.send('beer added successfully')
  } catch (e) {
    res.status(422).send({ erro: e.message })
  }
}

export const getUserBeers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = (req.user as IUser).id
  const beers = await Beer.find({ userId })
  res.send(beers)
}

export const getBeer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const beer = await Beer.findById(id)
  res.send(beer)
}

export const patchBeer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const updateOptions = { runValidators: true, new: true }
  const { id } = req.params
  console.log('reqb', req.body)
  try {
    const result = await Beer.findByIdAndUpdate(id, { ...req.body }, updateOptions)
    console.log('res', result)
  } catch (e) {
    res.send(e.message)
  }

  res.send('beer updated successfully')
}
