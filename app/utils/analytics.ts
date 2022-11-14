import * as amplitude from "@amplitude/analytics-browser"
import { getRequiredClientEnvVar } from "./environment"
import { log } from "./log"

export const AmplitudeEvents = {
  // SignupComplete: "SIGNUP_COMPLETE",
  // LoginComplete: "LOGIN_COMPLETE",
  // RelayMetricUpdate: "RELAY_METRIC_UPDATE",
  AllAppsView: "ALL_APPS_VIEW",
  ProfileView: "PROFILE_VIEW",
  SupportView: "SUPPORT_VIEW",
  EndpointCreation: "ENDPOINT_CREATION",
  EndpointRemoval: "ENDPOINT_REMOVAL",
  StopSubscription: "STOP_SUBSCRIPTION",
  LandingView: "LANDING_VIEW",
  DashboardView: "DASHBOARD_VIEW",
  RequestDetailsView: "REQUEST_DETAILS_VIEW",
  SecurityDetailsView: "SECURITY_DETAILS_VIEW",
  NotificationDetailsView: "NOTIFICATION_DETAILS_VIEW",
  AppDetailsView: "APP_DETAILS_VIEW",
  AppPlanDetailsView: "APP_PLAN_DETAILS_VIEW",
  NotificationSettingsChange: "NOTIFICATION_SETTINGS_CHANGE",
  SecuritySettingsUpdate: "SECURITY_SETTINGS_UPDATE",
  ContactSalesView: "CONTACT_SALES_VIEW",
  NewSubscription: "NEW_SUBSCRIPTION_CREATED",
}

function splitUser(user: { id: string }) {
  return /\|/.test(user.id) ? user.id.split("|")[1] : user.id
}

export default function analyticsInit(user?: { id: string }) {
  const getUser = user !== undefined ? splitUser(user) : undefined
  // kills analytics for non production environments
  // if (process.env.NODE_ENV !== "production") {
  //   amplitude.setOptOut(true)
  // }

  try {
    amplitude.init(getRequiredClientEnvVar("AMPLITUDE_API_KEY"), getUser, {
      includeReferrer: true,
      includeUtm: true,
    })
  } catch (error) {
    log(error, "error")
  }
}

export function trackEvent(str: string, props?: { [key: string]: string }) {
  try {
    amplitude.track(str, props)
  } catch (error) {
    log(error, "error")
  }
}
