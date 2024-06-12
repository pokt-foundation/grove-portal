import { json, LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import { ErrorBoundaryView } from "~/components/ErrorBoundaryView"
import RootAppShell from "~/components/RootAppShell/RootAppShell"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, Blockchain, RoleName, SortOrder, User } from "~/models/portal/sdk"
import { getUserAccountRole } from "~/utils/accountUtils"
import { getErrorMessage } from "~/utils/catchError"
import { redirectToUserAccount, requireUser } from "~/utils/user.server"

export type AccountIdLoaderData = {
  account: Account
  accounts: Account[]
  blockchains: Blockchain[]
  user: User
  userRole: RoleName
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)

  const portal = initPortalClient({ token: user.accessToken })
  const { accountId } = params
  invariant(accountId, "AccountId must be set")
  let userAccounts

  try {
    const account = await portal.getUserAccount({ accountID: accountId, accepted: true })
    userAccounts = await portal.getUserAccounts({ accepted: true })

    const userRole = getUserAccountRole(
      account.getUserAccount.users,
      user.user.portalUserID,
    ) as RoleName

    const getBlockchainsResponse = await portal.blockchains({ sortOrder: SortOrder.Asc })
    const blockchains = (getBlockchainsResponse.blockchains as Blockchain[]).filter(
      (chain) => chain.id !== "BE2A",
    )

    return json<AccountIdLoaderData>({
      account: account.getUserAccount as Account,
      accounts: userAccounts.getUserAccounts as Account[],
      user: user.user,
      blockchains,
      userRole,
    })
  } catch (error) {
    /**
     * Handle when an invalid account is manually entered & when the user leaves the account
     */

    let ownerAccount = userAccounts?.getUserAccounts?.find(
      (account) =>
        account?.users?.find((u) => u.id === user.user.portalUserID)?.roleName ===
        RoleName.Owner,
    )

    if (accountId !== ownerAccount?.id) {
      return redirectToUserAccount(user)
    } else {
      throw new Response(getErrorMessage(error), {
        status: 500,
      })
    }
  }
}

export default function AccountId() {
  const { account, accounts, blockchains, user, userRole } =
    useLoaderData<AccountIdLoaderData>()

  return (
    <RootAppShell account={account} accounts={accounts} user={user} userRole={userRole}>
      <Outlet context={{ account, accounts, blockchains, user, userRole }} />
    </RootAppShell>
  )
}

export function ErrorBoundary() {
  return <ErrorBoundaryView />
}
