import Mailjet from "node-mailjet"
import { getRequiredServerEnvVar } from "~/utils/environment"

const mailjet = Mailjet.apiConnect(
  getRequiredServerEnvVar("MAILJET_API_KEY"),
  getRequiredServerEnvVar("MAILJET_API_SECRET"),
)

enum EmailTemplateID {
  TeamInvite = 5140190,
  TeamUserRemoved = 5140647,
}

export const sendEmail = async (
  to: string,
  subject: string,
  template: EmailTemplateID,
  variables: { [key: string]: string },
) => {
  return await mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "portal@grove.city",
          Name: "Grove Portal",
        },
        To: [
          {
            Email: to,
            Name: to,
          },
        ],
        TemplateID: template,
        TemplateLanguage: true,
        Subject: subject,
        Variables: variables,
      },
    ],
  })
}

export const sendTeamInviteEmail = async (email: string, account: string) => {
  return await sendEmail(
    email,
    "You're invited to Grove Portal",
    EmailTemplateID.TeamInvite,
    {
      app: account,
    },
  )
}
export const sendTeamUserRemovedEmail = async (email: string, account: string) => {
  return await sendEmail(email, "Team access removed", EmailTemplateID.TeamUserRemoved, {
    app: account,
  })
}
