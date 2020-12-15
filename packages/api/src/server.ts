import mongo from 'connect-mongo'
import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import passport from 'passport'
import path from 'path'
import './config/passport'
import { apiRouter } from './routes'
import { getIsProd } from './utils/getIsProd'
import { getRootPath } from './utils/getRootPath'

const app = express()

app.set('port', process.env.PORT || 8080)
const mongoURI = getIsProd()
  ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER_URL}`
  : 'mongodb://localhost/my-beers'
;(async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true })
    console.log(`Connected to database`)
  } catch (e) {
    console.error(e)
  }
})()

app.use(express.json({ limit: '4mb' }))
app.use(express.urlencoded({ extended: false }))

const MongoStore = mongo(session)
const sessionStore = new MongoStore({ url: mongoURI, collection: 'sessions' })
if (!process.env.SESSION_COOKIE_SECRET) throw new Error('missing session cookie secret')
app.use(
  session({
    secret: process.env.SESSION_COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: sessionStore,
  }),
)
// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// app.use((req, res, next) => {
//   console.log('session', req.session)
//   console.log(req.user)
//   next()
// })

app.use('/api', apiRouter)

app.get('/test', (req, res) => res.send(new Date().toISOString()))

// web app
if (getIsProd()) {
  const rootPath = getRootPath(__dirname)
  const webAppPath = path.join(rootPath, 'web-app', 'build')
  const webApp = path.join(webAppPath, 'index.html')
  console.log('serving webapp located at', webApp)
  app.use(express.static(webAppPath))
  app.get('/*', (req, res) => {
    res.sendFile(webApp)
  })
}

export const server = app.listen(app.get('port'), () => console.log(`server running on port ${app.get('port')}`))
