/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
// This file exists because some external libraries have wrong type definitions.
export {}
// WORKAROUND TODO: Remove when the connect-mongo types are updated
declare global {
  namespace Express {
    interface SessionData {
      cookie: any
    }
  }
}
