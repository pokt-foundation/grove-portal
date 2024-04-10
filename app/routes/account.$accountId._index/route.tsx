import { Button } from "@mantine/core"
import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { Link, useLoaderData, useOutletContext, useParams } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import { EmptyState } from "~/components/EmptyState"
import { ErrorBoundaryView } from "~/components/ErrorBoundaryView"
import {
  getD2AggregateRelays,
  getD2TotalRelays,
  getRealtimeDataChains,
} from "~/models/dwh/dwh.server"
import { initPortalClient } from "~/models/portal/portal.server"
import {
  Account,
  Blockchain,
  D2Chain,
  D2Stats,
  PortalApp,
  RoleName,
} from "~/models/portal/sdk"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import { AnnouncementAlert } from "~/routes/account.$accountId._index/components/AnnouncementAlert"
import AccountInsightsView from "~/routes/account.$accountId._index/view"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

const ANNOUNCEMENT_ALERT = getRequiredClientEnvVar("FLAG_ANNOUNCEMENT_ALERT")

export const meta: MetaFunction = () => {
  return [
    {
      title: `Account Insights ${seo_title_append}`,
    },
  ]
}

export type AccountInsightsData = {
  account: Account
  total: D2Stats
  aggregate: D2Stats[]
  realtimeDataChains: D2Chain[]
  blockchains: Blockchain[]
}

export const allowedDayParams = [1, 3, 7, 14, 30, 60]
export const byHourDayParams = [1, 3]

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const url = new URL(request.url)
  const daysParam: number = Number(url.searchParams.get("days") ?? "7")
  const appParam = url.searchParams.get("app")
  const chainParam = url.searchParams.get("chain")

  // Prevent manually entering daysParam
  if (!allowedDayParams.includes(daysParam)) {
    return redirect(url.pathname)
  }

  try {
    const { accountId } = params
    invariant(typeof accountId === "string", "AccountId must be a set url parameter")

    const account = await portal.getUserAccount({ accountID: accountId, accepted: true })
    const getBlockchainsResponse = await portal.blockchains()

    const getD2StatsDataResponse = await getD2AggregateRelays({
      days: daysParam,
      accountId,
      portalClient: portal,
      byHour: byHourDayParams.includes(daysParam),
      ...(chainParam && chainParam !== "all" && { chainIDs: [chainParam] }),
      ...(appParam && appParam !== "all" && { applicationIDs: [appParam] }),
    })

    const getD2TotalStatsResponse = await getD2TotalRelays({
      days: daysParam,
      accountId,
      portalClient: portal,
      byHour: byHourDayParams.includes(daysParam),
      ...(chainParam && chainParam !== "all" && { chainIDs: [chainParam] }),
      ...(appParam && appParam !== "all" && { applicationIDs: [appParam] }),
    })

    const getRealtimeDataChainsResponse = await getRealtimeDataChains({
      days: daysParam,
      accountId,
      portalClient: portal,
      byHour: byHourDayParams.includes(daysParam),
      ...(appParam && appParam !== "all" && { applicationIDs: [appParam] }),
    })

    return json<AccountInsightsData>({
      account: account.getUserAccount as Account,
      blockchains: getBlockchainsResponse.blockchains as Blockchain[],
      realtimeDataChains: getRealtimeDataChainsResponse as D2Chain[],
      total: getD2TotalStatsResponse as D2Stats,
      aggregate: getD2StatsDataResponse.getD2StatsData.data as D2Stats[],
    })
  } catch (error) {
    throw new Response(getErrorMessage(error), {
      status: 500,
    })
  }
}

export default function AccountInsights() {
  const { account, total, aggregate, blockchains, realtimeDataChains } =
    useLoaderData() as AccountInsightsData
  const { userRole } = useOutletContext<AccountIdLoaderData>()
  const { accountId } = useParams()

  const apps = account?.portalApps as PortalApp[]

  return (
    <>
      {ANNOUNCEMENT_ALERT === "true" && <AnnouncementAlert />}
      {apps.length === 0 ? (
        <EmptyState
          alt="Empty overview placeholder"
          callToAction={
            userRole !== RoleName.Member ? (
              <Button
                component={Link}
                mt="xs"
                prefetch="intent"
                to={`/account/${accountId}/create`}
              >
                New Application
              </Button>
            ) : null
          }
          imgHeight={205}
          imgSrc="/overview-empty-state.svg"
          imgWidth={122}
          subtitle={
            <>
              Applications connect your project to the blockchain. <br />
              Set up your first one now.
            </>
          }
          title="Create your first application"
        />
      ) : (
        <AccountInsightsView
          account={account}
          aggregate={aggregate}
          blockchains={blockchains}
          realtimeDataChains={realtimeDataChains}
          total={total}
        />
      )}
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorBoundaryView />
}
