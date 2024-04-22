import { MantineSpacing } from "@mantine/core/lib/core"
import { ReactNode } from "react"

export interface IdObj {
  [key: string]: any
}

export type PaginateProps = {
  page?: number
  perPage?: number
  totalPages?: number
}

export type TableDataArray = [string, any]

export type TableBodyProps = Pick<
  DataTableProps,
  "rowAsLink" | "onRowClick" | "searchTerm" | "emptyState" | "columns"
> & {
  paginatedData: IdObj[]
}

export interface TablePaginationProps {
  page: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

export interface DataTableProps<T extends IdObj> {
  data: T[]
  columns?: Partial<keyof T>[] | string[]
  label?: string
  paginate: boolean | PaginateProps
  rowAsLink?: boolean
  searchTerm?: string
  onRowClick?: (item: T) => void
  isLoading?: boolean
  emptyState?: ReactNode
  className?: string
  verticalSpacing?: MantineSpacing
}
