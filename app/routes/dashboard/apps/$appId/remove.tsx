import { ActionFunction, redirect } from "@remix-run/node"
import invariant from "tiny-invariant"
import { postLBRemoveUserApplication } from "~/models/portal.server"

export const action: ActionFunction = async ({ request, params }) => {
  const { appId } = params
  invariant(appId && typeof appId === "string", "app id not found")

  await postLBRemoveUserApplication(appId, request)

  return redirect("/dashboard/apps")
}
