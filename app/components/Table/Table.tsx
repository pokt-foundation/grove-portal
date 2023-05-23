import { Table as MantineTable, Box } from "@pokt-foundation/pocket-blocks"
import { useState } from "react"
import styles from "./styles.css"
import { IdObj, TableProps } from "~/types/table"
import { usePagination } from "~/hooks/usePagination"
import { TableHeader } from "./TableHeader"
import { TableBody } from "./TableBody"
import { TablePagination } from "./TablePagination"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

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
  const [searchTerm, setSearchTerm] = useState("")
  const { paginatedData, totalPages, page, handlePageChange } = usePagination({
    data,
    paginate,
    search,
    searchTerm,
  })

  return (
    <div className="pokt-table">
      <Box>
        {(label || search) && (
          <TableHeader
            label={label}
            search={search}
            columns={columns}
            setSearchTerm={setSearchTerm}
            rightComponent={rightComponent}
          />
        )}

        {subHeader && <div>{subHeader}</div>}

        <div className="pokt-table-overflow">
          <MantineTable>
            <thead>
              <tr>
                {columns.map((key) => (
                  <th key={key as string}>{key as string}</th>
                ))}
              </tr>
            </thead>
            <TableBody paginatedData={paginatedData} rowAsLink={rowAsLink} data={data} />
          </MantineTable>
        </div>
        {paginate && (
          <TablePagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Box>
    </div>
  )
}

export default Table
