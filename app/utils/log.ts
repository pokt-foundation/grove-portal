// import { captureMessage } from "@sentry/react"
// import type { Severity, SeverityLevel } from "@sentry/types"
import { getErrorMessage } from "./catchError"
import { getRequiredClientEnvVar } from "./environment"

const getLogType = (level: string): Function => {
  let type = () => {}
  switch (level) {
    case "fatal":
    case "error":
    case "critical":
      type = console.error
      break
    case "warning":
      type = console.warn
      break
    case "info":
      type = console.info
      break
    case "log":
    default:
      type = console.log
      break
  }
  return type
}

export function log(error: unknown, level = "log"): void {
  const message = getErrorMessage(error)
  if (getRequiredClientEnvVar("NODE_ENV") !== "production") {
    const logType = getLogType(level)
    logType(message)
  }
  if (getRequiredClientEnvVar("NODE_ENV") === "production") {
    console.log(message, level)
  }
}
