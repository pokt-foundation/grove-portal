import { PortalAppUser } from "~/models/portal/sdk"

export const getAppAcceptedValue = (portalAppUsers: PortalAppUser[], userId: string) => {
  const user = portalAppUsers.find((user) => user.portalAppUserID === userId)
  return user?.accepted ?? false
}

export const getUserRole = (portalAppUsers: PortalAppUser[], userId: string) => {
  const user = portalAppUsers.find((user) => user.portalAppUserID === userId)
  return user?.roleName ?? null
}
