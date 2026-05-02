export type FormState<T, E = Partial<Record<keyof T, string | undefined>>> = {
  values: T
  error?: string
  errors: E
  success?: boolean
}


export type FormState<T, E = Partial<Record<keyof T, string | undefined>>> = {
  values: T
  error?: string
  errors: E
  success?: boolean
}

export type Result<T> = {
  code: number
  message: string
  data: T
}

export type FetchOptions = RequestInit & {
  responseType?: 'json' | 'blob' | 'text',
  next?: NextFetchRequestConfig

}