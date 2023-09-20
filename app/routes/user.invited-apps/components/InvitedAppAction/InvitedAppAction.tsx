import { Menu, Text, ActionIcon, Button, Group } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { LuMinusCircle, LuMoreHorizontal } from "react-icons/lu"
import useModals from "~/hooks/useModals"
import { PortalApp, User } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"
import { getAppAcceptedValue } from "~/utils/applicationUtils"

type InvitedAppActionProps = { app: PortalApp; user: User }

const InvitedAppAction = ({ app, user }: InvitedAppActionProps) => {
  const { classes: commonClasses } = useCommonStyles()
  // const fetcher = useFetcher()
  const { openConfirmationModal } = useModals()
  const { name } = app
  const accepted = getAppAcceptedValue(app, user.portalUserID)

  const leaveApp = (email: string) => {
    // fetcher.submit(
    //     {
    //       props here...
    //     },
    //     {
    //       method: "POST",
    //     },
    // )

    console.log("leaving app...", email)
  }

  const openLeaveAppModal = () =>
    openConfirmationModal({
      title: <Text fw={600}>Leave App</Text>,
      children: <Text>Are you sure you want to leave {name}?</Text>,
      labels: { cancel: "Cancel", confirm: "Leave" },
      confirmProps: { color: "red" },
      onConfirm: () => leaveApp(name),
    })

  return (
    <Group grow={!accepted} position="right" spacing="md">
      {accepted ? (
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
              onClick={() => openLeaveAppModal()}
            >
              <Text>Leave</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <>
          <Button
            className={commonClasses.grayOutlinedButton}
            color="gray"
            variant="outline"
          >
            Decline
          </Button>
          <Button color="green">Accept</Button>
        </>
      )}
    </Group>
  )
}

export default InvitedAppAction
