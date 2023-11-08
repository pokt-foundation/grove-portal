import { getRequiredClientEnvVar } from "./environment"

export const AnalyticCategories = {
  user: "User Account",
  account: "Account",
  app: "Application",
}

export const AnalyticActions = {
  app_create: "app_create",
  app_delete: "app_delete",
  app_update: "app_update",
  app_copy_id: "app_copy_id",
  app_chain_favorite: "app_chain_favorite",
  app_chain_docs: "app_chain_docs",
  app_keys_app_id: "app_keys_app_id",
  app_keys_secret: "app_keys_secret",
  account_subscription_stop: "account_subscription_stop",
  app_subscription_new: "app_subscription_new",
  account_subscription_renew: "account_subscription_renew",
  account_notifications: "account_notifications",
  account_plan_upgrade: "account_plan_upgrade",
  account_plan_enterprise: "account_plan_enterprise",
  app_plan_manage: "app_plan_manage",
  app_plan_invoice_download: "app_plan_invoice_download",
  app_plan_invoice_view: "app_plan_invoice_view",
  app_settings_update: "app_settings_update",
  account_team_invite: "account_team_invite",
  account_team_remove: "account_team_remove",
  account_team_change_role: "account_team_change_role",
  account_team_resend: "account_team_resend",
  user_header_menu: "user_header_menu",
  account_update: "Update Account",
  account_copy_id: "account_copy_id",
  account_update_change_name: "account_update_change_name",
  user_profile_change_password: "user_profile_change_password",
  user_profile_product_updates: "user_profile_product_updates",
  user_profile_marketing_updates: "user_profile_marketing_updates",
  user_profile_beta_testing: "user_profile_beta_testing",
  user_invites_accept: "user_invites_accept",
  user_invites_decline: "user_invites_decline",
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
