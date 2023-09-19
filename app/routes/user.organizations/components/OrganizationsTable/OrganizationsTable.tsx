import { Text } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { DataTable } from "~/components/DataTable"
import { Account } from "~/models/portal/sdk"

type OrganizationsTableProps = { accounts: Account[] }

const OrganizationsTable = ({ accounts }: OrganizationsTableProps) => {
  return accounts.length > 0 ? (
    <DataTable
      columns={["Organization", "Applications", ""]}
      data={accounts.map((account) => {
        return {
          organization: {
            element: <Text> {account?.id} </Text>,
          },
          applications: {
            element: <Text> {account?.portalApps?.length} </Text>,
          },
          action: {
            element: <Link to={`/account/${account.id}`}>Go to Org</Link>,
          },
        }
      })}
      paginate={false}
    />
  ) : null
}

export default OrganizationsTable
