import { Link } from "@pokt-foundation/ui"
import { ActionFunction, json, LinksFunction } from "@remix-run/node"
import invariant from "tiny-invariant"
import NotificationsWeeklyBandwidthUsageCard, {
  links as NotificationsWeeklyBandwidthUsageCardLinks,
} from "~/components/application/NotificationsWeeklyBandwidthUsageCard"
import NotificationsAlertForm, {
  links as NotificationsAlertFormLinks,
} from "~/components/application/NotificationsAlertForm/NotificationsAlertForm"
import { putNotifications } from "~/models/portal.server"
import styles from "~/styles/dashboard.apps.$appId.notifications.css"
import { useCatch } from "@remix-run/react"

export const links: LinksFunction = () => [
  ...NotificationsWeeklyBandwidthUsageCardLinks(),
  ...NotificationsAlertFormLinks(),
  {
    rel: "stylesheet",
    href: styles,
  },
]

export const action: ActionFunction = async ({ request, params }) => {
  const { appId } = params
  invariant(appId, "app id not found")
  const formData = await request.formData()
  const quarter = formData.get("quarter")
  const half = formData.get("half")
  const threeQuarters = formData.get("threeQuarters")
  const full = formData.get("full")

  try {
    const res = await putNotifications(request, appId!, {
      quarter: quarter === "on" ? true : false,
      half: half === "on" ? true : false,
      threeQuarters: threeQuarters === "on" ? true : false,
      full: full === "on" ? true : false,
    })

    return json<boolean>(res)
  } catch (e) {
    return json<any>(e)
  }
}

export default function AppNotifications() {
  return (
    <section className="pokt-network-app-notifications">
      <NotificationsAlertForm />
      <NotificationsWeeklyBandwidthUsageCard />
      <p className="pokt-network-app-notifications-p">
        If you need more relays for your application or you are looking to stake your own
        POKT, please{" "}
        <Link href="mailto:sales@pokt.netowork?subject=Portal Contact">contact us</Link>{" "}
        and our team will find a solution for you.
      </p>
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
