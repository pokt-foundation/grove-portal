import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import ErrorBoundaryView from "~/components/ErrorBoundaryView"
import { Logs } from "~/models/dwh/sdk/models/Logs"
import { initDwhClient } from "~/models/portal/dwh.server"
import AppLogs from "~/routes/account.$accountId.$appId.logs/view"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return [
    {
      title: `Application Logs ${seo_title_append}`,
    },
  ]
}

type AppLogsData = {
  logs: Logs[]
}

export const LOGS_PAGE_SIZE = 20

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request)
  const dwh = initDwhClient()
  const url = new URL(request.url)
  const pageNumberParam = Number(url.searchParams.get("page") ?? "1")

  try {
    const { appId } = params
    invariant(typeof appId === "string", "AppId must be a set url parameter")

    const logsResponse = await dwh.logsGet({
      portalApplicationId: [appId],
      page: pageNumberParam,
      pageSize: LOGS_PAGE_SIZE,
    })

    return json<AppLogsData>({
      logs: logsResponse.data as Logs[],
    })
  } catch (error) {
    throw new Response(getErrorMessage(error), {
      status: 500,
    })
  }
}

export default function AccountInsights() {
  const { logs } = useLoaderData<AppLogsData>()

  return <AppLogs logs={logs} />
}

export function ErrorBoundary() {
  return <ErrorBoundaryView />
}
