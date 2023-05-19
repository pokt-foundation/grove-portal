import { ActionFunction, json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useOutletContext, useSearchParams } from "@remix-run/react"
import { useEffect } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import invariant from "tiny-invariant"
import { AllAppsOutletContext } from "../dashboard.apps/route"
import AppsView, { links as AppsViewLinks } from "./view"
import { initPortalClient } from "~/models/portal/portal.server"
import { getRelaysPerPeriod, RelayMetric } from "~/models/relaymeter/relaymeter.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getPoktId, requireUser } from "~/utils/session.server"

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
  // endpoints: EndpointsQuery | null
}

export type AppsActionData = {
  email: string
  type: "accept" | "decline" | "leaveApp"
  error: boolean
}

export const loader: LoaderFunction = async ({ request, context }) => {
  const user = await requireUser(request)
  invariant(user.profile.id && user.profile.emails, "user not found")
  const userId = getPoktId(user.profile.id)

  let dailyNetworkRelaysPerWeek: RelayMetric[] | null = null

  try {
    dailyNetworkRelaysPerWeek = await getRelaysPerPeriod("users", 7, userId)
  } catch (e) {}

  console.log(context)

  return json<AppsLoaderData>(
    {
      dailyNetworkRelaysPerWeek,
      userId,
      profile: user.profile,
      // endpoints: context.endpoints
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
  } else if (type === "decline" || type === "leaveApp") {
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
  const { endpoints } = useOutletContext<AllAppsOutletContext>()
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
