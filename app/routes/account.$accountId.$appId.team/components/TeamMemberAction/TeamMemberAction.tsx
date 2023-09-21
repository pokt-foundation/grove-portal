import { ActionIcon, Flex, Menu, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { LuMinusCircle, LuMoreHorizontal } from "react-icons/lu"
import { AccountUserAccess, RoleNameV2, User } from "~/models/portal/sdk"
import useTeamModals from "~/routes/account.$accountId.$appId.team/hooks/useTeamModals"
import useCommonStyles from "~/styles/commonStyles"

type TeamMemberActionProps = {
  appId: string
  userRole: RoleNameV2 | null
  user?: User
  teamMember: AccountUserAccess & { accepted: boolean; roleName: RoleNameV2 | null }
}

const TeamMemberAction = ({
  user,
  appId,
  userRole,
  teamMember,
}: TeamMemberActionProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const { openRemoveUserModal, openLeaveTeamModal } = useTeamModals({ appId: appId })

  const MemberRoleAction = () => {
    return teamMember.userID === user?.portalUserID ? (
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
            onClick={() => openLeaveTeamModal(teamMember.email, teamMember.userID)}
          >
            <Text>Leave</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ) : null
  }

  return (
    <Flex justify="flex-end">
      {userRole !== RoleNameV2.Member ? (
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
            {teamMember.userID === user?.portalUserID ? (
              <Menu.Item
                icon={<LuMinusCircle size={18} />}
                onClick={() => openLeaveTeamModal(teamMember.email, teamMember.userID)}
              >
                <Text>Leave</Text>
              </Menu.Item>
            ) : (
              <Menu.Item
                icon={<LuMinusCircle size={18} />}
                onClick={() => openRemoveUserModal(teamMember.email, teamMember.userID)}
              >
                <Text>Remove</Text>
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      ) : (
        <MemberRoleAction />
      )}
    </Flex>
  )
}

export default TeamMemberAction
