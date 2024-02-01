import { Container, Stack, Button } from "@mantine/core"
import { json, LoaderFunction } from "@remix-run/node"
import { NavLink, Outlet, useLoaderData } from "@remix-run/react"
import { LuArrowLeft } from "react-icons/lu"
import ErrorView from "~/components/ErrorView"
import LinkTabs from "~/components/LinkTabs"
import RootAppShell from "~/components/RootAppShell/RootAppShell"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, SortOrder, User } from "~/models/portal/sdk"
import { DataStruct } from "~/types/global"
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
    if (!accounts.getUserAccounts) {
      throw new Error(`Accounts not found for user ${user.user.portalUserID}`)
    }

    const userPendingAccounts = await portal.getUserAccounts({
      accepted: false,
      sortOrder: SortOrder.Asc,
    })
    return json<DataStruct<UserAccountLoaderData>>({
      data: {
        accounts: accounts.getUserAccounts as Account[],
        pendingAccounts: userPendingAccounts.getUserAccounts as Account[],
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

  const { accounts, user } = data

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
    <RootAppShell accounts={accounts as Account[]} user={user}>
      <Container fluid px={0}>
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
          <LinkTabs routes={routes} />
        </Stack>
        <Outlet context={{ data, error, message }} />
      </Container>
    </RootAppShell>
  )
}
