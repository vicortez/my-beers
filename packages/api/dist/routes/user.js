Object.defineProperty(exports, '__esModule', { value: true })
exports.userRouter = void 0
const express_1 = require('express')
const celebrate_1 = require('celebrate')
const userController_1 = require('../controllers/userController')
const authMiddleware_1 = require('../middleware/authMiddleware')

const userRouter = express_1.Router()
exports.userRouter = userRouter
userRouter.post(
  '/register',
  celebrate_1.celebrate({
    body: {
      email: celebrate_1.Joi.string().email().required(),
      password: celebrate_1.Joi.string().min(3).required(),
      passwordConf: celebrate_1.Joi.string().equal(celebrate_1.Joi.ref('password')),
    },
  }),
  userController_1.register,
)
userRouter.post('/login', userController_1.login)
userRouter.get('/logout', userController_1.logout)
userRouter.get('/:id', authMiddleware_1.isAuthenticated, userController_1.getUser)
userRouter.use(celebrate_1.errors())
// # sourceMappingURL=user.js.map
