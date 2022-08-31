import { Group } from "@mantine/core"
import { Button, Text } from "@pokt-foundation/pocket-blocks"
import { Form, Link, useFetcher, useLocation } from "@remix-run/react"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import { useTranslate } from "~/context/TranslateContext"
import { endpoint } from "~/models/portal/portal.data"
import { PayPlanType } from "~/models/portal/sdk"
import { StripeDeleteActionData } from "~/routes/api/stripe/subscription"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { isPaidPlan } from "~/utils/utils"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface StopRemoveAppProps {
  appId: string
  planType: PayPlanType
}

export default function StopRemoveApp({ appId, planType }: StopRemoveAppProps) {
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
      {isPaidPlan(planType) ? (
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
              <Group align="center" className="buttonGroup" position="apart">
                <Button variant="outline" onClick={() => setShowStopModal(false)}>
                  {t.common.cancel}
                </Button>
                <subscriptionFetcher.Form action="/api/stripe/subscription" method="post">
                  <input hidden name="app-id" value={appId} />
                  <Button fullWidth type="submit" variant="outline">
                    <img
                      aria-hidden
                      alt={t.common.StopSubscription}
                      className="pokt-app-remove-delete-icon"
                      src="/delete.svg"
                    />{" "}
                    {t.common.StopSubscription}
                  </Button>
                </subscriptionFetcher.Form>
              </Group>
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
              <Text>
                {t.stopRemoveApp.appId} {appId}
              </Text>
            </div>
            <Group align="center" className="buttonGroup" position="apart">
              <Button variant="outline" onClick={() => setRemoveAppOpened(false)}>
                {t.common.cancel}
              </Button>
              <Form action={`/dashboard/apps/${appId}/remove`} method="post">
                <Button
                  type="submit"
                  onClick={() => {
                    trackEvent(AmplitudeEvents.EndpointRemoval)
                  }}
                >
                  {t.stopRemoveApp.removeApp}
                </Button>
              </Form>
            </Group>
          </Modal>
        </div>
      )}
    </>
  )
}
