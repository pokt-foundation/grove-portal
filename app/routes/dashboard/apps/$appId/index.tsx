import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
/*import {
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
} from "~/models/portal.server" */
import { getLBHourlyLatency, getLBPSessionRelays } from "~/models/portal.server"
/*import {
  UserLBDailyRelaysResponse,
  UserLBHistoricalLatencyResponse,
  UserLBSessionRelaysResponse,
  UserLBTotalSuccessfulRelaysResponse,
  UserLBOnChainDataResponse,
  UserLBTotalRelaysResponse,
} from "@pokt-foundation/portal-types" */
import {
  UserLBHistoricalLatencyResponse,
  UserLBSessionRelaysResponse,
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

export const meta: MetaFunction = () => {
  return {
    title: "Application Details",
  }
}

export type AppIdIndexLoaderData = {
  // dailyRelays: UserLBDailyRelaysResponse
  hourlyLatency: UserLBHistoricalLatencyResponse
  // status: UserLBOnChainDataResponse
  sessionRelays: UserLBSessionRelaysResponse
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.appId, "app id not found")
  const id = params.appId

  // const dailyRelays = await getLBDailyRelays(id, request)
  const hourlyLatency = await getLBHourlyLatency(id, request)
  // const status = await getLBStatus(id, request)
  const sessionRelays = await getLBPSessionRelays(id, request)

  return json<AppIdIndexLoaderData>(
    {
      // dailyRelays,
      hourlyLatency,
      // status,
      sessionRelays,
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
  const data = useLoaderData() as AppIdIndexLoaderData
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
