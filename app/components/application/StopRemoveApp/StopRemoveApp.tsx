import { Link } from "@remix-run/react"
import AppRemoveModal from "../AppRemoveModal"
import styles from "./styles.css"
import Button from "~/components/shared/Button"
import { PayPlanType } from "~/models/portal/sdk"
import { isFreePlan } from "~/utils/utils"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface StopRemoveAppProps {
  endpointId: string
  planType: PayPlanType
}

export default function StopRemoveApp({ endpointId, planType }: StopRemoveAppProps) {
  const stripe = "/api/stripe/portal-session"
  return (
    <>
      {isFreePlan(planType) ? (
        <AppRemoveModal appId={endpointId} />
      ) : (
        <Button fullWidth component={Link} to={stripe} variant="subtle">
          <img
            alt="Remove Application"
            className="pokt-app-remove-delete-icon"
            src="/delete.svg"
          />{" "}
          Stop Subscription
        </Button>
      )}
    </>
  )
}
