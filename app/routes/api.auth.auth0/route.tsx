import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { authenticator } from "~/utils/auth.server"

export let loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url)
  const signupField = url.searchParams.get("signup")
  url.searchParams.append("prompt", "login")

  if (signupField) {
    url.searchParams.append("screen_hint", "signup")
    const signupRequest = new Request(url.toString(), request)
    return authenticator.authenticate("auth0", signupRequest, {
      successRedirect: "/org",
      failureRedirect: "/",
    })
  }

  const loginRequest = new Request(url.toString(), request)
  return authenticator.authenticate("auth0", loginRequest, {
    successRedirect: "/org",
    failureRedirect: "/",
  })
}

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const logoutField = formData.get("logout")
  const signupField = formData.get("signup")

  const url = new URL(request.url)

  if (logoutField) {
    return authenticator.logout(request, {
      redirectTo: url.origin,
    })
  }

  if (signupField) {
    url.searchParams.append("screen_hint", "signup")
    url.searchParams.append("prompt", "login")
    const signupRequest = new Request(url.toString(), request)
    return authenticator.authenticate("auth0", signupRequest, {
      successRedirect: "/org",
      failureRedirect: "/",
    })
  }

  url.searchParams.append("prompt", "login")
  const loginRequest = new Request(url.toString(), request)
  return authenticator.authenticate("auth0", loginRequest, {
    successRedirect: "/dashboard",
    failureRedirect: url.origin,
  })
}
