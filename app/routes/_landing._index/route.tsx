import { LoaderFunction, redirect } from "@remix-run/node"
import { requireUser } from "~/utils/session.server"

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request, "/api/auth/auth0")

  if (!user || !user.profile?._json?.email_verified) {
    return redirect("/validate")
  }

  return redirect("/dashboard")
}
