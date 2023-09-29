import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import invariant from "tiny-invariant"
import { AppIdOutletContext } from "../org.$accountId.$appId/route"
import AppNotificationsAlert from "./components/AppNotificationsAlert"
import { initPortalClient } from "~/models/portal/portal.server"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Application Notifications ${seo_title_append}`,
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const { appId, accountId } = params
  invariant(appId, "app id not found")
  const getUserPortalAppResponse = await portal.getUserPortalApp({ portalAppID: appId })
  const canViewRoute =
    getUserPortalAppResponse?.getUserPortalApp?.legacyFields.planType !==
    "PAY_AS_YOU_GO_V0"

  if (!canViewRoute) {
    return redirect(`/org/${accountId}/${appId}`)
  }

  return null
}

export type AppNotificationsActionData = {
  success: boolean
}

export const action: ActionFunction = async ({ request, params }) => {
  const { appId } = params
  invariant(appId, "app id not found")
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  const formData = await request.formData()
  const quarter = formData.get("quarter")
  const half = formData.get("half")
  const threeQuarters = formData.get("threeQuarters")
  const full = formData.get("full")

  try {
    await portal.updateEndpoint({
      input: {
        id: appId,
        notificationSettings: {
          signedUp: true,
          quarter: quarter === "on",
          half: half === "on",
          threeQuarters: threeQuarters === "on",
          full: full === "on",
        },
      },
    })

    return json<DataStruct<AppNotificationsActionData>>({
      data: {
        success: true,
      },
      error: false,
      message: "Notification setting updated",
    })
  } catch (error) {
    return json<DataStruct<AppNotificationsActionData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function AppNotifications() {
  const { app } = useOutletContext<AppIdOutletContext>()

  return <AppNotificationsAlert app={app} />
}
