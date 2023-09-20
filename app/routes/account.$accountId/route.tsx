import { json, LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import invariant from "tiny-invariant"
import ErrorView from "~/components/ErrorView"
import RootAppShell from "~/components/RootAppShell/RootAppShell"
import { initPortalClient } from "~/models/portal/portal.server"
import {
  Account,
  GetUserAccountQuery,
  GetUserAccountsQuery,
  PortalApp,
  PortalAppRole,
  User,
} from "~/models/portal/sdk"
import { getErrorMessage } from "~/utils/catchError"
import { LoaderDataStruct } from "~/utils/loader"
import { requireUser } from "~/utils/user.server"

export type AccountIdLoaderData = {
  account: GetUserAccountQuery["getUserAccount"]
  accounts: GetUserAccountsQuery["getUserAccounts"]
  user: User
  hasPendingInvites: boolean
  userRoles: PortalAppRole[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const { accountId } = params
  invariant(accountId, "AccountId must be set")

  try {
    const account = await portal.getUserAccount({ accountID: accountId })

    if (!account.getUserAccount) {
      throw new Error(
        `Account ${params.accountId} not found for user ${user.user.portalUserID}`,
      )
    }

    const accounts = await portal.getUserAccounts()
    if (!accounts.getUserAccounts) {
      throw new Error(`Accounts not found for user ${user.user.portalUserID}`)
    }

    const userPendingApps = await portal.getUserPortalApps({ accepted: false })

    return json<LoaderDataStruct<AccountIdLoaderData>>({
      data: {
        account: account.getUserAccount,
        accounts: accounts.getUserAccounts,
        user: user.user,
        hasPendingInvites: userPendingApps.getUserPortalApps.length > 0,
        userRoles: account.getUserAccount.users.filter(
          (u) => u.userID === user.user.portalUserID,
        )[0].portalAppRoles,
      },
      error: false,
    })
  } catch (error) {
    return json<LoaderDataStruct<AccountIdLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function AccountId() {
  const { data, error, message } =
    useLoaderData() as LoaderDataStruct<AccountIdLoaderData>

  if (error) {
    return <ErrorView message={message} />
  }

  const { account, accounts, user, userRoles, hasPendingInvites } = data

  return (
    <RootAppShell
      accounts={accounts as Account[]}
      apps={account.portalApps?.filter((app) => !app?.deleted) as PortalApp[]}
      hasPendingInvites={hasPendingInvites}
      user={user}
    >
      <Outlet context={{ account, accounts, user, userRoles }} />
    </RootAppShell>
  )
}
