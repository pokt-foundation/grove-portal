import { ActionFunction, LoaderFunction, json } from "@remix-run/node"
import { Auth0ExtraParams } from "remix-auth-auth0"
import { Language } from "~/context/TranslateContext"
import { UserPreference, defaultUserPreference } from "~/context/UserContext"
import { User } from "~/models/portal/sdk"
import { userPrefCookie } from "~/utils/cookies.server"
import { requireUser } from "~/utils/user.server"

export type PocketUser = {
  profile: User
  extraParams: Auth0ExtraParams
  accessToken: string
  refreshToken: string
}

export interface UserLoaderActionData {
  profile: User | undefined
  preferences: UserPreference
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await userPrefCookie.parse(cookieHeader)) || defaultUserPreference

  const data = {
    profile: user.user,
    preferences: cookie,
  }

  return json<UserLoaderActionData>(data)
}

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  const bodyParams = await request.formData()
  const cookieHeader = request.headers.get("Cookie")
  const cookie: UserPreference =
    (await userPrefCookie.parse(cookieHeader)) || defaultUserPreference

  if (bodyParams.get("language")) {
    cookie.language = bodyParams.get("language") as Language
  }

  if (bodyParams.get("showExpandedLegacyBanner")) {
    cookie.showExpandedLegacyBanner =
      bodyParams.get("showExpandedLegacyBanner") === "true"
  }

  if (bodyParams.get("endpoints")) {
    cookie.endpoints = {
      ...cookie.endpoints,
      ...(JSON.parse(bodyParams.get("endpoints") as any) as UserPreference["endpoints"]),
    }
  }

  const data = {
    profile: user.user,
    preferences: cookie,
  }

  return json<UserLoaderActionData>(data, {
    headers: {
      "Set-Cookie": await userPrefCookie.serialize(cookie),
    },
  })
}
