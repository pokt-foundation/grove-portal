import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import { EmptyState } from "./components/EmptyState"
import ErrorView from "~/components/ErrorView"
import { getAggregateRelays, getTotalRelays } from "~/models/dwh/dwh.server"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk/models/AnalyticsRelaysAggregated"
import { AnalyticsRelaysTotal } from "~/models/dwh/sdk/models/AnalyticsRelaysTotal"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, PortalApp } from "~/models/portal/sdk"
import AccountInsightsView from "~/routes/account.$accountId._index/view"
import type { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Account Insights ${seo_title_append}`,
  }
}

export type AccountInsightsData = {
  account: Account
  total: AnalyticsRelaysTotal
  aggregate: AnalyticsRelaysAggregated[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const url = new URL(request.url)
  const daysParam = Number(url.searchParams.get("days") ?? "7")

  try {
    const { accountId } = params
    invariant(typeof accountId === "string", "AccountId must be a set url parameter")

    const account = await portal.getUserAccount({ accountID: accountId, accepted: true })

    if (!account.getUserAccount) {
      throw new Error(
        `Account ${params.accountId} not found for user ${user.user.portalUserID}`,
      )
    }

    const aggregate = await getAggregateRelays({
      category: "account_id",
      categoryValue: [accountId],
      days: daysParam,
    })
    const total = await getTotalRelays({
      category: "account_id",
      categoryValue: [accountId],
      days: daysParam,
    })

    return json<DataStruct<AccountInsightsData>>({
      data: {
        account: account.getUserAccount as Account,
        total: (total as AnalyticsRelaysTotal) ?? undefined,
        aggregate: (aggregate as AnalyticsRelaysAggregated[]) ?? undefined, //dailyReponse.data as AnalyticsRelaysDaily[],
      },
      error: false,
    })
  } catch (error) {
    return json<DataStruct<AccountInsightsData>>({
      data: null,
      error: true,
      message: String(error),
    })
  }
}

export default function AccountInsights() {
  const { data, error, message } = useLoaderData() as DataStruct<AccountInsightsData>

  if (error) {
    return <ErrorView message={message} />
  }

  const apps = data?.account?.portalApps as PortalApp[]

  if (apps.length === 0) return <EmptyState />

  return <AccountInsightsView data={data} />
}
