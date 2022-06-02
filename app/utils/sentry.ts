import { init as initSentry } from "@sentry/react"
import { Integrations } from "@sentry/tracing"
import { getRequiredClientEnvVar } from "./environment"
import { log } from "./log"

export default function initializeSentry(): void {
  try {
    initSentry({
      dsn: getRequiredClientEnvVar("SENTRY_DSN"),
      environment: getRequiredClientEnvVar("NODE_ENV"),
      integrations: [new Integrations.BrowserTracing()],
      release: "pocket-portal@" + getRequiredClientEnvVar("BUILD_ID"),
      tracesSampleRate: 1.0,
    })
    console.log("Sentry Initialized")
  } catch (error) {
    log(error, "error")
  }
}
