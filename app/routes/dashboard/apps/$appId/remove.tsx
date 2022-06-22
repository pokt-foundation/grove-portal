import { ActionFunction, redirect, json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { postLBRemoveUserApplication } from "~/models/portal.server"

export const action: ActionFunction = async ({ request, params }) => {
  const { appId } = params
  invariant(appId && typeof appId === "string", "app id not found")

  const response = await postLBRemoveUserApplication(appId, request)

  if (response.success) {
    return redirect("/dashboard/apps")
  }

  return json({ success: false })
}
