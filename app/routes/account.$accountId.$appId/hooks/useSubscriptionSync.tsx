import { showNotification, updateNotification } from "@mantine/notifications"
import { useFetcher } from "@remix-run/react"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { LuCheck } from "react-icons/lu"
import { type Route } from "~/components/Nav"
import { useFeatureFlags } from "~/context/FeatureFlagContext"
import { EndpointQuery, PayPlanType, RoleName } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

type UseSubscriptionSync = {
  routes: Route[]
  userRole: RoleName | null
  endpoint: EndpointQuery["endpoint"] | null
  setRoutes: Dispatch<SetStateAction<Route[]>>
  subscription: Stripe.Subscription | undefined
  searchParams: URLSearchParams
  setSearchParams: (typeof URLSearchParams)["arguments"]
  setShowSuccessModel: (val: boolean) => void
  setShowErrorModel: Dispatch<SetStateAction<boolean>>
}

type UpdatePlanTypeArgs = {
  endpointId: string
  planType: PayPlanType
}

const useSubscriptionSync = ({
  routes,
  userRole,
  endpoint,
  setRoutes,
  subscription,
  searchParams,
  setSearchParams,
  setShowErrorModel,
}: UseSubscriptionSync) => {
  const { flags } = useFeatureFlags()
  const updatePlanFetcher = useFetcher()

  const updatePlanType = ({ endpointId, planType }: UpdatePlanTypeArgs) => {
    updatePlanFetcher.submit(
      {
        id: endpointId,
        type: planType,
      },
      {
        action: `/api/admin/update-plan`,
        method: "post",
      },
    )
  }

  const updatePlanTypeRef = useRef(updatePlanType)

  useEffect(() => {
    const success = searchParams.get("success")
    const cancelError = searchParams.get("cancelError")

    if (success === "true") {
      // Update plan type to paid on success and show loading notification
      if (
        endpoint &&
        endpoint.appLimits.planType !== PayPlanType.PayAsYouGoV0 &&
        updatePlanFetcher.state !== "submitting" &&
        updatePlanFetcher.state !== "loading"
      ) {
        showNotification({
          id: "auto-scale-notification",
          message: "Upgrading app to Auto-Scale",
          loading: true,
          autoClose: false,
          disallowClose: true,
        })
        updatePlanTypeRef.current({
          endpointId: endpoint.id,
          planType: PayPlanType.PayAsYouGoV0,
        })
      }

      // Show success notification and clear url params
      if (
        endpoint &&
        endpoint.appLimits.planType === PayPlanType.PayAsYouGoV0 &&
        updatePlanFetcher.state !== "submitting" &&
        updatePlanFetcher.state !== "loading"
      ) {
        updateNotification({
          id: "auto-scale-notification",
          message: "App upgraded to Auto-scale",
          color: "green",
          icon: <LuCheck size={18} />,
        })
        trackEvent(AmplitudeEvents.NewSubscription)
        setSearchParams({})
      }
    }

    if (success === "false" || cancelError === "true") {
      searchParams.delete("success")
      searchParams.delete("cancelError")
      setShowErrorModel(true)
    }
  }, [searchParams, endpoint, updatePlanFetcher, setSearchParams, setShowErrorModel])

  useEffect(() => {
    // Update plan type to free if plan is paid and their subscription is canceled
    if (
      endpoint?.appLimits.planType === PayPlanType.PayAsYouGoV0 &&
      userRole === RoleName.Owner &&
      (!subscription || subscription.cancel_at_period_end) &&
      updatePlanFetcher.state !== "submitting" &&
      updatePlanFetcher.state !== "loading"
    ) {
      updatePlanTypeRef.current({
        endpointId: endpoint.id,
        planType: PayPlanType.FreetierV0,
      })
    }
  }, [endpoint, subscription, updatePlanFetcher, userRole])

  useEffect(() => {
    // Update plan type to paid if plan is free and there is a subscription
    if (
      endpoint?.appLimits.planType === PayPlanType.FreetierV0 &&
      subscription &&
      !subscription.cancel_at_period_end &&
      updatePlanFetcher.state !== "submitting" &&
      updatePlanFetcher.state !== "loading"
    ) {
      updatePlanTypeRef.current({
        endpointId: endpoint.id,
        planType: PayPlanType.PayAsYouGoV0,
      })
    }
  }, [endpoint, subscription, updatePlanFetcher])

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
          label: "Plan",
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
  }, [endpoint, routes, flags.STRIPE_PAYMENT, subscription, setRoutes])
}

export default useSubscriptionSync