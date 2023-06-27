import { Dispatch, SetStateAction } from "react"

export interface IdObj {
  [key: string]: any
}

export type PaginateProps = {
  page?: number
  perPage?: number
  totalPages?: number
}

export type TableDataArray = [string, any]

export interface TableHeaderProps<T extends IdObj> {
  label?: string
  search?: boolean
  columns: (keyof T)[]
  setSearchTerm: Dispatch<SetStateAction<string>>
  rightComponent?: JSX.Element
}

export interface TableBodyProps {
  paginatedData: IdObj[]
  rowAsLink?: boolean
  data: IdObj[]
}

export interface TablePaginationProps {
  page: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

export interface TableProps<T extends IdObj> {
  data: T[]
  columns?: Partial<keyof T>[] | string[]
  label?: string
  paginate: boolean | PaginateProps
  search?: boolean
  rightComponent?: JSX.Element
  subHeader?: JSX.Element
  rowAsLink?: boolean
  emptyComponent?: JSX.Element
}
