import { MetaFunction } from "@remix-run/node"
// import AppLatencyCard, {
//   links as AppLatencyCardLinks,
// } from "~/components/application/AppLatencyCard"
import { useMemo } from "react"
import { AppIdLoaderData } from "../$appId"
import AppEndpointCard, {
  links as AppEndpointCardLinks,
} from "~/components/application/AppEndpointCard"
import AppOverLimitCard, {
  links as AppOverLimitCardLinks,
} from "~/components/application/AppOverSessionLimitCard/AppOverSessionLimitCard"
import AppRequestsRateCard, {
  links as AppRequestsRateCardLinks,
} from "~/components/application/AppRequestsRateCard"
import AppUsageCurrentCard, {
  links as AppUsageCurrentCardLinks,
} from "~/components/application/AppUsageCurrentCard"
import UsageChartCard, {
  links as UsageChartCardLinks,
} from "~/components/application/UsageChartCard"
import Grid from "~/components/shared/Grid"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"

export const links = () => {
  return [
    ...AppEndpointCardLinks(),
    // ...AppLatencyCardLinks(),
    ...AppUsageCurrentCardLinks(),
    ...AppRequestsRateCardLinks(),
    ...AppOverLimitCardLinks(),
    ...UsageChartCardLinks(),
  ]
}

export const meta: MetaFunction = () => {
  return {
    title: "Application Details",
  }
}

export const Application = () => {
  const appIdRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const appIdData = appIdRoute?.data as AppIdLoaderData

  const exceedsMaxRelays = useMemo(() => {
    return appIdData.relaysToday.Count.Total >= FREE_TIER_MAX_RELAYS
  }, [appIdData.relaysToday.Count.Total])

  return (
    <>
      {exceedsMaxRelays && <AppOverLimitCard exceedsMaxRelays={exceedsMaxRelays} />}
      {appIdData.endpoint && (
        <section>
          <AppEndpointCard app={appIdData.endpoint} />
        </section>
      )}
      <Grid gutter={32}>
        <Grid.Col sm={6}>
          {appIdData.relaysToday.Count && (
            <section>
              <AppUsageCurrentCard
                maxDailyRelays={FREE_TIER_MAX_RELAYS}
                sessionRelays={0}
                totalRelays={appIdData.relaysToday.Count.Total}
              />
            </section>
          )}
        </Grid.Col>
        <Grid.Col sm={6}>
          {appIdData.relaysToday.Count && appIdData.relaysYesterday.Count && (
            <section>
              <AppRequestsRateCard
                currentRelays={appIdData.relaysToday.Count}
                previousRelays={appIdData.relaysYesterday.Count}
              />
            </section>
          )}
        </Grid.Col>
      </Grid>
      {/* {data.hourlyLatency && (
        <section>
          <AppLatencyCard hourlyLatency={data.hourlyLatency.hourly_latency} />
        </section>
      )} */}
      {appIdData.dailyNetworkRelaysPerWeek && (
        <section>
          <UsageChartCard relays={appIdData.dailyNetworkRelaysPerWeek} />
        </section>
      )}
    </>
  )
}

export default Application
