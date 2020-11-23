import { BaseModel } from './BaseModel'

export default interface User extends BaseModel {
  email: string
  password?: string
  name: string
}
