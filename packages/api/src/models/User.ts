import mongoose from 'mongoose'
import IUser from 'common/models/User'
import bcrypt from 'bcryptjs'

export type UserDocument = IUser & mongoose.Document

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

// hooks
UserSchema.pre('save', async function cb(next) {
  const user: UserDocument = this as UserDocument
  if (user.isNew || user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(9)
      const hash = await bcrypt.hash(user.password, salt)
      user.password = hash
      next()
    } catch (e) {
      next(e)
    }
  } else {
    next()
  }
})

export const User = mongoose.model<UserDocument>('User', UserSchema)
