import { Divider } from "@mantine/core"
import { Container, Stack, Text } from "@pokt-foundation/pocket-blocks"
import { GetUserAccountsQuery } from "~/models/portal/sdk"
import OrganizationsTable from "~/routes/account.$accountId.organizations/components/OrganizationsTable"

type UserOrganizationsProps = {
  accounts: GetUserAccountsQuery["getUserAccounts"]
}

export const UserOrganizations = ({ accounts }: UserOrganizationsProps) => {
  console.log("accounts")
  console.log(accounts)
  return (
    <Container>
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
    </Container>
  )
}

export default UserOrganizations
