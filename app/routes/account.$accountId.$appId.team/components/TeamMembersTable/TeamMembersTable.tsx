import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  MantineTheme,
  Menu,
  Select,
  Text,
} from "@pokt-foundation/pocket-blocks"
import { LuMinusCircle, LuMoreHorizontal, LuUser } from "react-icons/lu"
import { DataTable } from "~/components/DataTable"
import { ProcessedEndpoint, RoleName } from "~/models/portal/sdk"
import useTeamModals from "~/routes/account.$accountId.$appId.team/hooks/useTeamModals"
import useCommonStyles from "~/styles/commonStyles"

type TeamMembersTableProps = { endpoint: ProcessedEndpoint; userRole: RoleName | null }

const TeamMembersTable = ({ endpoint, userRole }: TeamMembersTableProps) => {
  const { users: members } = endpoint
  const { classes: commonClasses } = useCommonStyles()

  const { openRemoveUserModal, openChangeRoleModal } = useTeamModals({ endpoint })

  return (
    <DataTable
      columns={["Member", "Roles", "Status", ""]}
      data={members.map(({ email, roleName, accepted }) => {
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
              roleName === RoleName.Owner ? (
                <Text> Owner </Text>
              ) : (
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
                    disabled={!accepted || userRole === RoleName.Member}
                    onChange={(value) =>
                      value !== roleName && openChangeRoleModal(email, value as RoleName)
                    }
                  />
                </Flex>
              ),
          },
          status: {
            element: (
              <Text>
                {roleName === RoleName.Owner ? (
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
              roleName !== RoleName.Owner ? (
                <Flex justify="flex-end">
                  <Menu>
                    <Menu.Target>
                      <ActionIcon
                        className={commonClasses.grayOutlinedButton}
                        radius="xl"
                        size={40}
                        variant="outline"
                      >
                        <LuMoreHorizontal />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        icon={<LuMinusCircle size={18} />}
                        onClick={() => openRemoveUserModal(email)}
                      >
                        <Text>Remove</Text>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Flex>
              ) : null,
          },
        }
      })}
      paginate={members.length > 10 ? { perPage: 10 } : false}
    />
  )
}

export default TeamMembersTable
