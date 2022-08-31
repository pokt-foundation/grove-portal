import { Outlet, useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
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
import StopRemoveApp, {
  links as StopRemoveAppLinks,
} from "~/components/application/StopRemoveApp"
import Grid from "~/components/shared/Grid"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { useFeatureFlags } from "~/context/FeatureFlagContext"
import { useTranslate } from "~/context/TranslateContext"
import { EndpointQuery, PayPlanType } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"

/* c8 ignore start */
export const links = () => {
  return [
    ...NavLinks(),
    ...AppKeysCardLinks(),
    ...AppAddressCardLinks(),
    ...AdEconomicsForDevsLinks(),
    ...FeedbackCardLinks(),
    ...StopRemoveAppLinks(),
    ...ModalLinks(),
    ...AppPlanDetailsLinks(),
  ]
}
/* c8 ignore stop */

type AppIdLayoutViewProps = {
  endpoint: EndpointQuery["endpoint"] | null
  searchParams: URLSearchParams
  subscription: Stripe.Subscription | undefined
}

export default function AppIdLayoutView({
  endpoint,
  searchParams,
  subscription,
}: AppIdLayoutViewProps) {
  const { t } = useTranslate()
  const { flags } = useFeatureFlags()
  const [showSuccessModal, setShowSuccessModel] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModel] = useState<boolean>(false)
  const [routes, setRoutes] = useState([
    {
      to: "/dashboard/apps",
      icon: () => <span>{"<"}</span>,
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
      setShowSuccessModel(true)
    }
    if (success === "false" || cancelError === "true") {
      setShowErrorModel(true)
    }
  }, [searchParams])

  useEffect(() => {
    if (
      flags.STRIPE_PAYMENT === "true" &&
      endpoint &&
      endpoint.appLimits.planType === PayPlanType.PayAsYouGoV0 &&
      !routes.filter((route) => route.to === "plan")[0]
    ) {
      setRoutes((curr) => [
        ...curr,
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
  }, [endpoint, t, routes, flags.STRIPE_PAYMENT])

  return (
    <>
      <Grid gutter={32}>
        <Grid.Col md={8}>
          {endpoint && (
            <Grid.Col xs={12}>
              <div>
                <h1 style={{ marginTop: 0 }}>{endpoint.name}</h1>
                <Nav routes={routes} />
              </div>
            </Grid.Col>
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
                <AdEconomicsForDevs />
              </section>
              <section>
                <FeedbackCard />
              </section>
              <section>
                <StopRemoveApp
                  endpointId={endpoint.id}
                  planType={endpoint.appLimits.planType}
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
            You have successfully set up a pay as you go subscription. You now have access
            to 50+ chains and unlimited relays. We can't wait to see what you build with
            it!
          </p>
        </div>
      </Modal>
      <Modal
        opened={showErrorModal}
        title="Subscription Error"
        onClose={() => setShowErrorModel(false)}
      >
        <div>
          <p>
            We are sorry but something went wrong when setting up your pay as you go
            subscription. Please try again. If you are still having trouble reach out and
            we would be happy to help get you sorted.
          </p>
        </div>
      </Modal>
    </>
  )
}
