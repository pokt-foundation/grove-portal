import { hideNotification } from "@mantine/notifications"
import { Box, Stack, Text } from "@pokt-foundation/pocket-blocks"
import { useEffect } from "react"
import AccountsTable from "./components/AccountsTable"
import { PENDING_INVITES_NOTIFICATION_ID } from "~/components/RootAppShell/RootAppShell"
import { Account, User } from "~/models/portal/sdk"

type UserAccountsProps = {
  accounts: Account[]
  pendingAccounts: Account[]
  user: User
}

export const UserAccounts = ({ accounts, pendingAccounts, user }: UserAccountsProps) => {
  useEffect(() => {
    // Close the notification if it's still open
    hideNotification(PENDING_INVITES_NOTIFICATION_ID)
  }, [])

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
