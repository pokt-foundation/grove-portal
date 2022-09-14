import { ActionFunction, LoaderFunction, json } from "@remix-run/node"
import { FeatureFlags, defaultFeatureFlags } from "~/context/FeatureFlagContext"
import { featureFlagsCookie } from "~/utils/cookies.server"
import { requirePoktAdmin } from "~/utils/session.server"

export interface FeatureFlagsLoaderActionData {
  POKT_FEATURE_FLAGS: FeatureFlags
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await featureFlagsCookie.parse(cookieHeader)) || defaultFeatureFlags

  const data = {
    POKT_FEATURE_FLAGS: cookie,
  }

  return json<FeatureFlagsLoaderActionData>(data)
}

export const action: ActionFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie")
  const bodyParams = await request.formData()
  const cookie: FeatureFlags =
    (await featureFlagsCookie.parse(cookieHeader)) || defaultFeatureFlags

  await requirePoktAdmin(request)

  if (bodyParams.has("MULTI_LANGUAGE")) {
    cookie.MULTI_LANGUAGE = bodyParams.get("MULTI_LANGUAGE") as string
  }
  if (bodyParams.has("STRIPE_PAYMENT")) {
    cookie.STRIPE_PAYMENT = bodyParams.get("STRIPE_PAYMENT") as string
  }
  if (bodyParams.has("ENTERPRISE")) {
    cookie.ENTERPRISE = bodyParams.get("ENTERPRISE") as string
  }

  const data = {
    POKT_FEATURE_FLAGS: cookie,
  }

  return json<FeatureFlagsLoaderActionData>(data, {
    headers: {
      "Set-Cookie": await featureFlagsCookie.serialize(cookie),
    },
  })
}
