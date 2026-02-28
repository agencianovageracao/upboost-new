export type APIRequestGeneric<T> = {
  message: string
  status: number
  data?: T
}