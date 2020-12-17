import { Router } from 'express'
import { postBeer, getUserBeers, getBeer, patchBeer, imgUploadSignature } from '../controllers/beerController'

const beerRouter = Router()

beerRouter.post('/', postBeer)
beerRouter.get('/', getUserBeers)
beerRouter.get('/img-upload-signature', imgUploadSignature)
beerRouter.get('/:id', getBeer)
beerRouter.patch('/:id', patchBeer)

export { beerRouter }
