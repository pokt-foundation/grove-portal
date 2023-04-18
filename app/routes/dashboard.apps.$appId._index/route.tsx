import { Grid } from "@pokt-foundation/pocket-blocks"
import { MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import { useMemo, useEffect } from "react"
import { AppIdOutletContext } from "../dashboard.apps.$appId/route"
import AppEndpointCard, {
  links as AppEndpointCardLinks,
} from "~/components/AppEndpointCard/AppEndpointCard"
import AppOverLimitCard, {
  links as AppOverLimitCardLinks,
} from "~/components/AppOverSessionLimitCard"
import AppRequestsRateCard, {
  links as AppRequestsRateCardLinks,
} from "~/components/AppRequestsRateCard"
import AppUsageCurrentCard, {
  links as AppUsageCurrentCardLinks,
} from "~/components/AppUsageCurrentCard"
import BannerCard, { links as BannerCardLinks } from "~/components/BannerCard"
import UsageChartCard, { links as UsageChartCardLinks } from "~/components/UsageChartCard"
import { useFeatureFlags } from "~/context/FeatureFlagContext"
import { useTranslate } from "~/context/TranslateContext"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

export const links = () => {
  return [
    ...AppEndpointCardLinks(),
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
  const {
    blockchains,
    endpoint,
    relaysToday,
    relaysYesterday,
    dailyNetworkRelaysPerWeek,
  } = useOutletContext<AppIdOutletContext>()
  const { t } = useTranslate()
  const { flags } = useFeatureFlags()

  useEffect(() => {
    trackEvent(AmplitudeEvents.AppDetailsView)
  }, [])

  const exceedsMaxRelays = useMemo(() => {
    if (endpoint.appLimits.dailyLimit === 0) {
      return false
    }

    return relaysToday.Count.Total >= endpoint.appLimits.dailyLimit
  }, [endpoint, relaysToday])

  const allZeros = () => {
    let relays = 0
    relays += relaysToday.Count.Total
    relays += relaysYesterday.Count.Total
    for (let i = 0; i < dailyNetworkRelaysPerWeek.length; i += 1) {
      relays += dailyNetworkRelaysPerWeek[i].Count.Total
    }
    return relays
  }

  const totalRelaysForTheWeek = useMemo(() => {
    return dailyNetworkRelaysPerWeek.reduce(
      (prev: any, curr: { Count: { Success: any } }) => {
        return prev + curr.Count.Success
      },
      0,
    )
  }, [dailyNetworkRelaysPerWeek])

  return (
    <>
      {exceedsMaxRelays && <AppOverLimitCard exceedsMaxRelays={exceedsMaxRelays} />}
      {endpoint && (
        <section>
          <AppEndpointCard app={endpoint} blockchains={blockchains} />
        </section>
      )}
      <Grid gutter={32}>
        <Grid.Col sm={6}>
          {relaysToday.Count && (
            <section>
              <AppUsageCurrentCard
                averageRelays={totalRelaysForTheWeek / 7}
                maxDailyRelays={endpoint.appLimits.dailyLimit}
                totalRelays={relaysToday.Count.Success}
              />
            </section>
          )}
        </Grid.Col>
        <Grid.Col sm={6}>
          {relaysToday.Count && relaysYesterday.Count && (
            <section>
              <AppRequestsRateCard
                currentRelays={relaysToday.Count}
                previousRelays={relaysYesterday.Count}
              />
            </section>
          )}
        </Grid.Col>
      </Grid>
      {dailyNetworkRelaysPerWeek && (
        <section>
          <UsageChartCard
            emptyLabel="Your application does not have relay data yet."
            relays={dailyNetworkRelaysPerWeek}
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
