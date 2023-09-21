import {
  Avatar,
  Flex,
  Group,
  MantineTheme,
  Select,
  Text,
} from "@pokt-foundation/pocket-blocks"
import { LuUser } from "react-icons/lu"
import { DataTable } from "~/components/DataTable"
import { PortalApp, RoleName, RoleNameV2, User } from "~/models/portal/sdk"
import TeamMemberAction from "~/routes/account.$accountId.$appId.team/components/TeamMemberAction"
import useTeamModals from "~/routes/account.$accountId.$appId.team/hooks/useTeamModals"
import { getAppAcceptedValue, getUserRole } from "~/utils/applicationUtils"

type TeamMembersTableProps = {
  app: PortalApp
  userRole: RoleNameV2 | null
  user?: User
}

const TeamMembersTable = ({ app, userRole, user }: TeamMembersTableProps) => {
  const { openChangeRoleModal } = useTeamModals({ appId: app.id })

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
                <Avatar color="blue" radius="xl">
                  <LuUser size={24} />
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
              <Text>
                {roleName === RoleNameV2.Owner ? (
                  "-"
                ) : (
                  <Text
                    sx={(theme: MantineTheme) => ({
                      color: accepted ? theme.colors.green[6] : theme.colors.yellow[7],
                    })}
                  >
                    {accepted ? "Accepted" : "Pending"}
                  </Text>
                )}
              </Text>
            ),
          },
          action: {
            element:
              roleName !== RoleNameV2.Owner ? (
                <TeamMemberAction
                  appId={app.id}
                  teamMember={teamData[index]}
                  user={user}
                  userRole={userRole}
                />
              ) : null,
          },
        }
      })}
      paginate={teamData.length > 10 ? { perPage: 10 } : false}
    />
  )
}

export default TeamMembersTable
