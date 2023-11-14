import { ActionFunction, json, MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { NotificationEventEnum, NotificationType, RoleName } from "~/models/portal/sdk"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import AccountNotificationsView from "~/routes/account.$accountId.settings.notifications/view"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Account Notifications ${seo_title_append}`,
  }
}

export type AccountNotificationsActionData = {
  success: boolean
}

export const action: ActionFunction = async ({ request, params }) => {
  const { accountId } = params
  invariant(accountId, "account id not found")
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  const formData = await request.formData()

  const events = Array.from(formData.keys()).filter(
    (key) => formData.get(key) === "on",
  ) as NotificationEventEnum[]

  try {
    await portal.updateUserAccount({
      input: {
        accountID: accountId,
        notificationSettings: [
          {
            active: true,
            notificationType: NotificationType.Email,
            events: events,
          },
        ],
      },
    })

    return json<DataStruct<AccountNotificationsActionData>>({
      data: {
        success: true,
      },
      error: false,
      message: "Notification setting updated",
    })
  } catch (error) {
    return json<DataStruct<AccountNotificationsActionData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function AccountNotifications() {
  const { account } = useOutletContext<AccountIdLoaderData>()

  return <AccountNotificationsView account={account} userRole={RoleName.Admin} />
}
