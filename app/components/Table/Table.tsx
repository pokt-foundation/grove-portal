import { Table as MantineTable, Box } from "@pokt-foundation/pocket-blocks"
import { useState } from "react"
import styles from "./styles.css"
import { TableBody } from "./TableBody"
import { TableHeader } from "./TableHeader"
import { TablePagination } from "./TablePagination"
import { usePagination } from "~/hooks/usePagination"
import { IdObj, TableProps } from "~/types/table"

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
    searchTerm,
  })

  return (
    <div className="pokt-table">
      <Box>
        {(label || search) && (
          <TableHeader
            columns={columns}
            label={label}
            rightComponent={rightComponent}
            search={search}
            setSearchTerm={setSearchTerm}
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
            <TableBody data={data} paginatedData={paginatedData} rowAsLink={rowAsLink} />
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
