import { LoaderFunction, MetaFunction, json } from "@remix-run/node"
import { Outlet, useCatch, useLoaderData, useSearchParams } from "@remix-run/react"
import { useEffect, useState } from "react"
import invariant from "tiny-invariant"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import AppAddressCard, {
  links as AppAddressCardLinks,
} from "~/components/application/AppAddressCard"
import AppKeysCard, {
  links as AppKeysCardLinks,
} from "~/components/application/AppKeysCard"
import AppRemoveModal, {
  links as AppRemoveModalLinks,
} from "~/components/application/AppRemoveModal"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import Grid from "~/components/shared/Grid"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import Nav, { links as NavLinks } from "~/components/shared/Nav"
import { useTranslate } from "~/context/TranslateContext"
import { initPortalClient } from "~/models/portal/portal.server"
import { ProcessedEndpoint } from "~/models/portal/sdk"
import { getRelays, RelayMetric } from "~/models/relaymeter.server"
import { stripe, Stripe } from "~/models/stripe.server"
import { dayjs } from "~/utils/dayjs"
import { requireUser } from "~/utils/session.server"
import AppIdLayoutView from "~/views/dashboard/apps/appId/layout/appIdLayoutView"

export const links = () => {
  return [
    ...NavLinks(),
    ...AppKeysCardLinks(),
    ...AppAddressCardLinks(),
    ...AdEconomicsForDevsLinks(),
    ...FeedbackCardLinks(),
    ...AppRemoveModalLinks(),
    ...ModalLinks(),
  ]
}

export const meta: MetaFunction = () => {
  return {
    title: "Application Overview",
  }
}

export type AppIdLoaderData = {
  endpoint: ProcessedEndpoint
  relaysToday: RelayMetric
  relaysYesterday: RelayMetric
  dailyNetworkRelaysPerWeek: RelayMetric[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.appId, "app id not found")
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const { endpoint } = await portal.endpoint({
    endpointID: params.appId,
  })
  invariant(endpoint, "app id not found")

  const dailyNetworkRelaysPerWeek = await Promise.all(
    [0, 1, 2, 3, 4, 5, 6].map(async (num) => {
      const day = dayjs()
        .utc()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .subtract(num, "day")
        .format()

      // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
      return await getRelays("endpoints", day, day, endpoint.id)
    }),
  )

  // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
  const today = dayjs().utc().format()
  const yesterday = dayjs().utc().subtract(1, "day").format()
  const relaysToday = await getRelays("endpoints", today, today, endpoint.id)
  const relaysYesterday = await getRelays("endpoints", yesterday, yesterday, endpoint.id)

  return json<AppIdLoaderData>(
    {
      endpoint,
      dailyNetworkRelaysPerWeek,
      relaysToday,
      relaysYesterday,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

export default function AppIdLayout() {
  const { endpoint } = useLoaderData() as AppIdLoaderData
  const [searchParams] = useSearchParams()

  return <AppIdLayoutView endpoint={endpoint} searchParams={searchParams} />
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
