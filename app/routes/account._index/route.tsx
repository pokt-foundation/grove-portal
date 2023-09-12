import { LoaderFunction, redirect } from "@remix-run/node"
import { authenticator } from "~/utils/auth.server"
import { redirectToUserAccount } from "~/utils/user.server"

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request).catch((err) => {
    console.log(err)
  })

  if (!user) {
    return redirect("/api/auth/auth0")
  }

  return redirectToUserAccount(user.accessToken)
}
