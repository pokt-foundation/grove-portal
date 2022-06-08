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
  getLBStatus,
  getLBTotalRelays,
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
  UserLBOnChainDataResponse,
  UserLBTotalRelaysResponse,
} from "@pokt-foundation/portal-types"
import invariant from "tiny-invariant"
import AppEndpointCard, {
  links as AppEndpointCardLinks,
} from "~/components/application/AppEndpointCard"
import AppLatencyCard, {
  links as AppLatencyCardLinks,
} from "~/components/application/AppLatencyCard"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import AppUsageOverTimeCard, {
  links as AppUsageOverTimeCardLinks,
} from "~/components/application/AppUsageOverTimeCard"
import { AppIdLoaderData } from "../$appId"
import AppUsageCurrentCard, {
  links as AppUsageCurrentCardLinks,
} from "~/components/application/AppUsageCurrentCard"
import Grid from "~/components/shared/Grid"
import AppRequestsRateCard, {
  links as AppRequestsRateCardLinks,
} from "~/components/application/AppRequestsRateCard"

export const links = () => {
  return [
    ...AppEndpointCardLinks(),
    ...AppLatencyCardLinks(),
    ...AppUsageOverTimeCardLinks(),
    ...AppUsageCurrentCardLinks(),
    ...AppRequestsRateCardLinks(),
  ]
}

type LoaderData = {
  // dailyRelays: UserLBDailyRelaysResponse
  hourlyLatency: UserLBHistoricalLatencyResponse
  // status: UserLBOnChainDataResponse
  // originClassification: UserLBOriginBucket[]
  previousSeccessfulRelays: UserLBPreviousTotalSuccessfulRelaysResponse
  previousTotalRelays: UserLBPreviousTotalRelaysResponse
  sessionRelays: UserLBSessionRelaysResponse
  successfulRelays: UserLBTotalSuccessfulRelaysResponse
  totalRelays: UserLBTotalRelaysResponse
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.appId, "app id not found")
  const id = params.appId

  // const dailyRelays = await getLBDailyRelays(id, request)
  const hourlyLatency = await getLBHourlyLatency(id, request)
  // const status = await getLBStatus(id, request)
  // const originClassification = await getLBOriginClassification(params.id, request)
  const previousSeccessfulRelays = await getLBPreviousSuccessfulRelays(id, request)
  const previousTotalRelays = await getLBPreviousTotalRelays(id, request)
  const sessionRelays = await getLBPSessionRelays(id, request)
  const successfulRelays = await getLBPSuccessfulRelays(id, request)
  const totalRelays = await getLBTotalRelays(id, request)

  return json<LoaderData>(
    {
      // dailyRelays,
      hourlyLatency,
      // status,
      // originClassification,
      previousSeccessfulRelays,
      previousTotalRelays,
      sessionRelays,
      successfulRelays,
      totalRelays,
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
  const appIdData = appIdRoute?.data as AppIdLoaderData
  return (
    <>
      {appIdData.app && (
        <section>
          <AppEndpointCard app={appIdData.app} />
        </section>
      )}
      <Grid gutter={32}>
        <Grid.Col sm={6}>
          {appIdData.maxDailyRelays && data.sessionRelays && (
            <section>
              <AppUsageCurrentCard
                maxDailyRelays={appIdData.maxDailyRelays}
                sessionRelays={data.sessionRelays.session_relays}
              />
            </section>
          )}
        </Grid.Col>
        <Grid.Col sm={6}>
          {data.previousSeccessfulRelays &&
            data.previousTotalRelays &&
            data.successfulRelays &&
            data.totalRelays && (
              <section>
                <AppRequestsRateCard
                  previousRelays={data.previousTotalRelays.total_relays}
                  previousSuccessfulRelays={
                    data.previousSeccessfulRelays.successful_relays
                  }
                  successfulRelays={data.successfulRelays.successful_relays}
                  totalRelays={data.totalRelays.total_relays}
                />
              </section>
            )}
        </Grid.Col>
      </Grid>
      {data.hourlyLatency && (
        <section>
          <AppLatencyCard hourlyLatency={data.hourlyLatency.hourly_latency} />
        </section>
      )}
      {appIdData.dailyRelays && appIdData.maxDailyRelays && (
        <section>
          <AppUsageOverTimeCard
            dailyRelays={appIdData.dailyRelays.daily_relays}
            maxDailyRelays={appIdData.maxDailyRelays}
          />
        </section>
      )}
    </>
  )
}

export default Application
