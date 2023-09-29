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
      <Text>
        Below is a list of all the organizations you're affiliated with. This overview
        allows you to seamlessly navigate, manage, or switch between different
        organizational portals. Whether you're an owner or a member, you can quickly
        access and engage with each organization's settings and data from here.
      </Text>

      <Stack mt="xl">
        <OrganizationsTable accounts={accounts} user={user} />
      </Stack>
    </Box>
  )
}

export default UserOrganizations
