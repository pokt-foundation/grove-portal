import { ActionFunction, json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useSearchParams } from "@remix-run/react"
import { useEffect } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import invariant from "tiny-invariant"
import { AllAppsLoaderData } from "../apps"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { teamsMockData } from "~/models/portal/portal.data"
import { initPortalClient } from "~/models/portal/portal.server"
import { getRelaysPerWeek, RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
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
  profile: Auth0Profile
}

export type AppsActionData = {
  email: string
  type: "accept" | "decline"
  error: boolean
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
      profile: user.profile,
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

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const formData = await request.formData()
  const type = formData.get("type")
  const appId = formData.get("appId")?.toString()

  if (type === "accept") {
    const email = formData.get("email")

    invariant(appId, "app id not found")
    invariant(email && typeof email === "string", "user email not found")

    try {
      await portal.acceptEndpointUser({
        endpointID: appId,
      })
      return json<AppsActionData>({ email, type, error: false })
    } catch (e) {
      console.log(e)
      return json<AppsActionData>({ email, type, error: true })
    }
  } else if (type === "decline") {
    const email = formData.get("email")

    invariant(appId, "app id not found")
    invariant(email && typeof email === "string", "user email not found")

    try {
      await portal.deleteEndpointUser({
        endpointID: appId,
        email: email !== null ? email.toString() : "",
      })

      return json<AppsActionData>({
        email,
        type,
        error: false,
      })
    } catch (error) {
      return json<AppsActionData>({
        email,
        type,
        error: true,
      })
    }
  }
}

export const Apps = () => {
  const allAppsRoute = useMatchesRoute("routes/dashboard/apps")
  const { endpoints } = allAppsRoute?.data as AllAppsLoaderData
  const { dailyNetworkRelaysPerWeek, userId, profile } = useLoaderData() as AppsLoaderData
  const [searchParams] = useSearchParams()

  useEffect(() => {
    trackEvent(AmplitudeEvents.AllAppsView)
  }, [])

  return (
    <AppsView
      dailyNetworkRelaysPerWeek={dailyNetworkRelaysPerWeek}
      endpoints={endpoints}
      profile={profile}
      searchParams={searchParams}
      teams={teamsMockData}
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
