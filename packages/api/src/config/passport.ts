import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User, UserDocument } from '../models/User'

passport.serializeUser<UserDocument, string>((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    console.log('id', id)
    const user = await User.findById(id)
    console.log('user', user)
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
