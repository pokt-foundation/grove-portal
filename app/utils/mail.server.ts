import formData from "form-data"
import Mailgun from "mailgun.js"
import { getRequiredClientEnvVar } from "~/utils/environment"
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: "api",
  key: getRequiredClientEnvVar("MAILGUN_API_KEY"),
})
const DOMAIN_NAME = "grove.city"

enum EmailTemplates {
  TeamInvite = "pocket-dashboard-team-invite",
  TeamUserRemoved = "pocket-dashboard-team-user-removed",
  TeamNewOwner = "pocket-dashboard-team-new-owner",
  NotificationChanged = "pocket-dashboard-notifications-changed",
  NotificationSignup = "pocket-dashboard-notifications-signup",
  NotificationThreshold = "pocket-dashboard-notifications-threshold-hit",
  PasswordReset = "pocket-dashboard-password-reset",
  Signup = "pocket-dashboard-signup",
  Feedback = "pocket-portal-feedback-box",
  Unstake = "pocket-portal-unstake-notification",
}

const getMailgunTemplate = (
  to: string,
  subject: string,
  template: EmailTemplates,
  variables: { [key: string]: string },
) => {
  return {
    from: "Grove Portal <portal@grove.city>",
    to,
    subject,
    template,
    "h:X-Mailgun-Variables": JSON.stringify(variables),
  }
}

export const sendEmail = async (
  to: string,
  subject: string,
  template: EmailTemplates,
  variables: { [key: string]: string },
) => {
  const mailgunData = getMailgunTemplate(to, subject, template, variables)
  await mg.messages.create(DOMAIN_NAME, mailgunData)
}

export const sendTeamInviteEmail = async (email: string, app: string) => {
  return await sendEmail(
    email,
    "Your invite to Grove Portal",
    EmailTemplates.TeamInvite,
    {
      app: app,
      // TODO: Change to correct invite link
      invite_link: "https://www.portal.grove.city/account",
    },
  )
}
export const sendTeamUserRemovedEmail = async (email: string, app: string) => {
  return await sendEmail(
    email,
    `You have been removed from ${app}`,
    EmailTemplates.TeamUserRemoved,
    {
      app: app,
    },
  )
}
export const sendTeamNewOwnerEmail = async (email: string, app: string) => {
  return await sendEmail(email, `New owner of ${app}`, EmailTemplates.TeamNewOwner, {
    app: app,
  })
}
