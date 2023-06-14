import { Text } from "@pokt-foundation/pocket-blocks"
import { useNavigate } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"
import { TableBodyProps, TableDataArray } from "~/types/table"

const renderTableCell = ([key, value]: TableDataArray) => (
  <td key={key}>{typeof value === "object" ? value.element : value}</td>
)

export const TableBody = ({ paginatedData, rowAsLink, data }: TableBodyProps) => {
  const { t } = useTranslate()

  const navigate = useNavigate()

  return (
    <tbody>
      {paginatedData.length > 0 ? (
        paginatedData.map((item) => {
          const { id, ...itemData } = item

          const tableData = Object.entries(itemData)

          return (
            <tr
              key={id}
              onClick={() => {
                if (!rowAsLink) return
                navigate(id)
              }}
            >
              {tableData.map(renderTableCell)}
            </tr>
          )
        })
      ) : (
        <tr>
          <td
            className="empty-search"
            colSpan={data?.length && data[0].length ? Object.keys(data[0]).length : 0}
          >
            <Text align="center">{t.search.emptySearch}</Text>
          </td>
        </tr>
      )}
    </tbody>
  )
}
