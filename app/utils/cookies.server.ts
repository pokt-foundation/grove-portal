import { createCookie } from "@remix-run/node"
import { getRequiredServerEnvVar } from "./environment"

export const userPrefCookie = createCookie("POKT_USER_PREF", {
  maxAge: 604_800, // one week,
  secrets: [getRequiredServerEnvVar("SESSION_SECRET")],
})

export const featureFlagsCookie = createCookie("POKT_FEATURE_FLAGS", {
  maxAge: 604_800, // one week
  secrets: [getRequiredServerEnvVar("SESSION_SECRET")],
})
