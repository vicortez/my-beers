/**
 * This unified model interface defines the server generated fields for client
 */
export interface BaseModel {
  _id: string
  readonly createdAt?: string
  readonly updatedAt?: string
}
