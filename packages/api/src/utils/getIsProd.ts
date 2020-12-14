export const getIsProd = (): boolean =>
  (process.env.NODE_ENV || '').trim() === 'production' || (process.env.NODE_ENV || '').trim() === 'prod'
