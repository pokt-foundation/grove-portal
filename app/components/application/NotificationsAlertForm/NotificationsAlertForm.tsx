import { LinksFunction } from "@remix-run/node"
import { Form } from "@remix-run/react"
import Button from "~/components/shared/Button"
import NotificationsActivateAlertsCard, {
  links as NotificationsActivateAlertsCardLinks,
} from "../NotificationsActivateAlertsCard"
import NotificationsAlertCard, {
  links as NotificationsAlertCardLinks,
} from "../NotificationsAlertCard"

export const links: LinksFunction = () => [
  ...NotificationsActivateAlertsCardLinks(),
  ...NotificationsAlertCardLinks(),
]

const NOTIFICATIONS_ALERT_LEVELS = ["quarter", "half", "threeQuarters", "full"]

export default function NotificationsAlertForm() {
  return (
    <Form method="put">
      <Button variant="filled" type="submit">
        Save Changes
      </Button>
      <Button>Back to application</Button>
      <NotificationsActivateAlertsCard />
      {NOTIFICATIONS_ALERT_LEVELS.map((level) => (
        <NotificationsAlertCard
          key={level}
          level={level as "quarter" | "half" | "threeQuarters" | "full"}
        />
      ))}
    </Form>
  )
}
