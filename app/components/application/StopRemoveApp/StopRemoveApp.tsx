import { Button } from "@pokt-foundation/pocket-blocks"
import { Form, Link, useFetcher, useLocation } from "@remix-run/react"
import { useEffect, useState } from "react"
import AppRemoveModal, { links as AppRemoveModalLinks } from "../AppRemoveModal"
import styles from "./styles.css"
import Modal from "~/components/shared/Modal"
import { useTranslate } from "~/context/TranslateContext"
import { endpoint } from "~/models/portal/portal.data"
import { PayPlanType } from "~/models/portal/sdk"
import { StripeDeleteActionData } from "~/routes/api/stripe/subscription"
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
  const [showStopModal, setShowStopModal] = useState(false)
  const subscriptionFetcher = useFetcher()
  // const location = useLocation()

  useEffect(() => {
    const data = subscriptionFetcher.data as StripeDeleteActionData
    if (data && !data.error && subscriptionFetcher.state === "idle") {
      setShowStopModal(false)
    }
  }, [endpointId, subscriptionFetcher])

  // useEffect(() => {
  //   if (location.pathname === "api/stripe/subscription") {
  //     setShowStopModal(false)
  //   }
  // }, [location])

  return (
    <>
      {isPaidPlan(planType) ? (
        <>
          <Button fullWidth variant="outline" onClick={() => setShowStopModal(true)}>
            <img
              aria-hidden
              alt="Stop Subscription"
              className="pokt-app-remove-delete-icon"
              src="/delete.svg"
            />{" "}
            {t.common.StopSubscription}
          </Button>
          <Modal
            opened={showStopModal}
            title="Cancel Subscription"
            onClose={() => setShowStopModal(false)}
          >
            <div>
              <p>
                Your plan will be canceled, but is still available until the end of your
                billing period.
              </p>
              <p>If you change your mind, you can renew your subscription.</p>
              <subscriptionFetcher.Form action="/api/stripe/subscription" method="post">
                <input hidden name="app-id" value={endpointId} />
                <Button fullWidth type="submit" variant="outline">
                  <img
                    aria-hidden
                    alt="Stop Subscription"
                    className="pokt-app-remove-delete-icon"
                    src="/delete.svg"
                  />{" "}
                  {t.common.StopSubscription}
                </Button>
              </subscriptionFetcher.Form>
              <Button variant="outline" onClick={() => setShowStopModal(false)}>
                Cancel
              </Button>
            </div>
          </Modal>
        </>
      ) : (
        <AppRemoveModal appId={endpointId} />
      )}
    </>
  )
}
