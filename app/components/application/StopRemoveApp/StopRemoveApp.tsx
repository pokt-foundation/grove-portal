import { Button } from "@pokt-foundation/pocket-blocks"
import { Form, Link } from "@remix-run/react"
import AppRemoveModal, { links as AppRemoveModalLinks } from "../AppRemoveModal"
import styles from "./styles.css"
import { useTranslate } from "~/context/TranslateContext"
import { PayPlanType } from "~/models/portal/sdk"
import { isPaidPlan } from "~/utils/utils"

/* c8 ignore next */
export const links = () => {
  return [...AppRemoveModalLinks(), { rel: "stylesheet", href: styles }]
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
      {isPaidPlan(planType) ? (
        <Form action={stripe} method="post">
          <Button fullWidth type="submit" variant="subtle">
            <img
              aria-hidden
              alt="Stop Subscription"
              className="pokt-app-remove-delete-icon"
              src="/delete.svg"
            />{" "}
            {t.common.StopSubscription}
          </Button>
        </Form>
      ) : (
        <AppRemoveModal appId={endpointId} />
      )}
    </>
  )
}
