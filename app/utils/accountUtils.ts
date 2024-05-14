import { Account, AccountUser, PortalApp } from "~/models/portal/sdk"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"

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

export const getAppNameWithEmoji = (app: PortalApp) =>
  `${String.fromCodePoint(
    parseInt(app?.appEmoji ? app.appEmoji : DEFAULT_APPMOJI, 16),
  )} \u00A0 ${app?.name}`
