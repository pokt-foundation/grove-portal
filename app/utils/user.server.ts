import { redirect } from "@remix-run/node"
import jwt_decode from "jwt-decode"
import { Auth0Profile } from "remix-auth-auth0"
import { authenticator } from "./auth.server"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanTypeV2, User } from "~/models/portal/sdk"

export enum Permissions {
  PayPlanTypes = "write:pay_plan_types",
  AppsUnlimited = "create:apps_unlimited",
}

export const requireUser = async (request: Request, defaultRedirect = "/") => {
  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    throw redirect("/api/auth/auth0")
  }

  if (!user.user) {
    throw await authenticator.logout(request, { redirectTo: "/api/auth/auth0" })
  }
  // todo: handle validate like the create overlay at account level
  //
  // if (!user.profile._json.email_verified) {
  //   throw await authenticator.logout(request, { redirectTo: "/validate" })
  // }

  const decode = jwt_decode<{
    exp: number
  }>(user.accessToken)

  if (Date.now() >= decode.exp * 1000) {
    throw await authenticator.logout(request, { redirectTo: "/api/auth/auth0" })
  }

  return user
}

export const requireUserProfile = async (
  request: Request,
  defaultRedirect = "/",
): Promise<User> => {
  const user = await requireUser(request, defaultRedirect)
  return user.user
}

export const requireAdmin = async (
  request: Request,
  defaultRedirect = "/",
): Promise<User> => {
  let user = await authenticator.isAuthenticated(request)

  if (!user) {
    throw redirect(defaultRedirect)
  }

  const permissions = getUserPermissions(user.accessToken)

  if (!isAdmin(permissions)) {
    throw redirect(defaultRedirect)
  }
  return user.user
}

export const isAdmin = (permissions: string[]) => {
  let isAdmin = false
  const adminPermissions = [Permissions.PayPlanTypes]

  adminPermissions.forEach((adminPermission) => {
    isAdmin = permissions.includes(adminPermission)
  })

  return isAdmin
}

export const getUserPermissions = (accessToken: string) => {
  const decode = jwt_decode<{
    exp: number
    permissions: string[]
  }>(accessToken)

  return decode.permissions
}

export const getUserId = async (request: Request) => {
  const user = await authenticator.isAuthenticated(request)
  if (!user || !user.user.auth0ID) return undefined
  return getPoktId(user.user.auth0ID)
}

export const getPoktId = (id: string) => {
  return id.split("|")[1]
}

export const getUserProfile = async (request: Request) => {
  const user = await authenticator.isAuthenticated(request)
  return user?.user
}

export const redirectToUserAccount = async (token: string) => {
  const portal = initPortalClient({ token: token })
  const accounts = await portal.getUserAccounts()
  let account: { id: string | null; planType: PayPlanTypeV2 | null } = {
    id: null,
    planType: null,
  }

  accounts.getUserAccounts.forEach((acc) => {
    if (acc) {
      if (acc.planType === PayPlanTypeV2.FreetierV0) {
        account = {
          id: acc.id,
          planType: acc.planType,
        }
      }
      if (acc.planType === PayPlanTypeV2.PayAsYouGoV0) {
        account = {
          id: acc.id,
          planType: acc.planType,
        }
      }
      if (acc.planType === PayPlanTypeV2.Enterprise) {
        account = {
          id: acc.id,
          planType: acc.planType,
        }
      }

      if (account.id === null) {
        account = {
          id: acc.id,
          planType: acc.planType,
        }
      }
    }
  })

  return redirect(`/account/${account.id}`)
}
