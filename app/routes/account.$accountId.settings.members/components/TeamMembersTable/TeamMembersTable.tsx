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
import { Account, RoleName, User } from "~/models/portal/sdk"
import TeamMemberAction from "~/routes/account.$accountId.settings.members/components/TeamMemberAction"
import useTeamModals from "~/routes/account.$accountId.settings.members/hooks/useTeamModals"

type TeamMembersTableProps = {
  account: Account
  userRole: RoleName | null
  user?: User
}

const TeamMembersTable = ({ account, userRole, user }: TeamMembersTableProps) => {
  const { openChangeRoleModal } = useTeamModals({ account })

  const teamData = account.users.sort(
    (a, b) => Number(b.roleName === "OWNER") - Number(a.roleName === "OWNER"),
  )

  return (
    <DataTable
      columns={["Member", "Roles", "Status", ""]}
      data={teamData.map(({ email, roleName, accepted, id }, index) => {
        return {
          member: {
            element: (
              <Group>
                <Avatar radius="xl">
                  <Identicon
                    alt={`${id} profile picture`}
                    seed={id}
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
              roleName === RoleName.Owner ? (
                <Text> Owner </Text>
              ) : userRole !== RoleName.Member ? (
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
                      openChangeRoleModal(email, id, value as RoleName)
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
                  ...(roleName !== RoleName.Owner && {
                    color: accepted ? theme.colors.green[6] : theme.colors.yellow[7],
                  }),
                })}
              >
                {roleName === RoleName.Owner ? "-" : accepted ? "Accepted" : "Pending"}
              </Text>
            ),
          },
          action: {
            element: roleName !== RoleName.Owner && (
              <TeamMemberAction
                account={account}
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
