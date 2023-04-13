import { Button, Text, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import { Form, useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import Modal, { links as ModalLinks, ModalCTA } from "~/components/shared/Modal"
import { useTranslate } from "~/context/TranslateContext"
import { PayPlanType } from "~/models/portal/sdk"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { StripeDeleteActionData } from "~/routes/api/stripe/subscription"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { isPaidPlan } from "~/utils/utils"
import Delete from "~/components/shared/Delete/Delete"

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
  isAdmin: boolean
}

export default function StopRemoveApp({
  apps,
  appId,
  name,
  planType,
  subscription,
  isMember,
  isAdmin,
}: StopRemoveAppProps) {
  const { t } = useTranslate()
  const [showStopModal, setShowStopModal] = useState(false)
  const [removeAppOpened, setRemoveAppOpened] = useState(false)
  const subscriptionFetcher = useFetcher()
  const theme = useMantineTheme()

  useEffect(() => {
    const data = subscriptionFetcher.data as StripeDeleteActionData
    if (data && !data.error && subscriptionFetcher.state === "idle") {
      setShowStopModal(false)
    }
  }, [appId, subscriptionFetcher])

  if (isMember) return <></>
  if (isAdmin) return <></>

  return (
    <>
      {isPaidPlan(planType) && subscription ? (
        <>
          <Delete
            buttonProps={{
              fullWidth: true,
              iconFill: theme.colors.blue[5],
              variant: "outline",
            }}
            onDelete={() => setShowStopModal(true)}
          >
            {t.common.StopSubscription}
          </Delete>
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
          <Delete
            buttonProps={{
              fullWidth: true,
              iconFill: theme.colors.blue[5],
              variant: "outline",
            }}
            onDelete={() => setRemoveAppOpened(true)}
          >
            {t.stopRemoveApp.removeApp}
          </Delete>
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
