import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import ErrorBoundaryView from "~/components/ErrorBoundaryView"
import { getAggregateRelays, getTotalRelays } from "~/models/dwh/dwh.server"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk/models/AnalyticsRelaysAggregated"
import { AnalyticsRelaysTotal } from "~/models/dwh/sdk/models/AnalyticsRelaysTotal"
import ApplicationInsightsView from "~/routes/account.$accountId.$appId.insights/view"
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
  total: AnalyticsRelaysTotal
  aggregate: AnalyticsRelaysAggregated[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request)
  const url = new URL(request.url)
  const daysParam = Number(url.searchParams.get("days") ?? "7")

  // Prevent manually entering daysParam
  if (daysParam !== 7 && daysParam !== 30 && daysParam !== 60) {
    return redirect(url.pathname)
  }

  try {
    const { appId } = params
    invariant(typeof appId === "string", "AppId must be a set url parameter")

    const aggregate = await getAggregateRelays({
      category: "application_id",
      categoryValue: [appId],
      days: daysParam,
    })
    const total = await getTotalRelays({
      category: "application_id",
      categoryValue: [appId],
      days: daysParam,
    })

    return json<AppInsightsData>({
      total: (total as AnalyticsRelaysTotal) ?? undefined,
      aggregate: (aggregate as AnalyticsRelaysAggregated[]) ?? undefined, //dailyReponse.data as AnalyticsRelaysDaily[],
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
