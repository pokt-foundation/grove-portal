import { Divider } from "@mantine/core"
import { Container, Stack, Text } from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import ErrorView from "~/components/ErrorView"
import LinkTabs from "~/components/LinkTabs"
import RootAppShell from "~/components/RootAppShell/RootAppShell"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, PortalApp } from "~/models/portal/sdk"
import { getErrorMessage } from "~/utils/catchError"
import { LoaderDataStruct } from "~/utils/loader"
import { requireUser } from "~/utils/user.server"

export type UserAccountLoaderData = {
  accounts: Account[]
  userApps: PortalApp[]
  user: Auth0Profile
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  try {
    const accounts = await portal.getUserAccounts()
    if (!accounts.getUserAccounts) {
      throw new Error(`Accounts not found for user ${user.portalUserId}`)
    }

    const userApps = await portal.getUserPortalApps()
    if (!userApps.getUserPortalApps) {
      throw new Error(`Apps not found for user ${user.portalUserId}`)
    }

    return json<LoaderDataStruct<UserAccountLoaderData>>({
      data: {
        accounts: accounts.getUserAccounts as Account[],
        userApps: userApps.getUserPortalApps as PortalApp[],
        user: user.profile,
      },
      error: false,
    })
  } catch (error) {
    return json<LoaderDataStruct<UserAccountLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function UserAccount() {
  const { data, error, message } =
    useLoaderData() as LoaderDataStruct<UserAccountLoaderData>

  if (error) {
    return <ErrorView message={message} />
  }

  const { accounts, user } = data

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
    <RootAppShell accounts={accounts as Account[]} user={user}>
      <Container fluid pt={16} px={0}>
        <Stack spacing="xl">
          <Text fw={600} fz="md">
            User Account
          </Text>
          <Divider />
          <LinkTabs routes={routes} />
          <Divider />
        </Stack>
        <Outlet context={{ accounts, user }} />
      </Container>
    </RootAppShell>
  )
}
