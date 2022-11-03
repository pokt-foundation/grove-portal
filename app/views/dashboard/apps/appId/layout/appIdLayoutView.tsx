import { IconCaretLeft, Grid, Button } from "@pokt-foundation/pocket-blocks"
import { Outlet, useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import styles from "./styles.css"
import AppAddressCard, {
  links as AppAddressCardLinks,
} from "~/components/application/AppAddressCard"
import AppKeysCard, {
  links as AppKeysCardLinks,
} from "~/components/application/AppKeysCard"
import AppPlanDetails, {
  links as AppPlanDetailsLinks,
} from "~/components/application/AppPlanDetails"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import LegacyBannerCard, {
  links as LegacyBannerCardLinks,
} from "~/components/application/LegacyBannerCard"
import StopRemoveApp, {
  links as StopRemoveAppLinks,
} from "~/components/application/StopRemoveApp"
import Modal, { links as ModalLinks, ModalCTA } from "~/components/shared/Modal"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { useFeatureFlags } from "~/context/FeatureFlagContext"
import { useTranslate } from "~/context/TranslateContext"
import { EndpointQuery, PayPlanType } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { getPlanName } from "~/utils/utils"

/* c8 ignore start */
export const links = () => {
  return [
    ...NavLinks(),
    ...AppKeysCardLinks(),
    ...AppAddressCardLinks(),
    ...FeedbackCardLinks(),
    ...StopRemoveAppLinks(),
    ...ModalLinks(),
    ...AppPlanDetailsLinks(),
    ...LegacyBannerCardLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

type AppIdLayoutViewProps = {
  endpoint: EndpointQuery["endpoint"] | null
  searchParams: URLSearchParams
  setSearchParams: typeof URLSearchParams["arguments"]
  subscription: Stripe.Subscription | undefined
  updatePlanFetcher: ReturnType<typeof useFetcher>
}

export default function AppIdLayoutView({
  endpoint,
  searchParams,
  setSearchParams,
  subscription,
  updatePlanFetcher,
}: AppIdLayoutViewProps) {
  const { t } = useTranslate()
  const { flags } = useFeatureFlags()
  const [showSuccessModal, setShowSuccessModel] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModel] = useState<boolean>(false)

  const [routes, setRoutes] = useState([
    {
      to: "/dashboard/apps",
      icon: () => (
        <span>
          <IconCaretLeft className="pokt-icon" />
        </span>
      ),
      end: true,
    },
    {
      to: "",
      label: t.appId.routes.overview,
      end: true,
    },
    {
      to: "requests",
      label: t.appId.routes.requests,
    },
    {
      to: "security",
      label: t.appId.routes.security,
    },
    {
      to: "notifications",
      label: t.appId.routes.notifications,
    },
  ])

  useEffect(() => {
    const success = searchParams.get("success")
    const cancelError = searchParams.get("cancelError")

    if (!success) return
    if (success === "true") {
      // update plan type to paid on success
      if (
        endpoint &&
        updatePlanFetcher.state !== "submitting" &&
        updatePlanFetcher.state !== "loading"
      ) {
        updatePlanFetcher.submit(
          {
            id: endpoint.id,
            type: PayPlanType.PayAsYouGoV0,
          },
          {
            action: "/api/updatePlan",
            method: "post",
          },
        )
      }
      setSearchParams({})
      setShowSuccessModel(true)
    }

    if (success === "false" || cancelError === "true") {
      searchParams.delete("success")
      searchParams.delete("cancelError")
      setShowErrorModel(true)
    }
  }, [searchParams, endpoint, updatePlanFetcher])

  useEffect(() => {
    if (
      flags.STRIPE_PAYMENT === "true" &&
      subscription &&
      endpoint &&
      endpoint.appLimits.planType === PayPlanType.PayAsYouGoV0 &&
      !routes.filter((route) => route.to === "plan")[0]
    ) {
      setRoutes((curr) => [
        ...curr.filter((c) => c.to !== "notifications"),
        {
          to: "plan",
          label: t.appId.routes.plan,
        },
      ])
    }
    if (
      flags.STRIPE_PAYMENT === "true" &&
      endpoint &&
      endpoint.appLimits.planType === PayPlanType.FreetierV0 &&
      routes.filter((route) => route.to === "plan")[0]
    ) {
      setRoutes((curr) => [...curr.filter((route) => route.to !== "plan")])
    }
  }, [endpoint, t, routes, flags.STRIPE_PAYMENT, subscription])

  useEffect(() => {
    // update plan type to free if plan is paid and there subscription is canceled
    if (
      endpoint?.appLimits.planType === PayPlanType.PayAsYouGoV0 &&
      (!subscription || subscription.cancel_at_period_end) &&
      updatePlanFetcher.state !== "submitting" &&
      updatePlanFetcher.state !== "loading"
    ) {
      updatePlanFetcher.submit(
        {
          id: endpoint.id,
          type: PayPlanType.FreetierV0,
        },
        {
          action: "/api/updatePlan",
          method: "post",
        },
      )
    }
  }, [endpoint, subscription, updatePlanFetcher])

  return (
    <div className="pokt-appid-layout-view">
      <Grid gutter={32}>
        <Grid.Col md={8}>
          {endpoint && (
            <Grid.Col xs={12}>
              <div>
                <h1 style={{ marginTop: 0 }}>{endpoint.name}</h1>
                <Nav
                  dropdown
                  appId={endpoint.id}
                  ariaLabel="Application"
                  routes={routes}
                />
              </div>
            </Grid.Col>
          )}
          {endpoint &&
            getPlanName(endpoint.appLimits.planType) === "Legacy" &&
            getRequiredClientEnvVar("FLAG_LEGACY_MESSAGING") === "true" && (
              <LegacyBannerCard />
            )}
          <Outlet />
        </Grid.Col>
        <Grid.Col md={4}>
          {endpoint && (
            <>
              <section>
                <AppPlanDetails
                  dailyLimit={endpoint.appLimits.dailyLimit}
                  id={endpoint.id}
                  name={endpoint.name}
                  planType={endpoint.appLimits.planType}
                  subscription={subscription}
                />
              </section>
              <section>
                <AppKeysCard
                  id={endpoint.id}
                  publicKey={endpoint.apps ? endpoint.apps[0]?.publicKey : ""}
                  secret={endpoint.gatewaySettings.secretKey}
                />
              </section>
              <section>
                <AppAddressCard apps={endpoint.apps} />
              </section>
              <section>
                <FeedbackCard />
              </section>
              <section>
                <StopRemoveApp
                  appId={endpoint.id}
                  apps={endpoint.apps}
                  name={endpoint.name}
                  planType={endpoint.appLimits.planType}
                  subscription={subscription}
                />
              </section>
            </>
          )}
        </Grid.Col>
      </Grid>
      <Modal
        opened={showSuccessModal}
        title="Congratulations!"
        onClose={() => setShowSuccessModel(false)}
      >
        <div>
          <p>
            You have successfully set up a Pay As You Go subscription. You now have access
            to dozens of chains and unlimited relays. We can't wait to see what you build
            with it!
          </p>
        </div>
        <ModalCTA>
          <Button onClick={() => setShowSuccessModel(false)}>Continue To App</Button>
        </ModalCTA>
      </Modal>
      <Modal
        opened={showErrorModal}
        title="Subscription Error"
        onClose={() => setShowErrorModel(false)}
      >
        <div>
          <p>
            We are sorry but something went wrong when setting up your pay as you go
            subscription. Please try again by clicking the "Upgrade to 'Pay As You Go'"
            button. If you are still having trouble reach out and we would be happy to
            help get you sorted.
          </p>
        </div>
        <ModalCTA>
          <Button onClick={() => setShowErrorModel(false)}>Try Again</Button>
        </ModalCTA>
      </Modal>
    </div>
  )
}
