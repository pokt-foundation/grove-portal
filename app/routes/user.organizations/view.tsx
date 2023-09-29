import { Box, Stack, Text } from "@pokt-foundation/pocket-blocks"
import OrganizationsTable from "./components/OrganizationsTable"
import { Account, User } from "~/models/portal/sdk"

type UserOrganizationsProps = {
  accounts: Account[]
  user: User
}

export const UserOrganizations = ({ accounts, user }: UserOrganizationsProps) => {
  return (
    <Box pt="xl">
      <Text>See and access to the organizations you are part of.</Text>

      <Stack mt="xl">
        <OrganizationsTable accounts={accounts} user={user} />
      </Stack>
    </Box>
  )
}

export default UserOrganizations
