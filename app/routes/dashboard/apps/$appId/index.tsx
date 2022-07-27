import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { SESSIONS_PER_DAY } from "~/utils/pocketUtils"
import {
  // getLBDailyRelays,
  getLBHourlyLatency,
  // getLBOriginClassification,
  // getLBPreviousSuccessfulRelays,
  // getLBPreviousTotalRelays,
  getLBSessionRelays,
  // getLBSuccessfulRelays,
  // getLBStatus,
  getLBTotalRelays,
  // getLBUserApplications,
  // UserLB,
} from "~/models/portal.server"
import {
  // UserLBDailyRelaysResponse,
  UserLBHistoricalLatencyResponse,
  UserLBSessionRelaysResponse,
  // UserLBTotalSuccessfulRelaysResponse,
  // UserLBOnChainDataResponse,
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
import { useMemo } from "react"
import AppOverLimitCard, {
  links as AppOverLimitCardLinks,
} from "~/components/application/AppOverSessionLimitCard/AppOverSessionLimitCard"

export const links = () => {
  return [
    ...AppEndpointCardLinks(),
    ...AppLatencyCardLinks(),
    ...AppUsageOverTimeCardLinks(),
    ...AppUsageCurrentCardLinks(),
    ...AppRequestsRateCardLinks(),
    ...AppOverLimitCardLinks(),
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
  totalRelays: UserLBTotalRelaysResponse
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.appId, "app id not found")
  const id = params.appId

  // const dailyRelays = await getLBDailyRelays(id, request)
  // const status = await getLBStatus(id, request)

  const hourlyLatency = await getLBHourlyLatency(id, request)
  const sessionRelays = await getLBSessionRelays(id, request)
  const totalRelays = await getLBTotalRelays(id, request)

  return json<AppIdIndexLoaderData>(
    {
      // dailyRelays,
      // status,
      hourlyLatency,
      sessionRelays,
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
  const data = useLoaderData() as AppIdIndexLoaderData
  const appIdRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const appIdData = appIdRoute?.data as AppIdLoaderData

  const exceedsMaxRelays = useMemo(() => {
    return data.totalRelays.total_relays >= appIdData.maxDailyRelays
  }, [appIdData.maxDailyRelays, data.totalRelays.total_relays])

  const exceedsSessionRelays = useMemo(() => {
    return (
      data.sessionRelays.session_relays >= appIdData.maxDailyRelays / SESSIONS_PER_DAY
    )
  }, [data.sessionRelays.session_relays, appIdData.maxDailyRelays])

  return (
    <>
      {(exceedsMaxRelays || exceedsSessionRelays) && (
        <AppOverLimitCard
          exceedsMaxRelays={exceedsMaxRelays}
          exceedsSessionRelays={exceedsSessionRelays}
        />
      )}
      {appIdData.app && (
        <section>
          <AppEndpointCard app={appIdData.app} />
        </section>
      )}
      <Grid gutter={32}>
        <Grid.Col sm={6}>
          {appIdData.maxDailyRelays && data.sessionRelays && data.totalRelays && (
            <section>
              <AppUsageCurrentCard
                maxDailyRelays={appIdData.maxDailyRelays}
                totalRelays={data.totalRelays.total_relays}
                sessionRelays={data.sessionRelays.session_relays}
              />
            </section>
          )}
        </Grid.Col>
        <Grid.Col sm={6}>
          {appIdData.relaysYesterday && appIdData.relaysToday && (
            <section>
              <AppRequestsRateCard
                previousRelays={
                  appIdData.relaysYesterday.Count.Success +
                  appIdData.relaysYesterday.Count.Failure
                }
                previousSuccessfulRelays={appIdData.relaysYesterday.Count.Success}
                successfulRelays={appIdData.relaysToday.Count.Success}
                totalRelays={
                  appIdData.relaysToday.Count.Success +
                  appIdData.relaysToday.Count.Failure
                }
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
      {appIdData.dailyRelaysPerWeek && appIdData.maxDailyRelays && (
        <section>
          <AppUsageOverTimeCard
            dailyRelays={appIdData.dailyRelaysPerWeek}
            maxDailyRelays={appIdData.maxDailyRelays}
          />
        </section>
      )}
    </>
  )
}

export default Application
