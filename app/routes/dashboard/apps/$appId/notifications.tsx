import { Link, useToast } from "@pokt-foundation/ui"
import { Grid } from "@mantine/core"
import { ActionFunction, json, LinksFunction } from "@remix-run/node"
import invariant from "tiny-invariant"
import NotificationsWeeklyBandwidthUsageCard, {
  links as NotificationsWeeklyBandwidthUsageCardLinks,
} from "~/components/application/NotificationsWeeklyBandwidthUsageCard"
import NotificationsAlertForm, {
  links as NotificationsAlertFormLinks,
} from "~/components/application/NotificationsAlertForm/NotificationsAlertForm"
import { updateNotifications } from "~/models/portal.server"
import styles from "~/styles/dashboard.apps.$appId.notifications.css"
import { useActionData } from "@remix-run/react"
import { useCallback, useEffect } from "react"

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
    const res = await updateNotifications(request, appId!, {
      quarter: quarter === "on" ? true : false,
      half: half === "on" ? true : false,
      threeQuarters: threeQuarters === "on" ? true : false,
      full: full === "on" ? true : false,
    })

    return json<boolean>(res)
  } catch (e) {
    console.log(typeof e)
    return json<any>(e)
  }
}

export default function AppNotifications() {
  const actionData = useActionData()
  const toast = useToast()
  const addToast = useCallback((msg) => toast(msg), [toast])

  useEffect(() => {
    if (actionData && typeof actionData === "boolean") {
      addToast("Notification preferences updated")
    } else {
      addToast(actionData)
    }
  }, [actionData, addToast])

  return (
    <Grid className="pokt-network-app-notifications">
      <Grid.Col xl={12}>
        <h3>Notifications</h3>
      </Grid.Col>
      <Grid.Col md={12} lg={8} xl={8}>
        <p className="pokt-network-app-notifications-p">
          Set up usage alerts to be warned when you are approaching your relay limits. The
          Portal automatically redirects all surplus relays to our backup infrastructure.
          If you want all relays to be unstoppable, stay under your limit or contact the
          team to up your stake.
        </p>
        <NotificationsWeeklyBandwidthUsageCard />
        <p className="pokt-network-app-notifications-p">
          If you need more relays for your application or you are looking to stake your
          own POKT, please{" "}
          <Link href="mailto:sales@pokt.netowork?subject=Portal Contact">contact us</Link>{" "}
          and our team will find a solution for you.
        </p>
      </Grid.Col>
      <Grid.Col md={12} lg={4} xl={4}>
        <NotificationsAlertForm />
      </Grid.Col>
    </Grid>
  )
}
