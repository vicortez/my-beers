import { Router } from 'express'
import { celebrate as validate, Joi, errors } from 'celebrate'
import { User } from '../models/User'
import { login, logout } from '../controllers/userController'

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
  async (req, res) => {
    const { email, password, passwordConf } = req.body
    const errs = []
    if (!email || !password || !passwordConf) {
      errs.push({
        msg: 'please provide email and password',
      })
    }
    if (password !== passwordConf) {
      errs.push({ msg: "passwords don't match" })
    }
    const exists = await User.findOne({ email })
    if (!exists) {
      const user = new User({ email, password })
      const savedUser = await user.save()
      res.send(savedUser.email)
    } else {
      errs.push({ msg: 'email is already registered' })
    }
    res.status(422).send(errs)
  },
)
userRouter.post('/login', login)
userRouter.get('/logout', logout)

userRouter.use(errors())

export { userRouter }
