import { Router } from 'express'
import { postBeer } from '../controllers/beerController'

const beerRouter = Router()

beerRouter.post('/', postBeer)

export { beerRouter }
