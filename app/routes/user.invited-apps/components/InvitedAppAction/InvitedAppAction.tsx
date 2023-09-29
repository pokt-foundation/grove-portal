import { Menu, Text, ActionIcon, Button, Group } from "@pokt-foundation/pocket-blocks"
import { Form, Link, useNavigation } from "@remix-run/react"
import React from "react"
import { LuArrowUpRight, LuMinusCircle, LuMoreHorizontal } from "react-icons/lu"
import { PortalApp, User } from "~/models/portal/sdk"
import useTeamModals from "~/routes/org.$accountId.$appId.team/hooks/useTeamModals"
import useCommonStyles from "~/styles/commonStyles"

type InvitedAppActionProps = { app: PortalApp & { accepted: boolean }; user: User }

const InvitedAppAction = ({ app, user }: InvitedAppActionProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const navigation = useNavigation()
  const { accepted } = app

  const { openLeaveTeamModal } = useTeamModals({ app })

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
              <Link to={`/org/${app.accountID}/${app.id}`}>
                <Text tt="capitalize">Go to application</Text>
              </Link>
            </Menu.Item>
            <Menu.Item
              icon={<LuMinusCircle size={18} />}
              onClick={() => openLeaveTeamModal(user.email, user.portalUserID)}
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
