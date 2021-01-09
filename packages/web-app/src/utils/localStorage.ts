export const setLocalStorage = (name: string, data: unknown): boolean => {
  try {
    window.localStorage.setItem(name, JSON.stringify(data))
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export const getLocalStorage = <T>(name: string): T | false => {
  const registroLocal = window.localStorage.getItem(name)
  return registroLocal !== null ? (JSON.parse(registroLocal) as T) : false
}

export const removeItemFromLocalStorage = (name: string): boolean => {
  try {
    window.localStorage.removeItem(name)
    return true
  } catch (e) {
    return false
  }
}
