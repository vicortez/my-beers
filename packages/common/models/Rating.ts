// This enum could not be defined as const, otherwise Object.values(Gender) won't work.
enum Rating {
  DISLIKE = 'DISLIKE',
  LIKE = 'LIKE',
  MEGALIKE = 'MEGALIKE',
}

export default Rating

export const rating = Object.freeze({
  DISLIKE: 'DISLIKE',
  LIKE: 'LIKE',
  MEGALIKE: 'MEGALIKE',
})
