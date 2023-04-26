import { IconCaretLeft, Grid, Button } from "@pokt-foundation/pocket-blocks"
import { FetcherWithComponents, Outlet } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import AddressCard, { links as AddressCardLinks } from "./components/AddressCard"
import KeysCard, { links as KeysCardLinks } from "./components/KeysCard"
import LegacyBannerCard, {
  links as LegacyBannerCardLinks,
} from "./components/LegacyBannerCard"
import MemberRoleCard, { links as MemberRoleCardLinks } from "./components/MemberRoleCard"
import StopRemoveApp, { links as StopRemoveAppLinks } from "./components/StopRemoveApp"
import styles from "./styles.css"
import AppName from "~/components/application/AppName"
import AppPlanDetails, {
  links as AppPlanDetailsLinks,
} from "~/components/application/AppPlanDetails"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import Modal, { links as ModalLinks, ModalCTA } from "~/components/Modal"
import Nav, { links as NavLinks } from "~/components/Nav"
import { useFeatureFlags } from "~/context/FeatureFlagContext"
import { useTranslate } from "~/context/TranslateContext"
import { EndpointQuery, PayPlanType, RoleName } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { getPlanName } from "~/utils/utils"

/* c8 ignore start */
export const links = () => {
  return [
    ...NavLinks(),
    ...KeysCardLinks(),
    ...AddressCardLinks(),
    ...FeedbackCardLinks(),
    ...StopRemoveAppLinks(),
    ...ModalLinks(),
    ...AppPlanDetailsLinks(),
    ...LegacyBannerCardLinks(),
    ...MemberRoleCardLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

type AppIdLayoutViewProps = {
  endpoint: EndpointQuery["endpoint"] | null
  searchParams: URLSearchParams
  setSearchParams: (typeof URLSearchParams)["arguments"]
  subscription: Stripe.Subscription | undefined
  updatePlanFetcher: FetcherWithComponents<any>
  user: Auth0Profile
  children: React.ReactNode
}

export default function AppIdLayoutView({
  endpoint,
  searchParams,
  setSearchParams,
  subscription,
  updatePlanFetcher,
  user,
  children,
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
    {
      to: "team",
      label: t.appId.routes.team,
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
            action: `/api/${endpoint.id}/updatePlan`,
            method: "post",
          },
        )
      }
      trackEvent(AmplitudeEvents.NewSubscription)
      setSearchParams({})
      setShowSuccessModel(true)
    }

    if (success === "false" || cancelError === "true") {
      searchParams.delete("success")
      searchParams.delete("cancelError")
      setShowErrorModel(true)
    }
  }, [searchParams, endpoint, updatePlanFetcher, setSearchParams])

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
          action: `/api/${endpoint.id}/updatePlan`,
          method: "post",
        },
      )
    }
  }, [endpoint, subscription, updatePlanFetcher])

  const role = endpoint?.users.find((u) => u.email === user._json?.email)?.roleName
  const isMember = role === RoleName.Member
  const isAdmin = role === RoleName.Admin

  return (
    <div className="pokt-appid-layout-view">
      <Grid gutter={32}>
        <Grid.Col md={8}>
          {endpoint && (
            <Grid.Col xs={12}>
              <div>
                <AppName id={endpoint.id} name={endpoint.name} />
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
          {children}
        </Grid.Col>
        <Grid.Col md={4}>
          {endpoint && (
            <>
              <section>
                <AppPlanDetails
                  dailyLimit={endpoint.appLimits.dailyLimit}
                  id={endpoint.id}
                  isMember={isMember}
                  name={endpoint.name}
                  planType={endpoint.appLimits.planType}
                  subscription={subscription}
                />
              </section>
              {role && (
                <section>
                  <MemberRoleCard role={role} />
                </section>
              )}
              <section>
                <KeysCard
                  id={endpoint.id}
                  isMember={isMember}
                  publicKey={endpoint.apps ? endpoint.apps[0]?.publicKey : ""}
                  secret={endpoint.gatewaySettings.secretKey}
                />
              </section>
              <section>
                <AddressCard apps={endpoint.apps} />
              </section>
              <section>
                <FeedbackCard />
              </section>
              <section>
                <StopRemoveApp
                  appId={endpoint.id}
                  apps={endpoint.apps}
                  isAdmin={isAdmin}
                  isMember={isMember}
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
