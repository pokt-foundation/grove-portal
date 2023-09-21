import { cleanNotifications } from "@mantine/notifications"
import { Box, Text } from "@pokt-foundation/pocket-blocks"
import { useEffect } from "react"
import { PortalApp, User } from "~/models/portal/sdk"
import InvitedAppsTable from "~/routes/user.invited-apps/components/InvitedAppsTable"

type UserInvitedAppsProps = {
  apps: PortalApp[]
  user: User
}

export const UserInvitedApps = ({ apps, user }: UserInvitedAppsProps) => {
  useEffect(() => {
    // Close the notification if it's still open
    cleanNotifications()
  }, [])

  return (
    <Box pt="xl">
      <Text>Manage your apps.</Text>
      <InvitedAppsTable apps={apps} user={user} />
    </Box>
  )
}

export default UserInvitedApps
