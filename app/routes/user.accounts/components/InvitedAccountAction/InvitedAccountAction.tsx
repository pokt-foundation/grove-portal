import { ActionIcon, Button, Group, Menu, Text } from "@pokt-foundation/pocket-blocks"
import { Form, Link, useNavigation } from "@remix-run/react"
import React from "react"
import { LuArrowUpRight, LuMinusCircle, LuMoreHorizontal, LuPencil } from "react-icons/lu"
import { RoleName, User } from "~/models/portal/sdk"
import useTeamModals from "~/routes/account.$accountId.settings.members/hooks/useTeamModals"
import { TableUserAccount } from "~/routes/user.accounts/components/AccountsTable"
import useCommonStyles from "~/styles/commonStyles"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type InvitedAccountActionProps = {
  account: TableUserAccount
  user: User
}

const InvitedAccountAction = ({ account, user }: InvitedAccountActionProps) => {
  const { classes: commonClasses } = useCommonStyles()
  const navigation = useNavigation()
  const { accepted, role } = account

  const { openLeaveTeamModal } = useTeamModals({ account })

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
              <Link to={`/account/${account.id}`}>
                <Text tt="capitalize">Go to account</Text>
              </Link>
            </Menu.Item>
            {role === RoleName.Owner ? (
              <Menu.Item icon={<LuPencil size={18} />}>
                <Link to={`/account/${account.id}/update?redirectTo=/user/accounts`}>
                  <Text tt="capitalize">Change name</Text>
                </Link>
              </Menu.Item>
            ) : (
              <Menu.Item
                icon={<LuMinusCircle size={18} />}
                onClick={() => openLeaveTeamModal(user.email, user.portalUserID)}
              >
                <Text>Leave</Text>
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Form method="post">
          <input hidden name="accountId" value={account.id} />
          <Group position="right">
            <Button
              className={commonClasses.grayOutlinedButton}
              color="gray"
              disabled={navigation.state === "loading"}
              name="invite_response"
              type="submit"
              value="decline"
              variant="outline"
              onClick={() => {
                trackEvent({
                  category: AnalyticCategories.user,
                  action: AnalyticActions.user_invites_decline,
                  label: account.id,
                })
              }}
            >
              Decline
            </Button>
            <Button
              disabled={navigation.state === "loading"}
              name="invite_response"
              type="submit"
              value="accept"
              onClick={() => {
                trackEvent({
                  category: AnalyticCategories.user,
                  action: AnalyticActions.user_invites_accept,
                  label: account.id,
                })
              }}
            >
              Accept
            </Button>
          </Group>
        </Form>
      )}
    </Group>
  )
}

export default InvitedAccountAction
