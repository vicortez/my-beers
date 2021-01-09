import { celebrate as validate, errors, Joi } from 'celebrate'
import { Router } from 'express'
import { getUser, login, logout, register, requestGoogleAuthUrl, tokenLogin } from '../controllers/userController'
import { isAuthenticated } from '../middleware/authMiddleware'

const userRouter = Router()

userRouter.post(
  '/register',
  isAuthenticated,
  validate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
      passwordConf: Joi.string().equal(Joi.ref('password')),
    },
  }),
  register,
)
userRouter.post('/login', login)
userRouter.post('/token-login', tokenLogin)
userRouter.get('/oauth/google/request-auth-url', requestGoogleAuthUrl)
userRouter.get('/logout', isAuthenticated, logout)
userRouter.get('/:id', isAuthenticated, getUser)

userRouter.use(errors())

export { userRouter }
