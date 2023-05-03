import {
  Group,
  Table as MantineTable,
  Pagination,
  Text,
  IconSearch,
  TextInput,
  Box,
} from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { useMemo, useState } from "react"
import styles from "./styles.css"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface TableProps<T> {
  data: T[]
  columns?: Partial<keyof T>[] | string[]
  label?: string
  paginate?: boolean | PaginateProps
  search?: boolean | any[]
  rightComponent?: React.ReactNode
  subHeader?: React.ReactNode
  rowAsLink?: boolean
}

interface PaginateProps {
  page?: number
  totalPages?: number
  perPage?: number
}

interface IdObj {
  id: string | number
  [key: string]:
    | string
    | number
    | {
        value: string | number
        element: JSX.Element
      }
}

type TableDataArray = [
  string,
  (
    | string
    | {
        value: string
        element: JSX.Element
      }
  ),
]

const renderTableCell = ([key, value]: TableDataArray) => (
  <td key={key}>{typeof value === "object" ? value.element : value}</td>
)

export const Table = <T extends IdObj>({
  data,
  columns = Object.keys(data[0]) as (keyof T)[],
  label,
  paginate,
  search = false,
  rightComponent,
  subHeader,
  rowAsLink = false,
}: TableProps<T>) => {
  const { t } = useTranslate()
  const [searchTerm, setSearchTerm] = useState("")
  const totalData = useMemo(() => {
    let rows = data
    if (search && searchTerm) {
      rows = rows.filter((row) => {
        const columns = Object.values(row).map((column) => {
          if (typeof column === "object") {
            return column.value
          }
          return column
        })
        const filter = columns.join().toLowerCase().trim()
        const exists = filter.includes(searchTerm.toLowerCase().trim())
        return exists
      })
    }
    return rows
  }, [data, search, searchTerm])
  const [page, setPage] = useState<number>((paginate as PaginateProps)?.page ?? 1)
  const perPage = useMemo<number>(
    () => (paginate as PaginateProps)?.perPage ?? 5,
    [paginate],
  )
  const totalPages = useMemo<number>(
    () =>
      (paginate as PaginateProps)?.totalPages ?? Math.ceil(totalData.length / perPage),
    [totalData, perPage, paginate],
  )
  const paginatedData = useMemo(() => {
    let rows = totalData
    if (paginate) {
      rows = rows.slice((page - 1) * perPage, page * perPage)
    }
    return rows
  }, [totalData, paginate, page, perPage])

  const __handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className="pokt-table">
      <Box>
        {(label || search) && (
          <Group align="center" className="pokt-table-header" position="apart">
            {label && <h3>{label}</h3>}
            {search && (
              <TextInput
                aria-label={`${t.search.searchBy} ${columns.join(", ")}`}
                className="pokt-table-search"
                icon={<IconSearch fill="white" height={12} width={12} />}
                name="search"
                placeholder={`${t.search.searchBy} ${columns.join(", ")}`}
                rightSectionWidth={85}
                size="xs"
                variant="default"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
            {rightComponent && rightComponent}
          </Group>
        )}

        {subHeader && <div>subHeader</div>}

        <div className="pokt-table-overflow">
          <MantineTable>
            <thead>
              <tr>
                {columns.map((key) => (
                  <th key={key as string}>{key as string}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => {
                  const { id, ...itemData } = item
                  const tableData = Object.entries(itemData)

                  return (
                    <tr key={id}>
                      {rowAsLink ? (
                        <Link
                          style={{
                            display: "contents",
                          }}
                          to={`${id}`}
                        >
                          {tableData.map(renderTableCell)}
                        </Link>
                      ) : (
                        tableData.map(renderTableCell)
                      )}
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td className="empty-search" colSpan={Object.keys(data[0]).length}>
                    <Text align="center">{t.search.emptySearch}</Text>
                  </td>
                </tr>
              )}
            </tbody>
          </MantineTable>
        </div>
        {paginate && (
          <Group align="center" className="pokt-table-paginate" position="apart">
            <Pagination
              initialPage={page}
              mt={30}
              page={page}
              position="right"
              radius="md"
              size="sm"
              total={totalPages}
              withControls={false}
              onChange={__handlePageChange}
            />
          </Group>
        )}
      </Box>
    </div>
  )
}

export default Table
