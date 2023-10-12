import { createStyles } from "@mantine/core"
import { Table, Box } from "@pokt-foundation/pocket-blocks"
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
    "& tbody tr:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? "rgba(37,38,43,0.50) !important"
          : "rgba(250,250,250,0.50) !important",
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
}: DataTableProps<T>) => {
  const { paginatedData, totalPages, page, handlePageChange } = usePagination({
    data,
    paginate,
    searchTerm,
  })

  const { classes } = useTableStyles()

  return (
    <Box>
      <Table
        className={classes.table}
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
