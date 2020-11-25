import { BaseModel } from './BaseModel'

export default interface IUser extends BaseModel {
  email: string
  password: string
}
