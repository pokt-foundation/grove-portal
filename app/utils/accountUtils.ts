import { Account, AccountUser } from "~/models/portal/sdk"

export const getAccountAcceptedValue = (
  portalAppUsers: AccountUser[],
  userId: string,
) => {
  const user = portalAppUsers.find((user) => user.id === userId)
  return user?.accepted ?? false
}

export const getUserAccountRole = (users: AccountUser[], userId: string) => {
  const user = users.find((user) => user.id === userId)
  return user?.roleName ?? null
}

export const isAccountWithinAppLimit = (account: Account) => {
  const { portalApps, plan } = account

  if (plan.appLimit === 0) {
    return true
  }

  return !portalApps || portalApps.length < account.plan.appLimit
}
