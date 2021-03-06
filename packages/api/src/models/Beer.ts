import IBeer from 'common/models/Beer'
// import { rating } from 'common/models/Ratingll'
import mongoose from 'mongoose'

export type BeerDocument = IBeer & mongoose.Document

const BeerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      // enum: rating,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
)
BeerSchema.set('toJSON', {
  virtuals: true,
})
BeerSchema.set('toObject', {
  virtuals: true,
})
export const Beer = mongoose.model<BeerDocument>('Beer', BeerSchema)
