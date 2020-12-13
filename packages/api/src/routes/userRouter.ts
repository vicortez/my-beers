import { Router } from 'express'
import { celebrate as validate, Joi, errors } from 'celebrate'
import { login, logout, getUser, register } from '../controllers/userController'
import { isAuthenticated } from '../middleware/authMiddleware'

const userRouter = Router()

userRouter.post(
  '/register',
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
userRouter.get('/logout', isAuthenticated, logout)
userRouter.get('/:id', isAuthenticated, getUser)

userRouter.use(errors())

export { userRouter }
