import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { useCatch, useNavigation } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import invariant from "tiny-invariant"
import { AppIdLoaderData } from "../$appId"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { initPortalClient } from "~/models/portal/portal.server"
import { RoleName } from "~/models/portal/sdk"
import {
  sendTeamInviteEmail,
  sendTeamNewOwnerEmail,
  sendTeamUserRemovedEmail,
} from "~/utils/mail.server"
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
    accessToken: user.accessToken,
  })
}

export type ActionData = {
  email: string
  type: "delete" | "invite" | "updateRole" | "resend"
  error: boolean
}

export const action: ActionFunction = async ({ request, params }) => {
  const { appId } = params
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const formData = await request.formData()
  const type = formData.get("type")

  invariant(appId, "app id not found")

  if (type === "delete") {
    const email = formData.get("email-address")
    const appName = formData.get("app-name")

    invariant(appId, "app id not found")
    invariant(email && typeof email === "string", "user email not found")

    try {
      await sendTeamUserRemovedEmail(email, String(appName ?? "a Portal App"))

      await portal.deleteEndpointUser({
        endpointID: appId,
        email: email,
      })

      const isLeaveApp = email === user.profile._json?.email

      return isLeaveApp
        ? redirect("/dashboard/apps")
        : json<ActionData>({ email, type, error: false })
    } catch (e) {
      return json<ActionData>({ email, type, error: true })
    }
  } else if (type === "invite") {
    const email = formData.get("email-address")
    const roleName = formData.get("app-subscription")
    const appName = formData.get("app-name")

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

      // trigger invite email
      await sendTeamInviteEmail(email, String(appName ?? "a Portal App"))

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
  } else if (type === "resend") {
    const email = formData.get("email-address")
    const appName = formData.get("app-name")
    invariant(email && typeof email === "string", "user email not found")

    try {
      await sendTeamInviteEmail(email, String(appName ?? "An App"))
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
  } else if (type === "updateRole") {
    const email = formData.get("email")
    const roleName = formData.get("roleName")
    const appName = formData.get("app-name")
    const transferOwnership = formData.get("transferOwnership")

    invariant(roleName && typeof roleName === "string", "user role not found")
    invariant(email && typeof email === "string", "user email not found")

    try {
      const invertedRoleName = roleName === "MEMBER" ? RoleName.Admin : RoleName.Member
      const role = transferOwnership === "true" ? RoleName.Owner : invertedRoleName

      const { updateEndpointUserRole } = await portal.updateEndpointUserRole({
        endpointID: appId,
        input: {
          email,
          roleName: role,
        },
      })

      if (transferOwnership && transferOwnership !== "false") {
        await sendTeamNewOwnerEmail(email, String(appName ?? "a Portal App"))
      }

      if (!updateEndpointUserRole) {
        throw new Error("Erorr updating user role")
      }

      return json<ActionData>({
        email,
        error: false,
        type,
      })
    } catch (e) {
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
  const navigation = useNavigation()
  const { endpoint } = appIDRoute?.data as AppIdLoaderData

  return <TeamView endpoint={endpoint} state={navigation.state} />
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
