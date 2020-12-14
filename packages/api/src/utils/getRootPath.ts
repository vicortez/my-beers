import path from 'path'

export const getRootPath = (currentServerDir: string): string => {
  return path.join(currentServerDir, '..', '..')
}
