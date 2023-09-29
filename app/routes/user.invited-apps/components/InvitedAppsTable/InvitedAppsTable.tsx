import { Group, MantineTheme, Text } from "@pokt-foundation/pocket-blocks"
import { Emoji } from "emoji-picker-react"
import { DataTable } from "~/components/DataTable"
import Identicon from "~/components/Identicon"
import { PortalApp, RoleNameV2, User } from "~/models/portal/sdk"
import { DEFAULT_APPMOJI } from "~/routes/org_.$accountId.create/components/AppmojiPicker"
import InvitedAppAction from "~/routes/user.invited-apps/components/InvitedAppAction"

type InvitedApp = PortalApp & { accepted: boolean; role: RoleNameV2 | null }

type InvitedAppsTableProps = { apps: InvitedApp[]; user: User }

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
            element: <Text tt="capitalize">{app.role?.toLowerCase()}</Text>,
          },
          status: {
            element: (
              <Text
                sx={(theme: MantineTheme) => ({
                  color: app.accepted ? theme.colors.green[6] : theme.colors.yellow[7],
                })}
              >
                {app.accepted ? "Accepted" : "Pending"}
              </Text>
            ),
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
