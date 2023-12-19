import { Novu, TriggerRecipientsTypeEnum } from "@novu/node"
import { RoleName, User } from "~/models/portal/sdk"
import { TeamActionType } from "~/routes/account.$accountId.settings.members/route"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { capitalizeFirstLetter } from "~/utils/utils"

export const novu = new Novu(getRequiredServerEnvVar("NOVU_API_KEY"))
export const NOTIFICATIONS = { IN_APP_NOTIFICATION: "in-app-notification" }

type NovuNotificationPayload = {
  message: string
  chatMsg?: string
  redirectTo?: string
  emailTitle?: string
  emailBody?: string
  withCta?: boolean
  ctaText?: string
  ctaLink?: string
}

type NotificationTarget = "actor" | "user" | "teamMembers"

type TriggerNotificationBaseProps = {
  actor: User
  accountId: string
  accountName?: string
}

type TriggerTeamActionNotificationBaseProps = TriggerNotificationBaseProps & {
  targetedUserEmail: string
  targetedUserId: string
}

type TriggerTeamActionNotificationProps = TriggerTeamActionNotificationBaseProps &
  (
    | {
        type: Exclude<TeamActionType, "delete">
        userRole: RoleName
      }
    | {
        type: "delete"
        userRole?: RoleName
      }
  )

type GetAccountNotificationPayloadProps = Omit<
  TriggerTeamActionNotificationProps,
  "targetedUserId"
> & {
  target: NotificationTarget
}

const getAccountNotificationPayload = ({
  actor,
  type,
  target,
  userRole,
  accountId,
  accountName,
  targetedUserEmail,
}: GetAccountNotificationPayloadProps): NovuNotificationPayload => {
  switch (type) {
    case "invite":
      if (target === "user") {
        return {
          message: `${actor.email} has invited you to account ${
            accountName ?? accountId
          } as ${userRole === RoleName.Admin ? "an" : "a"} ${capitalizeFirstLetter(
            userRole as RoleName,
          )}`,
          redirectTo: "/user/accounts",
          emailTitle: "Account Invitation",
          emailBody: `${actor.email} has invited you to account ${
            accountName ?? accountId
          } as ${userRole === RoleName.Admin ? "an" : "a"} ${capitalizeFirstLetter(
            userRole as RoleName,
          )}`,
          withCta: true,
          ctaText: "Accept Invitation",
          ctaLink: "https://portal.grove.city/user/accounts",
        }
      } else if (target === "actor") {
        return {
          message: `You have invited user ${targetedUserEmail} to account ${
            accountName ?? accountId
          }`,
          redirectTo: `/account/${accountId}/settings/members`,
        }
      } else if (target === "teamMembers") {
        return {
          message: `User ${actor.email} has invited ${targetedUserEmail} to account ${
            accountName ?? accountId
          }`,
          redirectTo: `/account/${accountId}/settings/members`,
        }
      }
      break
    case "delete":
      if (target === "user") {
        return {
          message: `You have been removed from ${accountName ?? accountId} by ${
            actor.email
          }".`,
          emailTitle: "Team access removed",
          emailBody: `You are receiving this email to inform that you have been removed from ${
            accountName ?? accountId
          }. You will not have access to the account anymore.`,
        }
      } else if (target === "actor") {
        return {
          message: `You removed ${targetedUserEmail} from ${accountName ?? accountId}`,
          redirectTo: `/account/${accountId}/settings/members`,
        }
      } else if (target === "teamMembers") {
        return {
          message: `${actor.email} has removed ${targetedUserEmail} from ${
            accountName ?? accountId
          }`,
          redirectTo: `/account/${accountId}/settings/members`,
        }
      }
      break
    case "updateRole":
      if (target === "user") {
        return {
          message: `Your role has been updated on ${
            accountName ?? accountId
          } to ${capitalizeFirstLetter(userRole as RoleName)}.`,
          redirectTo: `/account/${accountId}/settings/members`,
        }
      } else if (target === "teamMembers") {
        return {
          message: `${targetedUserEmail}'s role on ${
            accountName ?? accountId
          } has been updated to ${capitalizeFirstLetter(userRole as RoleName)}.`,
          redirectTo: `/account/${accountId}/settings/members`,
        }
      }
      break
    case "resend":
      return {
        message: `${actor.email} has invited you to account ${
          accountName ?? accountId
        } as ${userRole === RoleName.Admin ? "an" : "a"} ${capitalizeFirstLetter(
          userRole as RoleName,
        )}`,
        redirectTo: "/user/accounts",
        emailTitle: "Account Invitation",
        emailBody: `${actor.email} has invited you to account ${
          accountName ?? accountId
        } as ${userRole === RoleName.Admin ? "an" : "a"} ${capitalizeFirstLetter(
          userRole as RoleName,
        )}`,
        withCta: true,
        ctaText: "Accept Invitation",
        ctaLink: "https://portal.grove.city/user/accounts",
      }
  }

  return { message: "" }
}

export const triggerTeamActionNotification = async ({
  actor,
  type,
  userRole,
  accountId,
  accountName,
  targetedUserId,
  targetedUserEmail,
}: TriggerTeamActionNotificationProps) => {
  switch (type) {
    case "invite":
    case "delete":
      return await novu.bulkTrigger([
        {
          name: NOTIFICATIONS.IN_APP_NOTIFICATION,
          to: {
            subscriberId: targetedUserId,
            email: targetedUserEmail,
          },
          payload: getAccountNotificationPayload({
            target: "user",
            actor,
            type,
            userRole,
            accountId,
            accountName,
            targetedUserEmail,
          }) as NovuNotificationPayload,
        },
        {
          name: NOTIFICATIONS.IN_APP_NOTIFICATION,
          to: {
            subscriberId: actor.portalUserID,
          },
          payload: getAccountNotificationPayload({
            target: "actor",
            actor,
            type,
            userRole,
            accountId,
            accountName,
            targetedUserEmail,
          }) as NovuNotificationPayload,
        },
        {
          name: NOTIFICATIONS.IN_APP_NOTIFICATION,
          to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: accountId }],
          actor: { subscriberId: actor.portalUserID },
          payload: getAccountNotificationPayload({
            target: "teamMembers",
            actor,
            type,
            userRole,
            accountId,
            accountName,
            targetedUserEmail,
          }) as NovuNotificationPayload,
        },
      ])
    case "updateRole":
      return await novu.bulkTrigger([
        {
          name: NOTIFICATIONS.IN_APP_NOTIFICATION,
          to: {
            subscriberId: targetedUserId,
          },
          payload: getAccountNotificationPayload({
            target: "user",
            actor,
            type,
            userRole,
            accountId,
            accountName,
            targetedUserEmail,
          }) as NovuNotificationPayload,
        },
        {
          name: NOTIFICATIONS.IN_APP_NOTIFICATION,
          to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: accountId }],
          actor: { subscriberId: targetedUserId },
          payload: getAccountNotificationPayload({
            target: "teamMembers",
            actor,
            type,
            userRole,
            accountId,
            accountName,
            targetedUserEmail,
          }) as NovuNotificationPayload,
        },
      ])
    case "resend":
      return await novu.trigger(NOTIFICATIONS.IN_APP_NOTIFICATION, {
        to: {
          subscriberId: targetedUserId,
          email: targetedUserEmail,
        },
        payload: getAccountNotificationPayload({
          target: "user",
          actor,
          type,
          userRole,
          accountId,
          accountName,
          targetedUserEmail,
        }) as NovuNotificationPayload,
      })
  }
}
