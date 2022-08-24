import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import { AllAppsLoaderData } from "../apps"
import UsageChartCard, {
  links as UsageCardLinks,
} from "~/components/application/UsageChartCard"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Table, { links as TableLinks } from "~/components/shared/Table"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { getRelays, RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { dayjs } from "~/utils/dayjs"
import { getPoktId, requireUser } from "~/utils/session.server"
import { getPlanName } from "~/utils/utils"
import { AppsView } from "~/views/dashboard/apps/index/appsView"

export const links = () => {
  return [...TableLinks(), ...CardLinks(), ...UsageCardLinks()]
}

export const meta: MetaFunction = () => {
  return {
    title: "Applications Page",
  }
}

export type AppsLoaderData = {
  dailyNetworkRelaysPerWeek: RelayMetric[] | null
  userId: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  const userId = getPoktId(user.profile.id)

  let dailyNetworkRelaysPerWeek: RelayMetric[] | null = null

  try {
    dailyNetworkRelaysPerWeek = await Promise.all(
      [0, 1, 2, 3, 4, 5, 6].map(async (num) => {
        const day = dayjs()
          .utc()
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0)
          .subtract(num, "day")
          .format()

        // api auto adjusts to/from to begining and end of each day so putting the same time here gives us back one full day
        return await getRelays("users", day, day, userId)
      }),
    )
  } catch (e) {}

  return json<AppsLoaderData>(
    {
      dailyNetworkRelaysPerWeek,
      userId,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

export const Apps = () => {
  const allAppsRoute = useMatchesRoute("routes/dashboard/apps")
  const { endpoints } = allAppsRoute?.data as AllAppsLoaderData
  const { dailyNetworkRelaysPerWeek, userId } = useLoaderData() as AppsLoaderData

  useEffect(() => {
    trackEvent(AmplitudeEvents.AllAppsView)
  }, [])

  return (
    <AppsView
      dailyNetworkRelaysPerWeek={dailyNetworkRelaysPerWeek}
      endpoints={endpoints}
      userId={userId}
    />
  )
}

export default Apps

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
    </div>
  )
}
