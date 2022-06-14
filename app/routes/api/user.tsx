import { ActionFunction, json, LoaderFunction } from "@remix-run/node"
import { Auth0Profile } from "remix-auth-auth0"
import { Language } from "~/context/TranslateContext"
import { defaultUserPreference, UserPreference } from "~/context/UserContext"
import { userPrefCookie } from "~/utils/cookies.server"
import { getUserProfile } from "~/utils/session.server"

export interface UserLoaderActionData {
  profile: Auth0Profile | undefined
  preferences: UserPreference
}

export const loader: LoaderFunction = async ({ request }) => {
  const userProfile = await getUserProfile(request)
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await userPrefCookie.parse(cookieHeader)) || defaultUserPreference

  const data = {
    profile: userProfile,
    preferences: cookie,
  }

  return json<UserLoaderActionData>(data)
}

export const action: ActionFunction = async ({ request }) => {
  const userProfile = await getUserProfile(request)
  const cookieHeader = request.headers.get("Cookie")
  const bodyParams = await request.formData()
  const cookie: UserPreference =
    (await userPrefCookie.parse(cookieHeader)) || defaultUserPreference

  if (bodyParams.has("language")) {
    cookie.language = bodyParams.get("language") as Language
  }

  const data = {
    profile: userProfile,
    preferences: cookie,
  }

  return json<UserLoaderActionData>(data, {
    headers: {
      "Set-Cookie": await userPrefCookie.serialize(cookie),
    },
  })
}
