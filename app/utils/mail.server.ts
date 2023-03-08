import Mailgun from "mailgun.js"
import formData from "form-data"
import { getRequiredClientEnvVar } from "~/utils/environment"
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: "api",
  key: getRequiredClientEnvVar("MAILGUN_API_KEY"),
})
const DOMAIN_NAME = "pokt.network"

const getMailgunTemplate = (to: string, subject: string, template: "pocket-dashboard-team-invite", variables: { [key: string]: string }) => {
  return {
    from: "Mailgun Sandbox <postmaster@pokt.network>",
    to,
    subject,
    template,
    "h:X-Mailgun-Variables": JSON.stringify(variables),
  }
}

const sendEmail = async (to: string, subject: string, template: "pocket-dashboard-team-invite", variables: { [key: string]: string }) => {
  const mailgunData = getMailgunTemplate(to, subject, template, variables)
  await mg.messages.create(DOMAIN_NAME, mailgunData)
}

export { sendEmail }