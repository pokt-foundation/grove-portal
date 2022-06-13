import { Group, Pagination, Table as MantineTable, TextInput } from "@mantine/core"
import { useMemo, useState } from "react"
import Card, { links as CardLinks } from "~/components/shared/Card"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

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

  return (
    <div className="pokt-table">
      <Card>
        {(label || search) && (
          <Group position="apart" align="center" className="pokt-table-header">
            {label && <h3>{label}</h3>}
            {search && (
              <TextInput
                className="pokt-table-search"
                name="search"
                aria-label={`${t.search.label} ${label}`}
                placeholder={`${t.search.label} ${label}`}
                size="xs"
                onChange={(e) => setSearchTerm(e.target.value)}
                rightSectionWidth={85}
                variant="default"
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
              {emptyRows &&
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
          <Group position="apart" align="center" className="pokt-table-paginate">
            <Pagination
              mt={30}
              position="right"
              page={page}
              initialPage={page}
              onChange={__handlePageChange}
              total={totalPages}
              size="sm"
              radius="md"
              withControls={false}
            />
          </Group>
        )}
      </Card>
    </div>
  )
}

export default Table
