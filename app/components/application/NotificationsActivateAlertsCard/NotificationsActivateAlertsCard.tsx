import type { LinksFunction } from "@remix-run/node"
import Card from "~/components/shared/Card"
import styles from "./styles.css"

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
]

export default function NotificationsActivateAlertsCard() {
  return (
    <section className="pokt-network-notifications-activate-alerts">
      <Card>
        <h4>Activate Alerts</h4>
        <p>
          We will send an email when your usage crosses the thresholds specified below.
        </p>
      </Card>
    </section>
  )
}
