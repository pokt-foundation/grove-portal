import { Box, Stack, Text } from "@pokt-foundation/pocket-blocks"
import OrganizationsTable from "./components/OrganizationsTable"
import { Account } from "~/models/portal/sdk"

type UserOrganizationsProps = {
  accounts: Account[]
}

export const UserOrganizations = ({ accounts }: UserOrganizationsProps) => {
  return (
    <Box pt="xl">
      <Text>See and access to the organizations you are part of.</Text>

      <Stack mt="xl">
        <OrganizationsTable accounts={accounts} />
      </Stack>
    </Box>
  )
}

export default UserOrganizations
