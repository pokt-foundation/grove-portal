import { ActionFunction, LinksFunction, json } from "@remix-run/node"
import { useCatch, useOutletContext } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import { AppIdOutletContext } from "../dashboard.apps.$appId/route"
import NotificationsAlertForm from "./components/NotificationsAlertForm/NotificationsAlertForm"
import styles from "./styles.css"
import { initPortalClient } from "~/models/portal/portal.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { requireUser } from "~/utils/session.server"

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
]

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

  const { endpoint } = useOutletContext<AppIdOutletContext>()

  return (
    <section className="pokt-network-app-notifications">
      <NotificationsAlertForm endpoint={endpoint} />
    </section>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>Notifications Catch Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>Notifications Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
