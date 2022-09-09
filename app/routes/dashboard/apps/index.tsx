import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useSearchParams } from "@remix-run/react"
import { useEffect } from "react"
import { AllAppsLoaderData } from "../apps"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import {
  getRelays,
  getRelaysPerWeek,
  RelayMetric,
} from "~/models/relaymeter/relaymeter.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { dayjs } from "~/utils/dayjs"
import { getPoktId, requireUser } from "~/utils/session.server"
import AppsView, { links as AppsViewLinks } from "~/views/dashboard/apps/index/appsView"

export const links = () => {
  return [...AppsViewLinks()]
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
    dailyNetworkRelaysPerWeek = await getRelaysPerWeek("users", userId)
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
  const [searchParams] = useSearchParams()

  useEffect(() => {
    trackEvent(AmplitudeEvents.AllAppsView)
  }, [])

  return (
    <AppsView
      dailyNetworkRelaysPerWeek={dailyNetworkRelaysPerWeek}
      endpoints={endpoints}
      searchParams={searchParams}
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
