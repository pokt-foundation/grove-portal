import { Stack, Button } from "@mantine/core"
import { json, LoaderFunction } from "@remix-run/node"
import { NavLink, Outlet, useLoaderData } from "@remix-run/react"
import { ArrowLeft } from "lucide-react"
import React from "react"
import ErrorBoundaryView from "~/components/ErrorBoundaryView"
import LinkTabs from "~/components/LinkTabs"
import RootAppShell from "~/components/RootAppShell/RootAppShell"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, SortOrder, User } from "~/models/portal/sdk"
import { getErrorMessage } from "~/utils/catchError"
import { requireUser } from "~/utils/user.server"

export type UserAccountLoaderData = {
  accounts: Account[]
  pendingAccounts: Account[]
  user: User
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  try {
    const accounts = await portal.getUserAccounts({
      accepted: true,
      sortOrder: SortOrder.Asc,
    })

    const userPendingAccounts = await portal.getUserAccounts({
      accepted: false,
      sortOrder: SortOrder.Asc,
    })

    return json<UserAccountLoaderData>({
      accounts: accounts.getUserAccounts as Account[],
      pendingAccounts: userPendingAccounts.getUserAccounts as Account[],
      user: user.user,
    })
  } catch (error) {
    throw new Response(getErrorMessage(error), {
      status: 500,
    })
  }
}

export default function UserAccount() {
  const { accounts, user, pendingAccounts } = useLoaderData() as UserAccountLoaderData

  const routes = [
    {
      to: "",
      label: "Profile",
      end: true,
    },
    {
      to: "accounts",
      label: "Accounts",
    },
  ]

  return (
    <RootAppShell accounts={accounts} user={user}>
      <Button
        color="gray"
        component={NavLink}
        leftSection={<ArrowLeft size={18} />}
        mb="xl"
        ml={-15}
        size="compact-sm"
        to="/account"
        variant="subtle"
      >
        Back
      </Button>
      <Stack gap="xl">
        <LinkTabs routes={routes} />
      </Stack>
      <Outlet context={{ accounts, user, pendingAccounts }} />
    </RootAppShell>
  )
}

export function ErrorBoundary() {
  return <ErrorBoundaryView />
}
