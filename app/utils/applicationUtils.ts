import { PortalApp } from "~/models/portal/sdk"

export const getAppAcceptedValue = (app: PortalApp, userId: string) => {
  const user = app.users.find((user) => user.userID === userId)

  if (user) {
    const acceptedEntry = user.portalAppsAccepted.find(
      (entry) => entry.portalAppID === app.id,
    )

    return acceptedEntry ? acceptedEntry.accepted : false
  }

  return false
}

export const getUserRole = (app: PortalApp, userId: string) => {
  const user = app.users.find((user) => user.userID === userId)

  if (user) {
    const role = user.portalAppRoles.find((role) => role.portalAppID === app.id)

    if (role) {
      return role.roleName
    }
  }

  return null
}
