import { Button, Text } from "@pokt-foundation/pocket-blocks"
import { Form, useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import Modal, { links as ModalLinks, ModalCTA } from "~/components/shared/Modal"
import { useTranslate } from "~/context/TranslateContext"
import { PayPlanType } from "~/models/portal/sdk"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { StripeDeleteActionData } from "~/routes/api/stripe/subscription"
import { CustomEvents, trackEvent } from "~/utils/analytics"
import { isPaidPlan } from "~/utils/utils"

/* c8 ignore next */
export const links = () => {
  return [...ModalLinks(), { rel: "stylesheet", href: styles }]
}

interface StopRemoveAppProps {
  apps: ProcessedEndpoint["apps"]
  appId: string
  name: string
  planType: PayPlanType
  subscription?: Stripe.Subscription
}

export default function StopRemoveApp({
  apps,
  appId,
  name,
  planType,
  subscription,
}: StopRemoveAppProps) {
  const { t } = useTranslate()
  const [showStopModal, setShowStopModal] = useState(false)
  const [removeAppOpened, setRemoveAppOpened] = useState(false)
  const subscriptionFetcher = useFetcher()
  // const location = useLocation()

  useEffect(() => {
    const data = subscriptionFetcher.data as StripeDeleteActionData
    if (data && !data.error && subscriptionFetcher.state === "idle") {
      setShowStopModal(false)
    }
  }, [appId, subscriptionFetcher])

  // useEffect(() => {
  //   if (location.pathname === "api/stripe/subscription") {
  //     setShowStopModal(false)
  //   }
  // }, [location])

  return (
    <>
      {isPaidPlan(planType) && subscription ? (
        <>
          <Button fullWidth variant="outline" onClick={() => setShowStopModal(true)}>
            <img
              aria-hidden
              alt={t.common.StopSubscription}
              className="pokt-app-remove-delete-icon"
              src="/delete.svg"
            />{" "}
            {t.common.StopSubscription}
          </Button>
          <Modal
            opened={showStopModal}
            title={t.stopRemoveApp.stopSubscriptionTitle}
            onClose={() => setShowStopModal(false)}
          >
            <div>
              <p>{t.stopRemoveApp.planDowngrade}</p>
              <p>{t.stopRemoveApp.planRenew}</p>
              <ModalCTA>
                <Button variant="outline" onClick={() => setShowStopModal(false)}>
                  {t.common.cancel}
                </Button>
                <subscriptionFetcher.Form action="/api/stripe/subscription" method="post">
                  <input hidden name="app-id" value={appId} />
                  <Button
                    type="submit"
                    onClick={() => {
                      trackEvent(CustomEvents.StopSubscription)
                    }}
                  >
                    {t.common.StopSubscription}
                  </Button>
                </subscriptionFetcher.Form>
              </ModalCTA>
            </div>
          </Modal>
        </>
      ) : (
        <div className="pokt-app-remove">
          <Button fullWidth variant="outline" onClick={() => setRemoveAppOpened(true)}>
            <img
              aria-hidden
              alt={t.stopRemoveApp.removeApp}
              className="pokt-app-remove-delete-icon"
              src="/delete.svg"
            />
            {t.stopRemoveApp.removeApp}
          </Button>
          <Modal
            opened={removeAppOpened}
            title={t.stopRemoveApp.removeAppTitle}
            onClose={() => setRemoveAppOpened(false)}
          >
            <div>
              <Text>{t.stopRemoveApp.removeAppDescription}</Text>
              <Text mt={8}>
                {t.stopRemoveApp.name} <Text component="span">{name}</Text>
              </Text>
              {apps && apps[0].appId && (
                <Text mt={8}>
                  {t.stopRemoveApp.appAddress}{" "}
                  <Text component="span">{apps[0].appId}</Text>
                </Text>
              )}
            </div>
            <ModalCTA>
              <Button variant="outline" onClick={() => setRemoveAppOpened(false)}>
                {t.common.cancel}
              </Button>
              <Form action={`/dashboard/apps/${appId}/remove`} method="post">
                <Button
                  type="submit"
                  onClick={() => {
                    trackEvent(CustomEvents.EndpointRemoval)
                  }}
                >
                  {t.stopRemoveApp.removeApp}
                </Button>
              </Form>
            </ModalCTA>
          </Modal>
        </div>
      )}
    </>
  )
}
