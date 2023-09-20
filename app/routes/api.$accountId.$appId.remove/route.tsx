import { ActionFunction, json, redirect } from "@remix-run/node"
import invariant from "tiny-invariant"
import { initPortalClient } from "~/models/portal/portal.server"
import { requireUser } from "~/utils/user.server"

export const action: ActionFunction = async ({ request, params }) => {
  const { accountId, appId } = params
  invariant(accountId && typeof accountId === "string", "account id not found")
  invariant(appId && typeof appId === "string", "app id not found")

  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  const response = await portal.removeEndpoint({
    endpointID: appId,
  })

  if (response.removeEndpoint) {
    return redirect(`/account/${accountId}`)
  }

  return json({ success: false })
}