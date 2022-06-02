import { ActionFunction, json, LoaderFunction } from "@remix-run/node"
import { Language } from "~/context/TranslateContext"
import { defaultUserPreference, UserPreference } from "~/context/UserPreferenceContext"
import { userPrefCookie } from "~/utils/cookies.server"

export interface UserPreferenceLoaderActionData {
  POKT_USER_PREF: UserPreference
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await userPrefCookie.parse(cookieHeader)) || defaultUserPreference

  const data = {
    POKT_USER_PREF: cookie,
  }

  return json<UserPreferenceLoaderActionData>(data)
}

export const action: ActionFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie")
  const bodyParams = await request.formData()
  const cookie: UserPreference =
    (await userPrefCookie.parse(cookieHeader)) || defaultUserPreference

  if (bodyParams.has("language")) {
    cookie.language = bodyParams.get("language") as Language
  }

  const data = {
    POKT_USER_PREF: cookie,
  }

  return json<UserPreferenceLoaderActionData>(data, {
    headers: {
      "Set-Cookie": await userPrefCookie.serialize(cookie),
    },
  })
}
