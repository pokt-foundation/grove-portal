import { Group, Text } from "@pokt-foundation/pocket-blocks"
import { Emoji } from "emoji-picker-react"
import React from "react"
import { DataTable } from "~/components/DataTable"
import Identicon from "~/components/Identicon"
import { PortalApp, User } from "~/models/portal/sdk"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"
import InvitedAppAcceptedLabel from "~/routes/user.invited-apps/components/InvitedAppAcceptedLabel"
import InvitedAppAction from "~/routes/user.invited-apps/components/InvitedAppAction"
import { getUserRole } from "~/utils/applicationUtils"

type InvitedAppsTableProps = { apps: PortalApp[]; user: User }

const InvitedAppsTable = ({ apps, user }: InvitedAppsTableProps) => {
  return (
    <DataTable
      columns={["App Name", "Role", "Status", "Organization", ""]}
      data={apps.map((app) => {
        return {
          appName: {
            element: (
              <Group>
                <Emoji
                  size={14}
                  unified={app.appEmoji !== "" ? app.appEmoji : DEFAULT_APPMOJI}
                />
                <Text> {app.name} </Text>
              </Group>
            ),
          },
          role: {
            element: (
              <Text tt="capitalize">
                {getUserRole(app, user.portalUserID)?.toLowerCase()}
              </Text>
            ),
          },
          status: {
            element: <InvitedAppAcceptedLabel app={app} user={user} />,
          },
          organization: {
            element: (
              <Group>
                <Identicon
                  alt={`${app.accountID} profile picture`}
                  seed={app.accountID}
                  type="account"
                />
                <Text size="sm" weight={500}>
                  {app.accountID}
                </Text>
              </Group>
            ),
          },
          action: {
            element: <InvitedAppAction app={app} user={user} />,
          },
        }
      })}
      paginate={false}
    />
  )
}

export default InvitedAppsTable
