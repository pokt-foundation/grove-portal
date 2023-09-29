import { getRequiredClientEnvVar } from "./environment"

export const AnalyticCategories = {
  user: "User Account",
  org: "Organization",
  app: "Application",
}

export const AnalyticActions = {
  root_user_menu: "Open Root User Menu",
  app_create: "Create New Application",
  app_delete: "Delete Application",
  app_update: "Update Application",
  app_endpoints_favorite: "Update Chain Favorites",
  app_subscription_stop: "Stop Subscription",
  app_subscription_new: "New Subscription",
  app_subscription_renew: "Renew Subscription",
  app_notifications: "Update App Notifications",
  app_plan_manage: "Manage Plan In Stripe",
  app_plan_invoice_download: "Download Latest Invoice",
  app_plan_invoice_view: "View Latest Invoice In Stripe",
  app_team_invite: "Invite Memeber To Team",
  app_team_remove: "Remove Memeber From Team",
  app_team_change_role: "Update Memeber Role In Team",
  app_team_resend: "Resend Memeber Invite To Team",
  org_update: "Update Organization",
  user_profile_change_password: "Update User Profile Password",
  user_profile_product_updates: "Update User Profile Product Updates",
  user_profile_marketing_updates: "Update User Profile Marketing Updates",
  user_profile_beta_testing: "Update User Profile Beta Testing",
}

type TrackEventProps = {
  category: string
  action: string
  label?: string
  value?: number
}

export function trackEvent({ category, action, label, value }: TrackEventProps) {
  try {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  } catch (error) {
    console.log(error)
  }
}

export function trackPage(page: string, title?: string) {
  try {
    window.gtag("config", getRequiredClientEnvVar("GOOGLE_ANALYTICS_ID"), {
      page_path: page,
      title: title,
    })
  } catch (error) {
    console.log(error)
  }
}
