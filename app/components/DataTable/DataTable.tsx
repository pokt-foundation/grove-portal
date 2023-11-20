import { createStyles } from "@mantine/core"
import { Table, Box, LoadingOverlay } from "@mantine/core"
import React from "react"
import { DataTableBody } from "./DataTableBody"
import { DataTablePagination } from "./DataTablePagination"
import { usePagination } from "~/hooks/usePagination"
import { DataTableProps, IdObj } from "~/types/table"

const useTableStyles = createStyles((theme) => ({
  table: {
    "& tbody tr td": {
      borderColor: "rgba(55,58,64, 0.5)",
    },
    "& thead tr th": {
      borderColor: "rgba(55,58,64, 0.5)",
    },
  },
}))

export const DataTable = <T extends IdObj>({
  data,
  columns,
  paginate,
  rowAsLink = false,
  searchTerm,
  onRowClick,
  isLoading = false,
}: DataTableProps<T>) => {
  const { paginatedData, totalPages, page, handlePageChange } = usePagination({
    data,
    paginate,
    searchTerm,
  })

  const { classes, cx } = useTableStyles()

  return (
    <Box pos="relative">
      <LoadingOverlay overlayBlur={1} visible={isLoading} />
      <Table
        className={cx(classes.table, { "clickable-table": !!onRowClick })}
        highlightOnHover={!!onRowClick}
        verticalSpacing="xl"
      >
        {columns && (
          <thead>
            <tr>
              {columns.map((key) => (
                <th key={key as string}>{key as string}</th>
              ))}
            </tr>
          </thead>
        )}

        <DataTableBody
          data={data}
          paginatedData={paginatedData}
          rowAsLink={rowAsLink}
          onRowClick={onRowClick}
        />
      </Table>

      {paginate && (
        <DataTablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  )
}

export default DataTable
