import { LoaderFunction, MetaFunction, json, redirect } from "@remix-run/node"
import { useCatch, useFetcher, useLoaderData, useSearchParams } from "@remix-run/react"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { BlockchainsQuery, EndpointQuery, PayPlanType } from "~/models/portal/sdk"
import {
  getRelays,
  getRelaysPerWeek,
  RelayMetric,
} from "~/models/relaymeter/relaymeter.server"
import { getSubscription, Stripe } from "~/models/stripe/stripe.server"
import { getErrorMessage } from "~/utils/catchError"
import { dayjs } from "~/utils/dayjs"
import { getPoktId, requireUser } from "~/utils/session.server"
import AppIdLayoutView, {
  links as AppIdLayoutViewLinks,
} from "~/views/dashboard/apps/appId/layout/appIdLayoutView"

export const links = () => {
  return [...AppIdLayoutViewLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Application Overview",
  }
}

export type AppIdLoaderData = {
  blockchains: BlockchainsQuery["blockchains"]
  endpoint: EndpointQuery["endpoint"]
  relaysToday: RelayMetric
  relaysYesterday: RelayMetric
  dailyNetworkRelaysPerWeek: RelayMetric[]
  subscription: Stripe.Subscription | undefined
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  invariant(params.appId, "app id not found")

  const user = await requireUser(request)
  const userId = await getPoktId(user.profile.id)
  const portal = initPortalClient(user.accessToken)

  if (searchParams.get("success") === "true") {
    try {
      const form = new FormData()
      form.append("id", params.appId)
      form.append("type", PayPlanType.PayAsYouGoV0)

      await fetch(url.origin + "/api/updatePlan", {
        method: "POST",
        body: form,
      })
    } catch (e) {}
  }

  let endpointError = false
  let endpointErrorMessage = ""

  const endpointRes = await portal
    .endpoint({
      endpointID: params.appId,
    })
    .catch((error) => {
      endpointError = true
      endpointErrorMessage = getErrorMessage(error.response.errors[0].message)
    })

  if (endpointError) {
    return redirect(`/dashboard/apps?error=true&message=${endpointErrorMessage}`)
  }

  const endpoint = endpointRes?.endpoint
  invariant(endpoint, "app id not found")

  const subscription = await getSubscription(
    user.profile.emails[0].value,
    endpoint.id,
    userId,
  )

  const dailyNetworkRelaysPerWeek = await getRelaysPerWeek("endpoints", endpoint.id)
  const { blockchains } = await portal.blockchains()

  // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
  const today = dayjs().utc().format()
  const yesterday = dayjs().utc().subtract(1, "day").format()
  const relaysToday = await getRelays("endpoints", today, today, endpoint.id)
  const relaysYesterday = await getRelays("endpoints", yesterday, yesterday, endpoint.id)

  return json<AppIdLoaderData>({
    blockchains,
    endpoint,
    dailyNetworkRelaysPerWeek,
    relaysToday,
    relaysYesterday,
    subscription,
  })
}

export default function AppIdLayout() {
  const { endpoint, subscription } = useLoaderData() as AppIdLoaderData
  const [searchParams, setSearchParams] = useSearchParams()
  const updatePlanFetcher = useFetcher()

  return (
    <AppIdLayoutView
      endpoint={endpoint}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      subscription={subscription}
      updatePlanFetcher={updatePlanFetcher}
    />
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>App Catch Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>App Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
