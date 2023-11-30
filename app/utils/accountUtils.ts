import { AccountUser } from "~/models/portal/sdk"

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
