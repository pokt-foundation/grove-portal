import { Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { DataTable } from "~/components/DataTable"
import { GetUserAccountsQuery } from "~/models/portal/sdk"

type OrganizationsTableProps = { accounts: GetUserAccountsQuery["getUserAccounts"] }

const OrganizationsTable = ({ accounts }: OrganizationsTableProps) => {
  return accounts.length > 0 ? (
    <DataTable
      columns={["Organization", "Applications"]}
      data={accounts.map((account) => {
        return {
          organization: {
            element: <Text> {account?.id} </Text>,
          },
          applications: {
            element: <Text> {account?.portalApps?.length} </Text>,
          },
        }
      })}
      paginate={false}
    />
  ) : null
}

export default OrganizationsTable
