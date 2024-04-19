import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import ErrorBoundaryView from "~/components/ErrorBoundaryView"
import { initPortalClient } from "~/models/portal/portal.server"
import { D2Log, D2LogType, D2Meta } from "~/models/portal/sdk"
import { AppIdOutletContext } from "~/routes/account.$accountId.$appId/route"
import AppLogs from "~/routes/account.$accountId.$appId.logs/view"
import { getErrorMessage } from "~/utils/catchError"
import { dayjs } from "~/utils/dayjs"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return [
    {
      title: `Application Logs ${seo_title_append}`,
    },
  ]
}

export type AppLogsData = {
  logs: D2Log[]
  meta: D2Meta
}

export const LOGS_PAGE_SIZE = 20

const getLogsTypeParam = (type: string | null) => {
  switch (type) {
    case "errors":
      return D2LogType.ErrorLogs
    case "success":
      return D2LogType.NoErrorLogs
    case "all":
    default:
      return D2LogType.AllLogs
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request)
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const url = new URL(request.url)
  const pageNumberParam = Number(url.searchParams.get("page") ?? "1")
  const { accountId, appId } = params

  const logType = getLogsTypeParam(url.searchParams.get("type"))

  const tsParam = url.searchParams.get("ts")
    ? new Date(url.searchParams.get("ts") as string)
    : new Date()

  // Always fetch logs from selected ts to 1 hour before
  const from = dayjs(tsParam).subtract(1, "hour").toDate()

  invariant(typeof accountId === "string", "AccountId must be a set url parameter")
  invariant(typeof appId === "string", "AppId must be a set url parameter")

  try {
    const { appId } = params
    invariant(typeof appId === "string", "AppId must be a set url parameter")

    const getD2LogsDataResponse = await portal.getD2LogsData({
      params: {
        from,
        to: tsParam,
        logType,
        accountID: accountId,
        applicationID: appId,
        page: pageNumberParam,
        pageSize: LOGS_PAGE_SIZE,
        payloadSize: true,
      },
    })

    return json<AppLogsData>({
      logs: getD2LogsDataResponse?.getD2LogsData?.data as D2Log[],
      meta: getD2LogsDataResponse.getD2LogsData.meta,
    })
  } catch (error) {
    throw new Response(getErrorMessage(error), {
      status: 500,
    })
  }
}

export default function AccountInsights() {
  const { logs, meta } = useLoaderData<AppLogsData>()
  const { blockchains } = useOutletContext<AppIdOutletContext>()
  return <AppLogs blockchains={blockchains} logs={logs} meta={meta} />
}

export function ErrorBoundary() {
  return <ErrorBoundaryView />
}
