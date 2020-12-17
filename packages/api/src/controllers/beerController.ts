import IBeer from 'common/models/Beer'
import IUser from 'common/models/User'
import { NextFunction, Request, Response } from 'express'
import { Beer } from '../models/Beer'
import { v2 as cloudinary } from 'cloudinary'

export const postBeer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.user && (req.user as IUser).id
  const { name, rating, picture } = req.body
  // TODO validate
  const beer = new Beer({
    picture,
    name,
    rating,
    userId,
  } as IBeer)
  try {
    const createdBeer = await beer.save()
    res.send(createdBeer)
  } catch (e) {
    res.status(422).send({ erro: e.message })
  }
}

export const getUserBeers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = (req.user as IUser).id
  const { skip, limit } = req.query
  const beers = await Beer.find({ userId })
    .sort([
      ['rating', -1],
      ['createdAt', -1],
    ])
    .limit(Number(limit) || 0)
    .skip(Number(skip) || 0)
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
  try {
    const result = await Beer.findByIdAndUpdate(id, { ...req.body }, updateOptions)
    res.send(result)
  } catch (e) {
    res.send(e.message)
  }
}

export const imgUploadSignature = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!process.env.CLOUDINARY_API_SECRET) {
    res.status(500).send({ message: 'missing secret sauce' })
    return
  }
  const timestamp = Math.round(new Date().getTime() / 1000)
  const requestOptions = {
    timestamp,
    // optionally, control the unique identifier for that asset.
    // public_id: 'sample_image'
  }
  const signature = cloudinary.utils.api_sign_request(requestOptions, process.env.CLOUDINARY_API_SECRET)
  res.send({ signature, timestamp })
}
