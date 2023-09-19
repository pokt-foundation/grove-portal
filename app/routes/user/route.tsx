import { Divider } from "@mantine/core"
import { Stack, Text } from "@pokt-foundation/pocket-blocks"
import { json, LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import AppOverviewTabs from "./components/AppOverviewTabs"
import ErrorView from "~/components/ErrorView"
import RootAppShell from "~/components/RootAppShell/RootAppShell"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account } from "~/models/portal/sdk"
import { getErrorMessage } from "~/utils/catchError"
import { LoaderDataStruct } from "~/utils/loader"
import { requireUser } from "~/utils/user.server"

export type UserAccountLoaderData = {
  accounts: Account[]
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

    return json<LoaderDataStruct<UserAccountLoaderData>>({
      data: {
        accounts: accounts.getUserAccounts as Account[],
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
      to: "organizations",
      label: "Organizations",
    },
    {
      to: "profile",
      label: "Profile",
    },
  ]

  return (
    <RootAppShell accounts={accounts as Account[]} user={user}>
      <Stack spacing="xl">
        <Text fw={600} fz="md">
          User Account
        </Text>
        <Divider />
        <AppOverviewTabs routes={routes} />
        <Divider />
      </Stack>
      <Outlet context={{ accounts, user }} />
    </RootAppShell>
  )
}
