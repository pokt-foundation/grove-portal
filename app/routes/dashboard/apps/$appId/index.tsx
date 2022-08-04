import { MetaFunction } from "@remix-run/node"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"
import AppEndpointCard, {
  links as AppEndpointCardLinks,
} from "~/components/application/AppEndpointCard"
// import AppLatencyCard, {
//   links as AppLatencyCardLinks,
// } from "~/components/application/AppLatencyCard"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
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
import UsageChartCard, {
  links as UsageChartCardLinks,
} from "~/components/application/UsageChartCard"

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
                totalRelays={appIdData.relaysToday.Count.Total}
                sessionRelays={0}
              />
            </section>
          )}
        </Grid.Col>
        <Grid.Col sm={6}>
          {appIdData.relaysToday.Count && appIdData.relaysYesterday.Count && (
            <section>
              <AppRequestsRateCard
                previousRelays={appIdData.relaysYesterday.Count}
                currentRelays={appIdData.relaysToday.Count}
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
