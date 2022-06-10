import { ActionFunction, json, LoaderFunction } from "@remix-run/node"
import { featureFlagsCookie } from "~/utils/cookies.server"
import { defaultFeatureFlags, FeatureFlags } from "~/context/FeatureFlagContext"
import { requireAdmin } from "~/utils/session.server"

export interface FeatureFlagsLoaderActionData {
  POKT_FEATURE_FLAGS: FeatureFlags
}
/*
export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  const cookieHeader = request.headers.get("Cookie")
  const bodyParams = await request.formData()
  const cookie: FeatureFlags =
    (await featureFlagsCookie.parse(cookieHeader)) || defaultFeatureFlags

  await requireAdmin(request)

  if (bodyParams.has("MULTI_LANGUAGE")) {
    cookie.MULTI_LANGUAGE = bodyParams.get("MULTI_LANGUAGE") as string
  }

  const res = await fetch(
    `${getRequiredClientEnvVar("BACKEND_URL")}/api/users/feedback`,
    {
      method: "POST",
      headers: {
        Authorization: `${user.extraParams.token_type} ${user.accessToken}`,
      },
      body: formData,
    },
  )

  if (!res || res.status !== 200) {
    throw new Error(res.statusText)
  }

  const data = await res.json()

  return json<FeatureFlagsLoaderActionData>(data, {
    headers: {
      "Set-Cookie": await featureFlagsCookie.serialize(cookie),
    },
  })
  
}
*/
