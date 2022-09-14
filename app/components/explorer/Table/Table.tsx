import { TextInput } from "@mantine/core"
import { Group, Pagination, Table as MantineTable } from "@pokt-foundation/pocket-blocks"
import { useEffect, useMemo, useState } from "react"
import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/shared/Card"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface TableProps<T> {
  data: T[]
  columns?: Partial<keyof T>[] | string[]
  label?: string
  paginate?: PaginateProps
  search?: boolean | any[]
}

interface PaginateProps {
  page?: number
  totalPages?: number
  perPage?: number
  handlePageChange?: Function
  withControls?: boolean
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

export const Table = <T extends IdObj>({
  data,
  columns = Object.keys(data[0]) as (keyof T)[],
  label,
  paginate,
  search = false,
}: TableProps<T>) => {
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
  const [page, setPage] = useState<number>(paginate?.page ?? 1)
  const perPage = useMemo<number>(() => paginate?.perPage ?? 5, [paginate])
  const totalPages = useMemo<number>(
    () => paginate?.totalPages ?? Math.ceil(totalData.length / perPage),
    [totalData, perPage, paginate],
  )
  const paginatedData = useMemo(() => {
    let rows = totalData
    if (paginate && !paginate.handlePageChange) {
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
    if (paginate?.handlePageChange) {
      paginate.handlePageChange(newPage)
    } else {
      setPage(newPage)
    }
  }

  useEffect(() => {
    if (typeof paginate === "object" && paginate.page) {
      setPage(paginate.page)
    }
  }, [paginate])

  const removeIdFromObject = (obj: Partial<T>): Omit<Partial<T>, "id"> => {
    delete obj.id
    return obj
  }

  return (
    <div className="pokt-table">
      <Card>
        {(label || search) && (
          <Group align="center" className="pokt-table-header" position="apart">
            {label && <h3>{label}</h3>}
            {search && (
              <TextInput
                aria-label={`Search ${label}`}
                className="pokt-table-search"
                name="search"
                placeholder={`Search ${label}`}
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
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  {Object.entries(removeIdFromObject(item)).map(([key, value]) => (
                    <td key={key}>
                      {typeof value === "object"
                        ? (
                            value as {
                              value: string
                              element: JSX.Element
                            }
                          ).element
                        : value}
                    </td>
                  ))}
                </tr>
              ))}
              {!paginate?.handlePageChange &&
                emptyRows &&
                emptyRows.map((row, index) => (
                  <tr key={index} className={row}>
                    {Object.entries(removeIdFromObject(paginatedData[0])).map(
                      (_, index) => (
                        <td key={index}></td>
                      ),
                    )}
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
              withControls={paginate.withControls ?? false}
              onChange={__handlePageChange}
            />
          </Group>
        )}
      </Card>
    </div>
  )
}

export default Table
