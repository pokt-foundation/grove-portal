import { Button } from "@pokt-foundation/pocket-blocks"
import { Form, Link, useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import AppRemoveModal, { links as AppRemoveModalLinks } from "../AppRemoveModal"
import styles from "./styles.css"
import Modal from "~/components/shared/Modal"
import { useTranslate } from "~/context/TranslateContext"
import { PayPlanType } from "~/models/portal/sdk"
import { isPaidPlan } from "~/utils/utils"
import { StripeDeleteActionData } from "~/routes/api/stripe/cancel"
import { endpoint } from "~/models/portal/portal.data"

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
  const deleteFetcher = useFetcher()

  useEffect(() => {
    const data = deleteFetcher.data as StripeDeleteActionData
    if (data && !data.error) {
      setShowStopModal(false)
    }
  }, [deleteFetcher])

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
              <Form action="/api/stripe/cancel" method="post">
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
              </Form>
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
