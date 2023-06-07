import { LoaderFunction, MetaFunction, json, redirect } from "@remix-run/node"
import {
  Outlet,
  useCatch,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import invariant from "tiny-invariant"
import AppIdLayoutView, { links as AppIdLayoutViewLinks } from "./view"
import { initPortalClient } from "~/models/portal/portal.server"
import { BlockchainsQuery, EndpointQuery, PayPlanType } from "~/models/portal/sdk"
import {
  getRelays,
  getRelaysPerPeriod,
  RelayMetric,
} from "~/models/relaymeter/relaymeter.server"
import { getSubscription, Stripe } from "~/models/stripe/stripe.server"
import { getErrorMessage } from "~/utils/catchError"
import { dayjs } from "~/utils/dayjs"
import { getPoktId, requireUser } from "~/utils/session.server"

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
  dailyNetworkRelaysPerMonth: RelayMetric[]
  dailyNetworkRelaysPer2Weeks: RelayMetric[]
  dailyNetworkRelaysPerWeek: RelayMetric[]
  subscription: Stripe.Subscription | undefined
  user: Auth0Profile
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  invariant(params.appId, "app id not found")

  const user = await requireUser(request)
  invariant(user.profile.id && user.profile.emails, "user not found")
  const userId = getPoktId(user.profile.id)
  const portal = initPortalClient(user.accessToken)

  if (searchParams.get("success") === "true") {
    try {
      const form = new FormData()
      form.append("id", params.appId)
      form.append("type", PayPlanType.PayAsYouGoV0)

      await fetch(url.origin + `/api/${params.appId}/updatePlan`, {
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

  const uEmail = user?.profile?._json?.email ?? ""
  const subscription = await getSubscription(uEmail, endpoint.id, userId)

  const dailyNetworkRelaysPerWeek = await getRelaysPerPeriod("endpoints", 7, endpoint.id)
  const dailyNetworkRelaysPer2Weeks = await getRelaysPerPeriod(
    "endpoints",
    14,
    endpoint.id,
  )
  const dailyNetworkRelaysPerMonth = await getRelaysPerPeriod(
    "endpoints",
    30,
    endpoint.id,
  )
  const { blockchains } = await portal.blockchains({ active: true })

  // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
  const today = dayjs().utc().format()
  const yesterday = dayjs().utc().subtract(1, "day").format()
  const relaysToday = await getRelays("endpoints", today, today, endpoint.id)
  const relaysYesterday = await getRelays("endpoints", yesterday, yesterday, endpoint.id)

  return json<AppIdLoaderData>({
    blockchains,
    endpoint,
    dailyNetworkRelaysPerMonth,
    dailyNetworkRelaysPer2Weeks,
    dailyNetworkRelaysPerWeek,
    relaysToday,
    relaysYesterday,
    subscription,
    user: user.profile,
  })
}

export type AppIdOutletContext = AppIdLoaderData

export default function AppIdLayout() {
  const {
    blockchains,
    endpoint,
    subscription,
    user,
    relaysToday,
    relaysYesterday,
    dailyNetworkRelaysPerMonth,
    dailyNetworkRelaysPer2Weeks,
    dailyNetworkRelaysPerWeek,
  } = useLoaderData() as AppIdLoaderData
  const [searchParams, setSearchParams] = useSearchParams()
  const updatePlanFetcher = useFetcher()

  return (
    <AppIdLayoutView
      endpoint={endpoint}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      subscription={subscription}
      updatePlanFetcher={updatePlanFetcher}
      user={user}
    >
      <Outlet
        context={{
          blockchains,
          endpoint,
          relaysToday,
          relaysYesterday,
          dailyNetworkRelaysPerMonth,
          dailyNetworkRelaysPer2Weeks,
          dailyNetworkRelaysPerWeek,
          subscription,
          user,
        }}
      />
    </AppIdLayoutView>
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
