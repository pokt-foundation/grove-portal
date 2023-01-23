import { Text, TextInput } from "@mantine/core"
import { Group, Table as MantineTable, Pagination } from "@pokt-foundation/pocket-blocks"
import { useMemo, useState } from "react"
import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/shared/Card"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface TableProps<T> {
  data: T[]
  columns?: Partial<keyof T>[] | string[]
  label?: string
  paginate?: boolean | PaginateProps
  search?: boolean | any[]
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

type tableDataArray = [
  string,
  (
    | string
    | {
        value: string
        element: JSX.Element
      }
  ),
]

export const Table = <T extends IdObj>({
  data,
  columns = Object.keys(data[0]) as (keyof T)[],
  label,
  paginate,
  search = false,
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

  const emptyRows = useMemo(() => {
    const rows = perPage - paginatedData.length
    if (rows <= 0) {
      return []
    }
    return new Array(rows).fill("empty")
  }, [paginatedData, perPage])

  const __handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const removeIdFromObject = (obj: Partial<T>): Omit<Partial<T>, "id"> => {
    delete obj.id
    return obj
  }

  paginatedData.map((item) => {
    console.log(Object.entries(removeIdFromObject(item)))
  })

  return (
    <div className="pokt-table">
      <Card>
        {(label || search) && (
          <Group align="center" className="pokt-table-header" position="apart">
            {label && <h3>{label}</h3>}
            {search && (
              <TextInput
                aria-label={`${t.search.searchBy} Network, ID or Status`}
                className="pokt-table-search"
                name="search"
                placeholder={`${t.search.searchBy} Network, ID or Status`}
                rightSectionWidth={85}
                size="xs"
                variant="default"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
          </Group>
        )}
        <div className="pokt-table-overflow">
          <MantineTable>
            <thead>
              <tr>
                {columns.map((key) => (
                  <th key={key as string}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id}>
                    {Object.entries(removeIdFromObject(item)).map(
                      ([key, value]: tableDataArray) => (
                        <td key={key}>
                          {typeof value === "object" ? value.element : value}
                        </td>
                      ),
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={Object.keys(data[0]).length} className="empty-search">
                    <Text align="center">{t.search.emptySearch}</Text>
                  </td>
                </tr>
              )}
              {emptyRows &&
                emptyRows.map((row, index) => (
                  <tr key={index} className={row}>
                    {Object.entries(removeIdFromObject(data[0])).map((_, index) => (
                      <td key={index}></td>
                    ))}
                  </tr>
                ))}
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
      </Card>
    </div>
  )
}

export default Table
