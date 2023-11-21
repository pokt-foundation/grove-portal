import { json, LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import ErrorView from "~/components/ErrorView"
import RootAppShell from "~/components/RootAppShell/RootAppShell"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, RoleName, User } from "~/models/portal/sdk"
import { DataStruct } from "~/types/global"
import { getUserAccountRole } from "~/utils/accountUtils"
import { getErrorMessage } from "~/utils/catchError"
import { redirectToUserAccount, requireUser } from "~/utils/user.server"

export type AccountIdLoaderData = {
  account: Account
  accounts: Account[]
  user: User
  hasPendingInvites: boolean
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

    if (!account.getUserAccount) {
      throw new Error(
        `Account ${params.accountId} not found for user ${user.user.portalUserID}`,
      )
    }

    userAccounts = await portal.getUserAccounts({ accepted: true })
    if (!userAccounts.getUserAccounts) {
      throw new Error(`Accounts not found for user ${user.user.portalUserID}`)
    }

    const userPendingAccounts = await portal.getUserAccounts({ accepted: false })
    const userRole = getUserAccountRole(
      account.getUserAccount.users,
      user.user.portalUserID,
    ) as RoleName

    return json<DataStruct<AccountIdLoaderData>>({
      data: {
        account: account.getUserAccount as Account,
        accounts: userAccounts.getUserAccounts as Account[],
        user: user.user,
        hasPendingInvites: userPendingAccounts.getUserAccounts.length > 0,
        userRole,
      },
      error: false,
    })
  } catch (error) {
    /**
     * Handle when an invalid account is manually entered & the case when the
     * user is part of only one app within an org and he leaves the team
     */

    let ownerAccount = userAccounts?.getUserAccounts?.find(
      (account) =>
        account?.users?.find((u) => u.id === user.user.portalUserID)?.roleName ===
        RoleName.Owner,
    )

    if (accountId !== ownerAccount?.id) {
      return redirectToUserAccount(user)
    } else {
      return json<DataStruct<AccountIdLoaderData>>({
        data: null,
        error: true,
        message: getErrorMessage(error),
      })
    }
  }
}

export default function AccountId() {
  const { data, error, message } = useLoaderData() as DataStruct<AccountIdLoaderData>

  if (error) {
    return <ErrorView message={message} />
  }

  const { account, accounts, user, hasPendingInvites, userRole } = data

  return (
    <RootAppShell
      account={account}
      accounts={accounts}
      hasPendingInvites={hasPendingInvites}
      user={user}
      userRole={userRole}
    >
      <Outlet context={data} />
    </RootAppShell>
  )
}
