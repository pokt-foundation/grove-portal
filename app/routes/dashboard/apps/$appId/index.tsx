import { json, LoaderFunction } from "@remix-run/node"
import { useLoaderData, useMatches } from "@remix-run/react"
import {
  getLBDailyRelays,
  getLBHourlyLatency,
  getLBOriginClassification,
  getLBPreviousSuccessfulRelays,
  getLBPreviousTotalRelays,
  getLBPSessionRelays,
  getLBPSuccessfulRelays,
  getLBUserApplications,
  UserLB,
} from "~/models/portal.server"
import {
  UserLBDailyRelaysResponse,
  UserLBHistoricalLatencyResponse,
  UserLBOriginBucket,
  UserLBPreviousTotalSuccessfulRelaysResponse,
  UserLBPreviousTotalRelaysResponse,
  UserLBSessionRelaysResponse,
  UserLBTotalSuccessfulRelaysResponse,
} from "@pokt-foundation/portal-types"
import invariant from "tiny-invariant"
import AppEndpointCard, {
  links as AppEndpointCardLinks,
} from "~/components/application/AppEndpointCard"
import AppLatencyCard, {
  links as AppLatencyCardLinks,
} from "~/components/application/AppLatencyCard"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"

export const links = () => {
  return [...AppEndpointCardLinks(), ...AppLatencyCardLinks()]
}

type LoaderData = {
  // dailyRelays: UserLBDailyRelaysResponse[]
  hourlyLatency: UserLBHistoricalLatencyResponse
  // originClassification: UserLBOriginBucket[]
  // previousSeccessfulRelays: UserLBPreviousTotalSuccessfulRelaysResponse[]
  // previousTotalRelays: UserLBPreviousTotalRelaysResponse[]
  // sessionRelays: UserLBSessionRelaysResponse[]
  // successfulRelays: UserLBTotalSuccessfulRelaysResponse[]
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.appId, "app id not found")
  const id = params.appId

  // const dailyRelays = await getLBDailyRelays(params.id, request)
  const hourlyLatency = await getLBHourlyLatency(id, request)
  // const originClassification = await getLBOriginClassification(params.id, request)
  // const previousSeccessfulRelays = await getLBPreviousSuccessfulRelays(params.id, request)
  // const previousTotalRelays = await getLBPreviousTotalRelays(params.id, request)
  // const sessionRelays = await getLBPSessionRelays(params.id, request)
  // const successfulRelays = await getLBPSuccessfulRelays(params.id, request)

  return json<LoaderData>(
    {
      // dailyRelays,
      hourlyLatency,
      // originClassification,
      // previousSeccessfulRelays,
      // previousTotalRelays,
      // sessionRelays,
      // successfulRelays,
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

export const Application = () => {
  const data = useLoaderData() as LoaderData
  const appIdRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  return (
    <>
      {appIdRoute?.data.app && (
        <section>
          <AppEndpointCard app={appIdRoute.data.app} />
        </section>
      )}
      <section>
        <AppLatencyCard hourlyLatency={data.hourlyLatency.hourly_latency} />
      </section>
    </>
  )
}

export default Application
