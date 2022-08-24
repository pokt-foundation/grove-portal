import { Link } from "@remix-run/react"
import AppRemoveModal from "../AppRemoveModal"
import styles from "./styles.css"
import Button from "~/components/shared/Button"
import { PayPlanType } from "~/models/portal/sdk"
import { isFreePlan } from "~/utils/utils"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface StopRemoveAppProps {
  endpointId: string
  planType: PayPlanType
}

export default function StopRemoveApp({ endpointId, planType }: StopRemoveAppProps) {
  const { t } = useTranslate()
  const stripe = "/api/stripe/portal-session"
  return (
    <>
      {isFreePlan(planType) ? (
        <AppRemoveModal appId={endpointId} />
      ) : (
        <Button fullWidth component={Link} to={stripe} variant="subtle">
          <img
            aria-hidden
            alt="Remove Application"
            className="pokt-app-remove-delete-icon"
            src="/delete.svg"
          />{" "}
          {t.common.StopSubscription}
        </Button>
      )}
    </>
  )
}
