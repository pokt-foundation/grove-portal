import { ActionIcon, Flex, Menu, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { LuMinusCircle, LuMoreHorizontal, LuSend } from "react-icons/lu"
import { AccountUserAccess, RoleNameV2, User } from "~/models/portal/sdk"
import useTeamModals from "~/routes/account.$accountId.$appId.team/hooks/useTeamModals"
import useCommonStyles from "~/styles/commonStyles"

type TeamMemberActionProps = {
  appId: string
  userRole: RoleNameV2 | null
  user?: User
  teamMember: AccountUserAccess & { accepted: boolean; roleName: RoleNameV2 | null }
  status: Boolean
}

const TeamMemberAction = ({
  user,
  appId,
  userRole,
  teamMember,
  status,
}: TeamMemberActionProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const { openRemoveUserModal, openLeaveTeamModal, openResendEmailModal } = useTeamModals(
    { appId: appId },
  )

  const MemberRoleAction = () => {
    return teamMember.userID === user?.portalUserID ? (
      // MEMEBER --CAN-- TAKE ACTION ON THEMSELVES
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
    ) : // MEMEBER --CANNOT-- TAKE ACTION ON OTHER USERS
    null
  }

  const AdminRoleAction = () => {
    return (
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
            // ADMIN --CAN-- TAKE ACTION ON THEMSELVES
            <Menu.Item
              icon={<LuMinusCircle size={18} />}
              onClick={() => openLeaveTeamModal(teamMember.email, teamMember.userID)}
            >
              <Text>Leave</Text>
            </Menu.Item>
          ) : (
            // ADMIN --CAN-- TAKE ACTION ON OTHER USERS
            <>
              <Menu.Item
                icon={<LuMinusCircle size={18} />}
                onClick={() => openRemoveUserModal(teamMember.email, teamMember.userID)}
              >
                <Text>Remove</Text>
              </Menu.Item>
              {!status && (
                <Menu.Item
                  icon={<LuSend size={18} />}
                  onClick={() => openResendEmailModal(teamMember.email)}
                >
                  <Text>Resend Email</Text>
                </Menu.Item>
              )}
            </>
          )}
        </Menu.Dropdown>
      </Menu>
    )
  }

  const OwnerRoleAction = () => {
    return teamMember.userID === user?.portalUserID ? null : ( // OWNER --CANNOT-- LEAVE THEIR OWN APP
      // OWNER --CAN-- TAKE ACTION ON OTHER USERS
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
            onClick={() => openRemoveUserModal(teamMember.email, teamMember.userID)}
          >
            <Text>Remove</Text>
          </Menu.Item>
          {!status && (
            <Menu.Item
              icon={<LuSend size={18} />}
              onClick={() => openResendEmailModal(teamMember.email)}
            >
              <Text>Resend Email</Text>
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    )
  }

  return (
    <Flex justify="flex-end">
      {userRole === RoleNameV2.Member && <MemberRoleAction />}
      {userRole === RoleNameV2.Admin && <AdminRoleAction />}
      {userRole === RoleNameV2.Owner && <OwnerRoleAction />}
    </Flex>
  )
}

export default TeamMemberAction
