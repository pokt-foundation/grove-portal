import { Divider } from "@mantine/core"
import { Container, Stack, Text } from "@pokt-foundation/pocket-blocks"
import OrganizationsTable from "./components/OrganizationsTable"
import { GetUserAccountsQuery } from "~/models/portal/sdk"

type UserOrganizationsProps = {
  accounts: GetUserAccountsQuery["getUserAccounts"]
}

export const UserOrganizations = ({ accounts }: UserOrganizationsProps) => {
  return (
    <>
      <Stack>
        <Text fw={600} fz={16} pt={6}>
          My Organizations
        </Text>
        <Divider />
        <Text>See the organizations you are part of.</Text>
      </Stack>

      <Stack mt="xl">
        <OrganizationsTable accounts={accounts} />
      </Stack>
    </>
  )
}

export default UserOrganizations
