import { Grid } from "@pokt-foundation/pocket-blocks"
import { MetaFunction } from "@remix-run/node"
// import AppLatencyCard, {
//   links as AppLatencyCardLinks,
// } from "~/components/application/AppLatencyCard"
import { useMemo, useEffect } from "react"
import { AppIdLoaderData } from "../dashboard.apps.$appId/route"
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
import BannerCard, { links as BannerCardLinks } from "~/components/application/BannerCard"
import UsageChartCard, {
  links as UsageChartCardLinks,
} from "~/components/application/UsageChartCard"
import { useFeatureFlags } from "~/context/FeatureFlagContext"
import { useTranslate } from "~/context/TranslateContext"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const links = () => {
  return [
    ...AppEndpointCardLinks(),
    // ...AppLatencyCardLinks(),
    ...AppUsageCurrentCardLinks(),
    ...AppRequestsRateCardLinks(),
    ...AppOverLimitCardLinks(),
    ...UsageChartCardLinks(),
    ...BannerCardLinks(),
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
  const { t } = useTranslate()
  const { flags } = useFeatureFlags()

  useEffect(() => {
    trackEvent(AmplitudeEvents.AppDetailsView)
  }, [])

  const exceedsMaxRelays = useMemo(() => {
    if (appIdData.endpoint.appLimits.dailyLimit === 0) {
      return false
    }

    return appIdData.relaysToday.Count.Total >= appIdData.endpoint.appLimits.dailyLimit
  }, [appIdData])

  const allZeros = () => {
    let relays = 0
    relays += appIdData.relaysToday.Count.Total
    relays += appIdData.relaysYesterday.Count.Total
    for (let i = 0; i < appIdData.dailyNetworkRelaysPerWeek.length; i += 1) {
      relays += appIdData.dailyNetworkRelaysPerWeek[i].Count.Total
    }
    return relays
  }

  const totalRelaysForTheWeek = useMemo(() => {
    return appIdData.dailyNetworkRelaysPerWeek.reduce((prev, curr) => {
      return prev + curr.Count.Success
    }, 0)
  }, [appIdData.dailyNetworkRelaysPerWeek])

  return (
    <>
      {exceedsMaxRelays && <AppOverLimitCard exceedsMaxRelays={exceedsMaxRelays} />}
      {appIdData.endpoint && (
        <section>
          <AppEndpointCard app={appIdData.endpoint} blockchains={appIdData.blockchains} />
        </section>
      )}
      <Grid gutter={32}>
        <Grid.Col sm={6}>
          {appIdData.relaysToday.Count && (
            <section>
              <AppUsageCurrentCard
                averageRelays={totalRelaysForTheWeek / 7}
                maxDailyRelays={appIdData.endpoint.appLimits.dailyLimit}
                totalRelays={appIdData.relaysToday.Count.Success}
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
          <UsageChartCard
            emptyLabel="Your application does not have relay data yet."
            relays={appIdData.dailyNetworkRelaysPerWeek}
          />
        </section>
      )}
      {flags.INFLUX_RELAY_ERROR === "true" && allZeros() === 0 && (
        <BannerCard
          bannerType="error"
          copy={{ title: t.BannerErrorCard.title, body: t.BannerErrorCard.body }}
        />
      )}
    </>
  )
}

export default Application
