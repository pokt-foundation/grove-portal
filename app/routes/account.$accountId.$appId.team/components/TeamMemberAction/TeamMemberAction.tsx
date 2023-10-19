import { ActionIcon, Flex, Menu, Text } from "@pokt-foundation/pocket-blocks"
import React, { useMemo } from "react"
import { LuMinusCircle, LuMoreHorizontal, LuSend } from "react-icons/lu"
import { PortalApp, PortalAppUser, RoleNameV2, User } from "~/models/portal/sdk"
import useTeamModals from "~/routes/account.$accountId.$appId.team/hooks/useTeamModals"
import useCommonStyles from "~/styles/commonStyles"

type TeamMemberActionProps = {
  app: PortalApp
  userRole: RoleNameV2 | null
  user?: User
  teamMember: PortalAppUser
  status: Boolean
}

const TeamMemberAction = ({
  user,
  app,
  userRole,
  teamMember,
  status,
}: TeamMemberActionProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const { openRemoveUserModal, openLeaveTeamModal, openResendEmailModal } = useTeamModals(
    { app },
  )

  const menuItems = useMemo(() => {
    let items = []

    switch (userRole) {
      case RoleNameV2.Owner:
        if (teamMember.portalAppUserID === user?.portalUserID) {
          // OWNER --CANNOT-- LEAVE THEIR OWN APP
        } else {
          // OWNER --CAN--REMOVE OTHER USERS
          items.push({
            icon: <LuMinusCircle size={18} />,
            onClick: () =>
              openRemoveUserModal(teamMember.email, teamMember.portalAppUserID),
            label: "Remove",
          })
          if (!status) {
            // OWNER --CAN-- RESEND EMAIL TO OTHER USERS
            items.push({
              icon: <LuSend size={18} />,
              onClick: () => openResendEmailModal(teamMember.email),
              label: "Resend Email",
            })
          }
        }
        break
      case RoleNameV2.Admin:
        if (teamMember.portalAppUserID === user?.portalUserID) {
          // ADMIN --CAN--REMOVE THEMSELVES
          items.push({
            icon: <LuMinusCircle size={18} />,
            onClick: () =>
              openRemoveUserModal(teamMember.email, teamMember.portalAppUserID),
            label: "Remove",
          })
        } else {
          // ADMIN --CAN--REMOVE OTHER USERS
          items.push({
            icon: <LuMinusCircle size={18} />,
            onClick: () =>
              openRemoveUserModal(teamMember.email, teamMember.portalAppUserID),
            label: "Remove",
          })
          if (!status) {
            // ADMIN --CAN-- RESEND EMAIL TO OTHER USERS
            items.push({
              icon: <LuSend size={18} />,
              onClick: () => openResendEmailModal(teamMember.email),
              label: "Resend Email",
            })
          }
        }
        break
      case RoleNameV2.Member:
      default:
        if (teamMember.portalAppUserID === user?.portalUserID) {
          // MEMEBER --CAN-- LEAVE APP THEMSELVES
          items.push({
            icon: <LuMinusCircle size={18} />,
            onClick: () =>
              openLeaveTeamModal(teamMember.email, teamMember.portalAppUserID),
            label: "Leave",
          })
        } else {
          // MEMEBER --CANNOT-- TAKE ACTION ON OTHER USERS
        }
        break
    }

    return items
  }, [
    userRole,
    teamMember.portalAppUserID,
    teamMember.email,
    user?.portalUserID,
    status,
    openRemoveUserModal,
    openResendEmailModal,
    openLeaveTeamModal,
  ])

  return (
    <Flex justify="flex-end">
      {menuItems.length > 0 && (
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
            {menuItems.map((item, index) => (
              <Menu.Item key={index} icon={item.icon} onClick={item.onClick}>
                <Text>{item.label}</Text>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      )}
    </Flex>
  )
}

export default TeamMemberAction
