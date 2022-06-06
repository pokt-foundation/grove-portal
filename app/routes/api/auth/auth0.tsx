import { redirect } from "@remix-run/node"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { authenticator } from "~/utils/auth.server"

export let loader: LoaderFunction = () => redirect("/login")

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const logoutField = formData.get("logout")

  if (logoutField) {
    return authenticator.logout(request, {
      redirectTo: "/",
    })
  }

  return authenticator.authenticate("auth0", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
}
