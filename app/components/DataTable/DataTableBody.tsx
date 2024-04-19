import { Table, Text } from "@mantine/core"
import { Link } from "@remix-run/react"
import { TableBodyProps, TableDataArray } from "~/types/table"

const renderTableCell = ([key, value]: TableDataArray) =>
  key !== "rowSelectData" ? (
    <Table.Td key={key} {...value.cellProps}>
      {typeof value === "object" ? value.element : <Text>{value}</Text>}
    </Table.Td>
  ) : null

export const DataTableBody = ({
  paginatedData,
  rowAsLink,
  columns,
  onRowClick,
  searchTerm,
  emptyState,
}: TableBodyProps) => {
  return (
    <Table.Tbody>
      {paginatedData.length > 0 ? (
        paginatedData.map((item, index) => {
          const { id, ...itemData } = item
          const tableData = Object.entries(itemData)

          return (
            <Table.Tr
              key={`${id}-${index}`}
              style={{ ...(!!onRowClick && { cursor: "pointer" }) }}
              onClick={() => onRowClick && onRowClick(item.rowSelectData)}
            >
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
            </Table.Tr>
          )
        })
      ) : (
        <Table.Tr>
          <Table.Td colSpan={columns?.length ?? 0}>
            {searchTerm ? <Text ta="center">Nothing found.</Text> : emptyState}
          </Table.Td>
        </Table.Tr>
      )}
    </Table.Tbody>
  )
}
