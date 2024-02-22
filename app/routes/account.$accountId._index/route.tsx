import { Button } from "@mantine/core"
import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { Link, useLoaderData, useOutletContext, useParams } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import { EmptyState } from "~/components/EmptyState"
import ErrorView from "~/components/ErrorView"
import { getAggregateRelays, getTotalRelays } from "~/models/dwh/dwh.server"
import { AnalyticsRelaysAggregated } from "~/models/dwh/sdk/models/AnalyticsRelaysAggregated"
import { AnalyticsRelaysTotal } from "~/models/dwh/sdk/models/AnalyticsRelaysTotal"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, PortalApp, RoleName } from "~/models/portal/sdk"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import { AnnouncementAlert } from "~/routes/account.$accountId._index/components/AnnouncementAlert"
import AccountInsightsView from "~/routes/account.$accountId._index/view"
import type { DataStruct } from "~/types/global"
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
  total: AnalyticsRelaysTotal
  aggregate: AnalyticsRelaysAggregated[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const url = new URL(request.url)
  const daysParam: number = Number(url.searchParams.get("days") ?? "7")

  // Prevent manually entering daysParam
  if (daysParam !== 7 && daysParam !== 30 && daysParam !== 60) {
    return redirect(url.pathname)
  }

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
    console.error(error)
    return json<DataStruct<AccountInsightsData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function AccountInsights() {
  const { data, error, message } = useLoaderData() as DataStruct<AccountInsightsData>
  const { userRole } = useOutletContext<AccountIdLoaderData>()
  const { accountId } = useParams()

  if (error) {
    return <ErrorView message={message} />
  }

  const apps = data?.account?.portalApps as PortalApp[]

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
        <AccountInsightsView data={data} />
      )}
    </>
  )
}
