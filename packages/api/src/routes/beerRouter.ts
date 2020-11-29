import { Router } from 'express'
import { postBeer, getUserBeers, getBeer, patchBeer } from '../controllers/beerController'

const beerRouter = Router()

beerRouter.post('/', postBeer)
beerRouter.get('/', getUserBeers)
beerRouter.get('/:id', getBeer)
beerRouter.patch('/:id', patchBeer)

export { beerRouter }
