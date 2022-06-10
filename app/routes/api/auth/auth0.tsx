import { redirect } from "@remix-run/node"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { authenticator } from "~/utils/auth.server"

export let loader: LoaderFunction = () => redirect("/login")

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const logoutField = formData.get("logout")
  const signupField = formData.get("signup")

  if (logoutField) {
    return authenticator.logout(request, {
      redirectTo: "/",
    })
  }

  if (signupField) {
    const url = new URL(request.url)
    url.searchParams.append("screen_hint", "signup")
    url.searchParams.append("prompt", "login")
    const signupRequest = new Request(url.toString(), request)
    return authenticator.authenticate("auth0", signupRequest, {
      successRedirect: "/dashboard",
      failureRedirect: "/",
    })
  }

  return authenticator.authenticate("auth0", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
}
