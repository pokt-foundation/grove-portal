import { UserLBOriginBucket } from "@pokt-foundation/portal-types"
import { LoaderFunction, MetaFunction, json } from "@remix-run/node"
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
  originClassification: UserLBOriginBucket[]
  errorMetrics: EndpointRpcError[]
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.appId, "app id not found")

  const originClassification = await getLBOriginClassification(params.appId, request)
  const errorMetrics = await getLBErrorMetrics(params.appId, request)

  return json<AppIdRequestsLoaderData>(
    {
      originClassification: originClassification.origin_classification,
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
      {appIdData.previousSeccessfulRelays &&
        appIdData.previousTotalRelays &&
        appIdData.successfulRelays &&
        appIdData.totalRelays && (
          <section>
            <AppRequestsRateCard
              previousRelays={appIdData.previousTotalRelays.total_relays}
              previousSuccessfulRelays={
                appIdData.previousSeccessfulRelays.successful_relays
              }
              successfulRelays={appIdData.successfulRelays.successful_relays}
              totalRelays={appIdData.totalRelays.total_relays}
            />
          </section>
        )}
      {appIdData.totalRelays && originClassification && (
        <section>
          <AppRequestsByOriginCard
            totalRelays={appIdData.totalRelays.total_relays}
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
