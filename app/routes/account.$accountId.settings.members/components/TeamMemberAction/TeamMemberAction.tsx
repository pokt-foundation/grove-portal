import { ActionIcon, Flex, Menu, Text } from "@pokt-foundation/pocket-blocks"
import React, { useMemo } from "react"
import { LuMinusCircle, LuMoreHorizontal, LuSend } from "react-icons/lu"
import { Account, RoleName, User, AccountUser } from "~/models/portal/sdk"
import useTeamModals from "~/routes/account.$accountId.settings.members/hooks/useTeamModals"
import useCommonStyles from "~/styles/commonStyles"

type TeamMemberActionProps = {
  account: Account
  userRole: RoleName | null
  user?: User
  teamMember: AccountUser
  status: Boolean
}

const TeamMemberAction = ({
  user,
  account,
  userRole,
  teamMember,
  status,
}: TeamMemberActionProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const { openRemoveUserModal, openLeaveTeamModal, openResendEmailModal } = useTeamModals(
    { account },
  )

  const menuItems = useMemo(() => {
    let items = []
    const { id, email, roleName } = teamMember

    switch (userRole) {
      case RoleName.Owner:
        if (teamMember.id === user?.portalUserID) {
          // OWNER --CANNOT-- LEAVE THEIR OWN ACCOUNT
        } else {
          // OWNER --CAN--REMOVE OTHER USERS
          items.push({
            icon: <LuMinusCircle size={18} />,
            onClick: () => openRemoveUserModal({ email, id }),
            label: "Remove",
          })
          if (!status) {
            // OWNER --CAN-- RESEND EMAIL TO OTHER USERS
            items.push({
              icon: <LuSend size={18} />,
              onClick: () => openResendEmailModal({ email, id, roleName }),
              label: "Resend Email",
            })
          }
        }
        break
      case RoleName.Admin:
        if (teamMember.id === user?.portalUserID) {
          // ADMIN --CAN--REMOVE THEMSELVES
          items.push({
            icon: <LuMinusCircle size={18} />,
            onClick: () => openLeaveTeamModal({ email, id }),
            label: "Leave",
          })
        } else {
          // ADMIN --CAN--REMOVE OTHER USERS
          items.push({
            icon: <LuMinusCircle size={18} />,
            onClick: () => openRemoveUserModal({ email, id }),
            label: "Remove",
          })
          if (!status) {
            // ADMIN --CAN-- RESEND EMAIL TO OTHER USERS
            items.push({
              icon: <LuSend size={18} />,
              onClick: () => openResendEmailModal({ email, id, roleName }),
              label: "Resend Email",
            })
          }
        }
        break
      case RoleName.Member:
      default:
        if (teamMember.id === user?.portalUserID) {
          // MEMEBER --CAN-- LEAVE ACCOUNT THEMSELVES
          items.push({
            icon: <LuMinusCircle size={18} />,
            onClick: () => openLeaveTeamModal({ email, id }),
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
    teamMember.id,
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
              className={commonClasses.grayOutline}
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
