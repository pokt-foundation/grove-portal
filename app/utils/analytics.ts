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
  app_settings_update: "app_settings_update",
  app_chain_sandbox_try: "app_chain_sandbox_try",
  app_chain_sandbox_change_chain: "app_chain_sandbox_change_chain",
  app_chain_sandbox_select_method: "app_chain_sandbox_select_method",
  app_chain_sandbox_edit_body: "app_chain_sandbox_edit_body",
  app_chain_sandbox_send_request: "app_chain_sandbox_send_request",
  account_billing_invoice_download: "account_billing_invoice_download",
  account_billing_invoice_pay: "account_billing_invoice_pay",
  account_billing_invoice_view: "account_billing_invoice_view",
  account_billing_receipt_view: "account_billing_receipt_view",
  account_subscription_stop: "account_subscription_stop",
  account_subscription_new: "account_subscription_new",
  account_subscription_renew: "account_subscription_renew",
  account_notifications: "account_notifications",
  account_plan_upgrade: "account_plan_upgrade",
  account_plan_enterprise: "account_plan_enterprise",
  account_plan_manage: "account_plan_manage",
  account_team_invite: "account_team_invite",
  account_team_remove: "account_team_remove",
  account_team_leave: "account_team_leave",
  account_team_change_role: "account_team_change_role",
  account_team_resend: "account_team_resend",
  account_update: "Update Account",
  account_copy_id: "account_copy_id",
  account_insights_change_period: "account_insights_change_period",
  account_insights_download_csv: "account_insights_download_csv",
  account_insights_select_network: "account_insights_select_network",
  account_insights_select_app: "account_insights_select_app",
  account_update_change_name: "account_update_change_name",
  user_header_menu: "user_header_menu",
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
  value?: number | string
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
