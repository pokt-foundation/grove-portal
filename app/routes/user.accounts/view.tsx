import { Box, Stack, Text } from "@mantine/core"
import AccountsTable from "./components/AccountsTable"
import { UserAccountLoaderData } from "~/routes/user/route"

type UserAccountsProps = Pick<
  UserAccountLoaderData,
  "accounts" | "pendingAccounts" | "user"
>

export const UserAccounts = ({ accounts, pendingAccounts, user }: UserAccountsProps) => {
  return (
    <Box pt="xl">
      <Text>
        Below is a list of all the accounts you're affiliated with. This overview allows
        you to seamlessly navigate, manage, or switch between different portals. Whether
        you're an owner or a member, you can quickly access and engage with each account's
        settings and data from here.
      </Text>

      <Stack mt="xl">
        <AccountsTable
          accounts={accounts}
          pendingAccounts={pendingAccounts}
          user={user}
        />
      </Stack>
    </Box>
  )
}

export default UserAccounts
