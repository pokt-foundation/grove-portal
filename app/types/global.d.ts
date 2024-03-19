export type ChartData = {
  [key: string]: string | number | null
}

export type ActionDataStruct<T> =
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

export type KeyValuePair<TValue> = { [key: string]: TValue }
