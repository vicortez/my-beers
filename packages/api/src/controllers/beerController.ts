import IBeer from 'common/models/Beer'
import { NextFunction, Request, Response } from 'express'
import { Beer } from '../models/Beer'

export const postBeer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, rating } = req.body
  // TODO validate
  const beer = new Beer({
    picture: 'base64url',
    name,
    rating,
  } as IBeer)
  try {
    const createdBeer = await beer.save()
    console.log(createdBeer)
    res.send('beer added successfully')
  } catch (e) {
    res.status(422).send({ erro: e.message })
  }
}
