import { ActionFunction, json, redirect } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { requireUser } from "~/utils/session.server"

export const action: ActionFunction = async ({ request, params }) => {
  const { appId } = params
  invariant(appId && typeof appId === "string", "app id not found")

  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)

  const response = await portal.removeEndpoint({
    endpointID: appId,
  })

  if (response.removeEndpoint) {
    return redirect("/dashboard/apps")
  }

  return json({ success: false })
}
