import { UserLBOriginBucket } from "@pokt-foundation/portal-types"
import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import { AppIdLoaderData } from "../dashboard.apps.$appId/route"
import styles from "./styles.css"
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
import { ErrorMetric, getErrorMetrics } from "~/models/errormetrics/errormetrics.server"
// import { getLBOriginClassification } from "~/models/portal.server"
import { initPortalClient } from "~/models/portal/portal.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { requireUser } from "~/utils/session.server"

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
    {
      rel: "stylesheet",
      href: styles,
    },
  ]
}

export type AppIdRequestsLoaderData = {
  originClassification: UserLBOriginBucket[] | null
  errorMetrics: ErrorMetric[] | null
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.appId, "app id not found")
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)

  let originClassification = null
  let errorMetrics = null

  try {
    const { endpoint } = await portal.endpoint({
      endpointID: params.appId,
    })

    const publicKeys = endpoint.apps?.map((app) => app.publicKey)
    if (!publicKeys) {
      throw new Error("no public keys")
    }

    errorMetrics = await getErrorMetrics(publicKeys)
    // const originResponse = await getLBOriginClassification(params.appId, request)
    // originClassification = originResponse.origin_classification
  } catch (error) {}

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
      <section>
        <AppRequestsErrorsCard errorMetrics={errorMetrics} />
      </section>
    </>
  )
}
