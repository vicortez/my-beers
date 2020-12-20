export const getBase64 = async (file: Blob): Promise<string | undefined> => {
  const reader = new FileReader()
  reader.readAsDataURL(file as Blob)

  return new Promise((resolve, reject) => {
    reader.onload = (): void => (reader.result ? resolve(reader.result as string) : resolve(undefined))
    reader.onerror = (error): void => reject(error)
  })
}
