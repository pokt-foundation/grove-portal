import { ActionFunction, json, LoaderFunction } from "@remix-run/node"
import { useCatch, useLoaderData, useTransition } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import invariant from "tiny-invariant"
import { AppIdLoaderData } from "../$appId"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { initPortalClient } from "~/models/portal/portal.server"
import { requireUser } from "~/utils/session.server"

import TeamView, {
  links as TeamViewLinks,
} from "~/views/dashboard/apps/appId/team/teamView"

export const links = () => {
  return [...TeamViewLinks()]
}

type LoaderData = {
  profile: Auth0Profile
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  return json<LoaderData>({
    profile: user.profile,
  })
}

export const action: ActionFunction = async ({ request, params }) => {
  const { appId } = params
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const formData = await request.formData()
  const email = formData.get("email")

  invariant(appId, "app id not found")
  invariant(email && typeof email === "string", "user email not found")

  // const email = "ricardo.souza@pokt.network"
  try {
    await portal.deleteEndpointUser({
      endpointID: appId,
      email: email !== null ? email.toString() : "",
    })

    return json<boolean>(true)
  } catch (e) {
    return json<any>(e)
  }
}

export default function Team() {
  const appIDRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const { state } = useTransition()
  const { profile } = useLoaderData()
  const { endpoint } = appIDRoute?.data as AppIdLoaderData

  return <TeamView endpoint={endpoint} profile={profile} state={state} />
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>Team Catch Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>Team Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
