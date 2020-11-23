import { BaseModel } from './BaseModel'
import Rating from './Rating'

export default interface Beer extends BaseModel {
  name: string
  picture: string
  rating: Rating
}
