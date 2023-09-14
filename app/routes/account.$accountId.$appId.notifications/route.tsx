import { ActionFunction, json } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import { AppIdOutletContext } from "../account.$accountId.$appId/route"
import { initPortalClient } from "~/models/portal/portal.server"
import AppNotificationsAlert from "~/routes/account.$accountId.$appId.notifications/components/AppNotificationsAlert"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { requireUser } from "~/utils/user.server"

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

    return json<boolean>(true)
  } catch (e) {
    return json<any>(e)
  }
}

export default function AppNotifications() {
  useEffect(() => {
    trackEvent(AmplitudeEvents.NotificationDetailsView)
  }, [])

  const { app } = useOutletContext<AppIdOutletContext>()

  return <AppNotificationsAlert app={app} />
}
