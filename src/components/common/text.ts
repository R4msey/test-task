import localforage from "localforage"

export const getStorage = async () => {
  const response: any = await localforage.getItem('items')
  return await response
}