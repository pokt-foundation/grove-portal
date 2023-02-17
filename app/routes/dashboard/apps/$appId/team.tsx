import { ActionFunction, json } from "@remix-run/node"
import { useCatch, useTransition } from "@remix-run/react"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { RoleName } from "~/models/portal/sdk"
import { getErrorMessage } from "~/utils/catchError"
import { requireUser } from "~/utils/session.server"

import TeamView, {
  links as TeamViewLinks,
} from "~/views/dashboard/apps/appId/team/teamView"

export const links = () => {
  return [...TeamViewLinks()]
}

export const action: ActionFunction = async ({ request, params }) => {
  const { appId } = params
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const formData = await request.formData()
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

    return json({
      error: false,
      data: createEndpointUser,
    })
  } catch (error) {
    return json({
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function Team() {
  const { state } = useTransition()

  return <TeamView state={state} />
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
