import { ActionFunction, json, LoaderFunction } from "@remix-run/node"
import { useCatch, useLoaderData, useTransition } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import invariant from "tiny-invariant"
import { AppIdLoaderData } from "../$appId"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { initPortalClient } from "~/models/portal/portal.server"
import { RoleName } from "~/models/portal/sdk"
import { requireUser } from "~/utils/session.server"

import TeamView, {
  links as TeamViewLinks,
} from "~/views/dashboard/apps/appId/team/teamView"

export const links = () => {
  return [...TeamViewLinks()]
}

export type TeamLoaderData = {
  profile: Auth0Profile
  accessToken: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  return json<TeamLoaderData>({
    profile: user.profile,
    accessToken: user.accessToken
  })
}

export type ActionData = {
  email: string
  type: "delete" | "invite"
  error: boolean
}

export const action: ActionFunction = async ({ request, params }) => {
  const { appId } = params
  const { accessToken } = useLoaderData<TeamLoaderData>()
  const portal = initPortalClient(accessToken)
  const formData = await request.formData()
  const type = formData.get("type")

  if (type === "delete") {
    const email = formData.get("email")

    invariant(appId, "app id not found")
    invariant(email && typeof email === "string", "user email not found")

    try {
      await portal.deleteEndpointUser({
        endpointID: appId,
        email: email !== null ? email.toString() : "",
      })

      return json<ActionData>({ email, type, error: false })
    } catch (e) {
      return json<ActionData>({ email, type, error: true })
    }
  } else if (type === "invite") {
    const email = formData.get("email-address")
    const roleName = formData.get("app-subscription")

    invariant(appId, "app id not found")
    invariant(roleName && typeof roleName === "string", "user role not found")
    invariant(email && typeof email === "string", "user email not found")

    try {
      const { createEndpointUser } = await portal.createEndpointUser({
        endpointID: appId,
        input: {
          email,
          roleName: roleName === "ADMIN" ? RoleName.Admin : RoleName.Member,
        },
      })

      if (!createEndpointUser) {
        throw new Error("Error creating invite")
      }

      return json<ActionData>({
        email,
        error: false,
        type,
      })
    } catch (error) {
      return json<ActionData>({
        email,
        error: true,
        type,
      })
    }
  }
}

export default function Team() {
  const appIDRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const { state } = useTransition()
  const { endpoint } = appIDRoute?.data as AppIdLoaderData

  return <TeamView endpoint={endpoint} state={state} />
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
