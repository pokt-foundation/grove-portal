import { createCookieSessionStorage, redirect } from "@remix-run/node"
import { Auth0Profile } from "remix-auth-auth0"
import { authenticator } from "./auth.server"
import { getRequiredServerEnvVar } from "./environment"
import jwt_decode from "jwt-decode"

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    httpOnly: true, // for security reasons, make this cookie http only
    path: "/", // remember to add this so the cookie will work in all routes
    sameSite: "lax", // this helps with CSRF
    secrets: [getRequiredServerEnvVar("SESSION_SECRET")], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
})

export const requireUser = async (request: Request, defaultRedirect = "/") => {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    throw redirect(defaultRedirect)
  }
  const decode = jwt_decode<{
    exp: number
  }>(user.accessToken)

  if (Date.now() >= decode.exp * 1000) {
    try {
      const refreshUser = await authenticator.authenticate("auth0", request)
      return refreshUser
    } catch (error) {
      throw await authenticator.logout(request, {
        redirectTo: defaultRedirect,
      })
    }
  }
  return user
}

export const requireUserProfile = async (
  request: Request,
  defaultRedirect = "/",
): Promise<Auth0Profile> => {
  const user = await requireUser(request)
  return user.profile
}

export const requireAdmin = async (
  request: Request,
  defaultRedirect = "/",
): Promise<Auth0Profile> => {
  let user = await authenticator.isAuthenticated(request)
  if (!user || !user.profile.emails[0].value.includes("@pokt.network")) {
    throw redirect(defaultRedirect)
  }
  return user.profile
}

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage

export const getUserId = async (request: Request) => {
  const user = await requireUser(request)
  return user.profile.id.replace(/auth0\|/g, "")
}

export const getUserProfile = async (request: Request) => {
  const user = await authenticator.isAuthenticated(request)
  return user?.profile
}
