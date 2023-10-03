export type ChartData = {
  [key: string]: string | number | null
}

export type DataStruct<T> =
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
