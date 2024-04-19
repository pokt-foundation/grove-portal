import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import ErrorBoundaryView from "~/components/ErrorBoundaryView"
import { getD2AggregateRelays, getD2TotalRelays } from "~/models/portal/dwh.server"
import { initPortalClient } from "~/models/portal/portal.server"
import { D2Stats } from "~/models/portal/sdk"
import ApplicationInsightsView from "~/routes/account.$accountId.$appId.insights/view"
import { getErrorMessage } from "~/utils/catchError"
import { byHourPeriods, getDwhParams, validatePeriod } from "~/utils/dwhUtils.server"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return [
    {
      title: `Application Insights ${seo_title_append}`,
    },
  ]
}

export type AppInsightsData = {
  total: D2Stats
  aggregate: D2Stats[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request)
  const url = new URL(request.url)
  const daysParam = Number(url.searchParams.get("days") ?? "7")
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  const { period } = getDwhParams(url)
  // Prevent manually entering an invalid period
  validatePeriod({ period, url })

  try {
    const { appId, accountId } = params
    invariant(typeof appId === "string", "AppId must be a set url parameter")
    invariant(typeof accountId === "string", "AccountId must be a set url parameter")

    const getD2StatsDataResponse = await getD2AggregateRelays({
      period: daysParam,
      accountId,
      portalClient: portal,
      byHour: byHourPeriods.includes(period),
      applicationIDs: [appId],
    })

    const getD2TotalStatsResponse = await getD2TotalRelays({
      period: daysParam,
      accountId,
      portalClient: portal,
      applicationIDs: [appId],
    })

    return json<AppInsightsData>({
      total: getD2TotalStatsResponse as D2Stats,
      aggregate: getD2StatsDataResponse.getD2StatsData.data as D2Stats[],
    })
  } catch (error) {
    throw new Response(getErrorMessage(error), {
      status: 500,
    })
  }
}

export default function ApplicationInsights() {
  const { total, aggregate } = useLoaderData<typeof loader>()
  return <ApplicationInsightsView aggregate={aggregate} total={total} />
}

export function ErrorBoundary() {
  return <ErrorBoundaryView />
}
