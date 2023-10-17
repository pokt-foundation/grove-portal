import { Text } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { TableBodyProps, TableDataArray } from "~/types/table"

const renderTableCell = ([key, value]: TableDataArray) =>
  key !== "rowSelectData" ? (
    <td key={key} {...value.cellProps}>
      {typeof value === "object" ? value.element : <Text>{value}</Text>}
    </td>
  ) : null

export const DataTableBody = ({
  paginatedData,
  rowAsLink,
  data,
  onRowClick,
}: TableBodyProps) => {
  return (
    <tbody>
      {paginatedData.length > 0 ? (
        paginatedData.map((item, index) => {
          const { id, ...itemData } = item
          const tableData = Object.entries(itemData)

          return (
            <tr
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
            </tr>
          )
        })
      ) : (
        <tr>
          <td colSpan={data?.length && data[0].length ? Object.keys(data[0]).length : 0}>
            <Text align="center">Nothing found.</Text>
          </td>
        </tr>
      )}
    </tbody>
  )
}
