export type LoaderDataStruct<T> =
  | {
      data: T
      error: false
      message?: string
    }
  | {
      data: null
      error: true
      message: string
    }
