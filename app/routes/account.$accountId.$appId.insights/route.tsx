import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import ErrorBoundaryView from "~/components/ErrorBoundaryView"
import { getD2AggregateRelays, getD2TotalRelays } from "~/models/dwh/dwh.server"
import { initPortalClient } from "~/models/portal/portal.server"
import { D2Stats } from "~/models/portal/sdk"
import ApplicationInsightsView from "~/routes/account.$accountId.$appId.insights/view"
import {
  allowedDayParams,
  byHourDayParams,
} from "~/routes/account.$accountId._index/route"
import { getErrorMessage } from "~/utils/catchError"
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

  // Prevent manually entering daysParam
  if (!allowedDayParams.includes(daysParam)) {
    return redirect(url.pathname)
  }

  try {
    const { appId, accountId } = params
    invariant(typeof appId === "string", "AppId must be a set url parameter")
    invariant(typeof accountId === "string", "AccountId must be a set url parameter")

    const getD2StatsDataResponse = await getD2AggregateRelays({
      days: daysParam,
      accountId,
      portalClient: portal,
      byHour: byHourDayParams.includes(daysParam),
      applicationIDs: [appId],
    })

    const getD2TotalStatsResponse = await getD2TotalRelays({
      days: daysParam,
      accountId,
      portalClient: portal,
      byHour: byHourDayParams.includes(daysParam),
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
