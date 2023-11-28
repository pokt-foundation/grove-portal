import { LoaderFunction, redirect } from "@remix-run/node"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { redirectToUserAccount, requireUser } from "~/utils/user.server"

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)

  const MAINTENANCE_MODE = getRequiredServerEnvVar("FLAG_MAINTENANCE_MODE")
  if (MAINTENANCE_MODE === "true") {
    return redirect("/maintenance")
  }
  return redirectToUserAccount(user)
}
