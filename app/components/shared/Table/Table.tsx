import { Group, Pagination, Table as MantineTable } from "@mantine/core"
import { useMemo, useState } from "react"
import Card from "~/components/shared/Card"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface TableProps<T> {
  data: T[]
  columns?: Partial<keyof T>[] | string[]
  label?: string
  paginate?: boolean | PaginateProps
}

interface PaginateProps {
  page?: number
  totalPages?: number
  perPage?: number
}

interface IdObj {
  id: string | number
}

export const Table = <T extends IdObj>({
  data,
  columns = Object.keys(data[0]) as (keyof T)[],
  label,
  paginate,
}: TableProps<T>) => {
  const [page, setPage] = useState<number>((paginate as PaginateProps)?.page ?? 1)
  const perPage = useMemo<number>(
    () => (paginate as PaginateProps)?.perPage ?? 5,
    [paginate],
  )
  const totalPages = useMemo<number>(
    () => (paginate as PaginateProps)?.totalPages ?? Math.ceil(data.length / perPage),
    [data, perPage, paginate],
  )
  const paginatedData = useMemo(() => {
    if (paginate) {
      return data.slice((page - 1) * perPage, page * perPage)
    }
    return data
  }, [data, paginate, page, perPage])
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
        {label && <h3>{label}</h3>}
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
                  <td key={key}>{value as any}</td>
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
