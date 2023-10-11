import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import ErrorView from "~/components/ErrorView"
import { initDwhClient } from "~/models/dwh/dwh.server"
import { Logs } from "~/models/dwh/sdk/models/Logs"
import AppLogs from "~/routes/account.$accountId.$appId.logs/view"
import type { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Application Logs ${seo_title_append}`,
  }
}

type AppLogsData = {
  logs: Logs[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request)
  const dwh = initDwhClient()

  try {
    const { appId } = params
    invariant(typeof appId === "string", "AppId must be a set url parameter")

    const logsResponse = await dwh.logsGet({
      portalApplicationId: [appId],
    })

    return json<DataStruct<AppLogsData>>({
      data: {
        logs: logsResponse.data as Logs[],
      },
      error: false,
    })
  } catch (error) {
    return json<DataStruct<AppLogsData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function AccountInsights() {
  const { data, error, message } = useLoaderData() as DataStruct<AppLogsData>

  if (error) {
    return <ErrorView message={message} />
  }

  return <AppLogs logs={data?.logs} />
}
