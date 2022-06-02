import { Anchor, Table } from "@mantine/core"
import { Link } from "@remix-run/react"
import { PaginatedData } from "~/routes/dashboard/addresses"

type AddressTableProps = {
  paginate: PaginatedData
  columns: any
}

export const AddressTable = ({ paginate, columns }: AddressTableProps) => {
  let url: URL | null
  let params: string | null

  if (typeof window !== "undefined") {
    url = new URL(location.href)
    params = url.searchParams.toString()
  }

  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          {columns[paginate.type].map((key: any) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {paginate.data.map((item) => (
          <tr key={item.address}>
            {Object.entries(item).map(([key, value]) => (
              <td key={key}>
                {key === "address" ? (
                  <Anchor
                    component={Link}
                    to={`${value}${params ? `?${params}` : ""}`}
                    color="primary"
                    sx={{
                      fontSize: "inherit",
                    }}
                  >
                    {value}
                  </Anchor>
                ) : typeof value === "boolean" ? (
                  `${value}`
                ) : (
                  value
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default AddressTable
