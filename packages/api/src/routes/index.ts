import { Router } from 'express'
import { userRouter } from './userRouter'
import { beerRouter } from './beerRouter'
import { isAuthenticated } from '../middleware/authMiddleware'

const apiRouter = Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/beers', beerRouter)

export { apiRouter }
