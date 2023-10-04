import { cleanNotifications } from "@mantine/notifications"
import { Box, Text } from "@pokt-foundation/pocket-blocks"
import { useEffect, useMemo } from "react"
import { PortalApp, RoleNameV2, User } from "~/models/portal/sdk"
import InvitedAppsTable from "~/routes/user.invited-apps/components/InvitedAppsTable"
import { getAppAcceptedValue, getUserRole } from "~/utils/applicationUtils"

type UserInvitedAppsProps = {
  apps: PortalApp[]
  user: User
}

export const UserInvitedApps = ({ apps, user }: UserInvitedAppsProps) => {
  useEffect(() => {
    // Close the notification if it's still open
    cleanNotifications()
  }, [])

  const invitedApps = useMemo(() => {
    return apps
      .map((app) => ({
        ...app,
        accepted: getAppAcceptedValue(app, user.portalUserID),
        role: getUserRole(app, user.portalUserID),
      }))
      .sort((a, b) => Number(a.accepted) - Number(b.accepted))
      .filter((app) => app.role !== RoleNameV2.Owner)
  }, [apps, user])

  return (
    <Box pt="xl">
      {invitedApps.length > 0 ? (
        <>
          <Text>Manage your apps.</Text>
          <InvitedAppsTable apps={invitedApps} user={user} />
        </>
      ) : (
        <Text>
          You haven't been invited to any apps yet. Once you receive and invitation it
          will appear here.
        </Text>
      )}
    </Box>
  )
}

export default UserInvitedApps
