import {
  Avatar,
  Flex,
  Group,
  MantineTheme,
  Select,
  Text,
} from "@pokt-foundation/pocket-blocks"
import { DataTable } from "~/components/DataTable"
import Identicon from "~/components/Identicon"
import { PortalApp, RoleName, RoleNameV2, User } from "~/models/portal/sdk"
import TeamMemberAction from "~/routes/org.$accountId.$appId.team/components/TeamMemberAction"
import useTeamModals from "~/routes/org.$accountId.$appId.team/hooks/useTeamModals"
import { getAppAcceptedValue, getUserRole } from "~/utils/applicationUtils"

type TeamMembersTableProps = {
  app: PortalApp
  userRole: RoleNameV2 | null
  user?: User
}

const TeamMembersTable = ({ app, userRole, user }: TeamMembersTableProps) => {
  const { openChangeRoleModal } = useTeamModals({ app })

  const teamData = app.users
    .map((user) => ({
      ...user,
      roleName: getUserRole(app, user.userID),
      accepted: getAppAcceptedValue(app, user.userID),
    }))
    .sort((a, b) => Number(b.owner) - Number(a.owner))

  return (
    <DataTable
      columns={["Member", "Roles", "Status", ""]}
      data={teamData.map(({ email, roleName, accepted, userID }, index) => {
        return {
          member: {
            element: (
              <Group>
                <Avatar radius="xl">
                  <Identicon
                    alt={`${userID} profile picture`}
                    seed={userID}
                    size="md"
                    type="user"
                  />
                </Avatar>
                <Text> {email} </Text>
              </Group>
            ),
          },
          role: {
            element:
              roleName === RoleNameV2.Owner ? (
                <Text> Owner </Text>
              ) : userRole !== RoleNameV2.Member ? (
                <Flex>
                  <Select
                    data={[
                      {
                        value: RoleName.Member,
                        label: "Member",
                      },
                      {
                        value: RoleName.Admin,
                        label: "Admin",
                      },
                    ]}
                    defaultValue={roleName}
                    disabled={!accepted}
                    onChange={(value) =>
                      value !== roleName &&
                      openChangeRoleModal(email, userID, value as RoleName)
                    }
                  />
                </Flex>
              ) : (
                <Text tt="capitalize"> {roleName?.toLowerCase()} </Text>
              ),
          },
          status: {
            element: (
              <Text
                sx={(theme: MantineTheme) => ({
                  ...(roleName !== RoleNameV2.Owner && {
                    color: accepted ? theme.colors.green[6] : theme.colors.yellow[7],
                  }),
                })}
              >
                {roleName === RoleNameV2.Owner ? "-" : accepted ? "Accepted" : "Pending"}
              </Text>
            ),
          },
          action: {
            element: roleName !== RoleNameV2.Owner && (
              <TeamMemberAction
                app={app}
                status={accepted}
                teamMember={teamData[index]}
                user={user}
                userRole={userRole}
              />
            ),
          },
        }
      })}
      paginate={teamData.length > 10 ? { perPage: 10 } : false}
    />
  )
}

export default TeamMembersTable
