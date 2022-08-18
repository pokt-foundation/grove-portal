import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import { AppIdLoaderData } from "../$appId"
import Card, { links as CardLinks } from "~/components/shared/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { initPortalClient } from "~/models/portal/portal.server"
import { Stripe, stripe } from "~/models/stripe.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"
import { requireUser } from "~/utils/session.server"

export const links = () => {
  return [...CardLinks(), ...CardListLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Application Plan Details",
  }
}

type AppPlanLoaderData =
  | {
      error: false
      subscription: Stripe.Subscription
    }
  | {
      error: true
      message: string
    }

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.appId, "app id not found")
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const { endpoint } = await portal.endpoint({
    endpointID: params.appId,
  })
  const customer = await stripe.customers.list({
    email: user.profile.emails[0].value,
  })

  let subscription: Stripe.Subscription | null = null

  if (customer) {
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.data[0].id,
    })
    subscriptions.data.map((sub) => {
      if (sub.metadata.endpoint_id && sub.metadata.endpoint_id === endpoint.id) {
        subscription = sub
      }
    })

    if (subscription) {
      return json({
        error: false,
        subscription,
      })
    }
  }

  return json({
    error: true,
    message: "Stripe portal session was not established",
  })
}

export const AppPlanDetails = () => {
  const data = useLoaderData() as AppPlanLoaderData
  const appIdRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const { endpoint } = appIdRoute?.data as AppIdLoaderData

  useEffect(() => {
    trackEvent(AmplitudeEvents.AppPlanDetailsView)
  }, [])

  const items: CardListItem[] = [
    {
      label: "Total Relays on this Billing Period",
      value: 12335235,
    },
  ]

  return (
    <>
      {!data.error && (
        <Card>
          <div className="pokt-card-header">
            <h3>Application Plan</h3>
          </div>
          <div>
            <CardList items={items} />
            {data.subscription.id}
          </div>
        </Card>
      )}
    </>
  )
}

export default AppPlanDetails
