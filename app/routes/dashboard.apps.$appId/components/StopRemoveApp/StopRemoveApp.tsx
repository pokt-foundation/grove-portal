import { Button, Text, IconDeleteAlt } from "@pokt-foundation/pocket-blocks"
import { Form, useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import Modal, { links as ModalLinks, ModalCTA } from "~/components/shared/Modal"
import { useTranslate } from "~/context/TranslateContext"
import { PayPlanType } from "~/models/portal/sdk"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { StripeDeleteActionData } from "~/routes/api/stripe/api.stripe.subscription"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
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
  isMember: boolean
}

export default function StopRemoveApp({
  apps,
  appId,
  name,
  planType,
  subscription,
  isMember,
}: StopRemoveAppProps) {
  const { t } = useTranslate()
  const [showStopModal, setShowStopModal] = useState(false)
  const [removeAppOpened, setRemoveAppOpened] = useState(false)
  const subscriptionFetcher = useFetcher()

  useEffect(() => {
    const data = subscriptionFetcher.data as StripeDeleteActionData
    if (data && !data.error && subscriptionFetcher.state === "idle") {
      setShowStopModal(false)
    }
  }, [appId, subscriptionFetcher])

  if (isMember) return <></>

  return (
    <>
      {isPaidPlan(planType) && subscription ? (
        <>
          <Button
            fullWidth
            color="gray"
            leftIcon={<IconDeleteAlt height={18} width={18} />}
            size="xs"
            variant="outline"
            onClick={() => setShowStopModal(true)}
          >
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
                      trackEvent(AmplitudeEvents.StopSubscription)
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
          <Button
            fullWidth
            color="gray"
            leftIcon={<IconDeleteAlt height={18} width={18} />}
            size="xs"
            variant="outline"
            onClick={() => setRemoveAppOpened(true)}
          >
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
                    trackEvent(AmplitudeEvents.EndpointRemoval)
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
