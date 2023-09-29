import { Divider } from "@mantine/core"
import { Container, Stack, Text, Button } from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction } from "@remix-run/node"
import { NavLink, Outlet, useLoaderData } from "@remix-run/react"
import { LuArrowLeft } from "react-icons/lu"
import ErrorView from "~/components/ErrorView"
import LinkTabs from "~/components/LinkTabs"
import RootAppShell from "~/components/RootAppShell/RootAppShell"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, User } from "~/models/portal/sdk"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { requireUser } from "~/utils/user.server"

export type UserAccountLoaderData = {
  accounts: Account[]
  hasPendingInvites: boolean
  user: User
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  try {
    const accounts = await portal.getUserAccounts({ accepted: true })
    if (!accounts.getUserAccounts) {
      throw new Error(`Accounts not found for user ${user.user.portalUserID}`)
    }

    const userPendingApps = await portal.getUserPortalApps({ accepted: false })

    return json<DataStruct<UserAccountLoaderData>>({
      data: {
        accounts: accounts.getUserAccounts as Account[],
        hasPendingInvites: userPendingApps.getUserPortalApps.length > 0,
        user: user.user,
      },
      error: false,
    })
  } catch (error) {
    return json<DataStruct<UserAccountLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function UserAccount() {
  const { data, error, message } = useLoaderData() as DataStruct<UserAccountLoaderData>

  if (error) {
    return <ErrorView message={message} />
  }

  const { accounts, user, hasPendingInvites } = data

  const routes = [
    {
      to: "profile",
      label: "Profile",
    },
    {
      to: "organizations",
      label: "Organizations",
    },
    {
      to: "invited-apps",
      label: "Invited Apps",
    },
  ]

  return (
    <RootAppShell
      accounts={accounts as Account[]}
      hasPendingInvites={hasPendingInvites}
      user={user}
    >
      <Container fluid pt={16} px={0}>
        <Button
          compact
          color="gray"
          component={NavLink}
          leftIcon={<LuArrowLeft size={18} />}
          mb="xl"
          ml={-15}
          to="/account"
          variant="subtle"
        >
          Back
        </Button>
        <Stack spacing="xl">
          <Text fw={600} fz="md">
            User Account
          </Text>
          <Divider />
          <LinkTabs routes={routes} />
          <Divider />
        </Stack>
        <Outlet context={{ data, error, message }} />
      </Container>
    </RootAppShell>
  )
}
