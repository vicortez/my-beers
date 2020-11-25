import mongo from 'connect-mongo'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import passport from 'passport'
import './config/passport'
import { apiRouter } from './routes'

const app = express()

app.set('port', process.env.PORT || 8080)
const mongoURI = 'mongodb://localhost/my-beers'
;(async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true })
    console.log(`Connected to database`)
  } catch (e) {
    console.error(e)
  }
})()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const MongoStore = mongo(session)
const sessionStore = new MongoStore({ url: mongoURI, collection: 'sessions' })
app.use(
  session({
    secret: 'banana',
    resave: false,
    saveUninitialized: true,
    cookie: {
      //  secure: true
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: sessionStore,
  }),
)
// passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  next()
})

app.use('/api', apiRouter)

app.get('/test', (req, res) => res.send(new Date().toISOString()))

export const server = app.listen(app.get('port'), () => console.log(`server running on port ${app.get('port')}`))
