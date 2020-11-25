import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import passport from 'passport'
import './config/passport'
import { apiRouter } from './routes'

const app = express()

app.set('port', process.env.PORT || 8080)
;(async (): Promise<void> => {
  const mongoURI = 'mongodb://localhost/my-beers'
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true })
    console.log(`Connected to database`)
  } catch (e) {
    console.error(e)
  }
})()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: 'banana',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true },
  }),
)
// passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', apiRouter)

app.get('/test', (req, res) => res.send(new Date().toISOString()))

export const server = app.listen(app.get('port'), () => console.log(`server running on port ${app.get('port')}`))
