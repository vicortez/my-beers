import { Router } from 'express'
import { postBeer, getUserBeers, getBeer } from '../controllers/beerController'

const beerRouter = Router()

beerRouter.post('/', postBeer)
beerRouter.get('/', getUserBeers)
beerRouter.get('/:id', getBeer)

export { beerRouter }
