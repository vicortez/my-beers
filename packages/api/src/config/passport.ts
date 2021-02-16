import axios, { AxiosRequestConfig } from 'axios'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Strategy as CustomStrategy } from 'passport-custom'
import { Strategy as LocalStrategy } from 'passport-local'
import { User, UserDocument } from '../models/User'

passport.serializeUser<UserDocument, string>((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (e) {
    done(e)
  }
})

const localOptions = {
  usernameField: 'email',
}

const localStrategy = new LocalStrategy(localOptions, async (email, password, done) => {
  // called when passport.authenticate is called.
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return done(null, false, { message: 'Email not registered or incorrect password' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return done(null, false, { message: 'Email not registered or incorrect password' })
    }
    return done(null, user)
  } catch (e) {
    return done(e)
  }
})
passport.use(localStrategy)

// TODO
// interface GoogleUser {
//   sub:string,

// }

const tokenStrategy = new CustomStrategy(async (req, done) => {
  const { accessToken } = req.body
  if (!accessToken) {
    return done({ message: 'Authentication failure, acess token not sent' }, false)
  }
  try {
    const reqOpts: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
    const {
      data: { email },
    } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', reqOpts)
    if (!email) {
      return done({ message: 'Authentication failure, google email not found' }, false)
    }
    const user = await User.findOne({ email })
    if (!user) {
      if (process.env.ACCEPT_NEW_USERS === 'yes') {
        const newUser = new User({ email })
        const savedUser = await newUser.save()
        return done(null, savedUser)
      }
      return done({ message: 'New users are not allowed at the moment' }, false)
    }
    return done(null, user)
  } catch (e) {
    console.error(e)
    return done({ message: 'erro!!' }, 'OKOK')
  }
})
passport.use('token-strategy', tokenStrategy)
