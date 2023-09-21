import { Menu, Text, ActionIcon, Button, Group } from "@pokt-foundation/pocket-blocks"
import { Form, Link, useNavigation } from "@remix-run/react"
import React from "react"
import { LuArrowUpRight, LuMinusCircle, LuMoreHorizontal } from "react-icons/lu"
import useModals from "~/hooks/useModals"
import { PortalApp } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"

type InvitedAppActionProps = { app: PortalApp & { accepted: boolean } }

const InvitedAppAction = ({ app }: InvitedAppActionProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const navigation = useNavigation()
  const { openConfirmationModal } = useModals()
  const { name, accepted } = app

  const leaveApp = () => {
    // fetcher.submit(
    //     {
    //       props here...
    //     },
    //     {
    //       method: "POST",
    //     },
    // )

    console.log("leaving app...", app.name)
  }

  const openLeaveAppModal = () =>
    openConfirmationModal({
      title: <Text fw={600}>Leave App</Text>,
      children: <Text>Are you sure you want to leave {name}?</Text>,
      labels: { cancel: "Cancel", confirm: "Leave" },
      confirmProps: { color: "red" },
      onConfirm: () => leaveApp(),
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
            <Menu.Item icon={<LuArrowUpRight size={18} />}>
              <Link to={`/account/${app.accountID}/${app.id}`}>
                <Text tt="capitalize">Go to application</Text>
              </Link>
            </Menu.Item>
            <Menu.Item
              icon={<LuMinusCircle size={18} />}
              onClick={() => openLeaveAppModal()}
            >
              <Text>Leave</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Form method="post">
          <input hidden name="portalAppId" value={app.id} />
          <Group position="right">
            <Button
              className={commonClasses.grayOutlinedButton}
              color="gray"
              disabled={navigation.state === "loading"}
              name="invite_response"
              type="submit"
              value="decline"
              variant="outline"
            >
              Decline
            </Button>
            <Button
              disabled={navigation.state === "loading"}
              name="invite_response"
              type="submit"
              value="accept"
            >
              Accept
            </Button>
          </Group>
        </Form>
      )}
    </Group>
  )
}

export default InvitedAppAction
