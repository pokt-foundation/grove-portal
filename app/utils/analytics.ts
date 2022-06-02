import { init } from "@amplitude/analytics-browser"
import { getRequiredClientEnvVar } from "./environment"
import { log } from "./log"

export const AmplitudeEvents = {
  SignupComplete: "SIGNUP_COMPLETE",
  LoginComplete: "LOGIN_COMPLETE",
  RelayMetricUpdate: "RELAY_METRIC_UPDATE",
  EndpointCreation: "ENDPOINT_CREATION",
  EndpointRemoval: "ENDPOINT_REMOVAL",
  RequestDetailsView: "REQUEST_DETAILS_VIEW",
  NotificationSettingsChange: "NOTIFICATION_SETTINGS_CHANGE",
  SecuritySettingsUpdate: "SECURITY_SETTINGS_UPDATE",
}

export default function initializeAnalytics() {
  try {
    init(getRequiredClientEnvVar("AMPLITUDE_API_KEY"), undefined, {
      includeReferrer: true,
      includeUtm: true,
    })
  } catch (error) {
    log(error, "error")
  }
}
