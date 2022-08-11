import { UserLBOriginBucket } from "@pokt-foundation/portal-types"
import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import { AppIdLoaderData } from "../$appId"
import AppRequestsByOriginCard, {
  links as AppRequestsByOriginCardLinks,
} from "~/components/application/AppRequestsByOriginCard"
import AppRequestsErrorsCard, {
  links as AppRequestsErrorsCardLinks,
} from "~/components/application/AppRequestsErrorsCard"
import AppRequestsRateCard, {
  links as AppRequestsRateCardLinks,
} from "~/components/application/AppRequestsRateCard"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import {
  EndpointRpcError,
  getLBErrorMetrics,
  getLBOriginClassification,
} from "~/models/portal.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const meta: MetaFunction = () => {
  return {
    title: "Application Requests - POKT Portal - Pocket Network",
  }
}

export const links = () => {
  return [
    ...AppRequestsRateCardLinks(),
    ...AppRequestsByOriginCardLinks(),
    ...AppRequestsErrorsCardLinks(),
  ]
}

export type AppIdRequestsLoaderData = {
  originClassification: UserLBOriginBucket[] | null
  errorMetrics: EndpointRpcError[] | null
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.appId, "app id not found")

  let originClassification = null
  let errorMetrics = null

  try {
    const originResponse = await getLBOriginClassification(params.appId, request)
    originClassification = originResponse.origin_classification
    errorMetrics = await getLBErrorMetrics(params.appId, request)
  } catch (error) {}

  // const originClassification = await getLBOriginClassification(params.appId, request)
  // const errorMetrics = await getLBErrorMetrics(params.appId, request)

  return json<AppIdRequestsLoaderData>(
    {
      originClassification: originClassification,
      errorMetrics: errorMetrics,
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

export default function AppIdRequests() {
  const { originClassification, errorMetrics } =
    useLoaderData() as AppIdRequestsLoaderData
  const appIdIndexRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const appIdData = appIdIndexRoute?.data as AppIdLoaderData

  useEffect(() => {
    trackEvent(AmplitudeEvents.RequestDetailsView)
  }, [])

  return (
    <>
      {appIdData.relaysToday.Count && appIdData.relaysYesterday.Count && (
        <section>
          <AppRequestsRateCard
            currentRelays={appIdData.relaysToday.Count}
            previousRelays={appIdData.relaysYesterday.Count}
          />
        </section>
      )}
      {appIdData.relaysToday.Count && originClassification && (
        <section>
          <AppRequestsByOriginCard
            totalRelays={appIdData.relaysToday.Count.Total}
            usagePerOrigin={originClassification}
          />
        </section>
      )}
      {errorMetrics && (
        <section>
          <AppRequestsErrorsCard errorMetrics={errorMetrics} />
        </section>
      )}
    </>
  )
}

// export default function AppIdRequests() {
//   useEffect(() => {
//     trackEvent(AmplitudeEvents.RequestDetailsView)
//   }, [])
//   return <></>
// }
