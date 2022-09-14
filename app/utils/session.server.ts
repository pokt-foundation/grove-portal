import {
  Cookie,
  CookieParseOptions,
  CookieSerializeOptions,
  CookieSignatureOptions,
  createCookieSessionStorage,
  redirect,
} from "@remix-run/node"
import jwt_decode from "jwt-decode"
import { Auth0Profile } from "remix-auth-auth0"
import { authenticator } from "./auth.server"
import { getRequiredServerEnvVar } from "./environment"

let cookie:
  | Cookie
  | (CookieParseOptions & CookieSerializeOptions & CookieSignatureOptions) = {
  name: "_session", // use any name you want here
  httpOnly: true, // for security reasons, make this cookie http only
  path: "/", // remember to add this so the cookie will work in all routes
  sameSite: "lax", // this helps with CSRF
  secure: process.env.NODE_ENV === "production", // enable this in prod only
}

if (getRequiredServerEnvVar("VERCEL_URL").includes("pokt.network")) {
  cookie = {
    ...cookie,
    secrets: [getRequiredServerEnvVar("SESSION_SECRET")], // replace this with an actual secret
  }
}

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie,
})

export const requireUser = async (request: Request, defaultRedirect = "/") => {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    throw redirect(defaultRedirect)
  }
  if (!user.profile._json.email_verified) {
    throw await authenticator.logout(request, { redirectTo: "/validate" })
  }

  const decode = jwt_decode<{
    exp: number
  }>(user.accessToken)

  if (Date.now() >= decode.exp * 1000) {
    throw await authenticator.logout(request, { redirectTo: "/?expired=true" })
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

export const getUserId = async (request: Request) => {
  const user = await authenticator.isAuthenticated(request)
  if (!user) return undefined
  return getPoktId(user.profile.id)
}

export const getPoktId = (id: string) => {
  return id.split("|")[1]
}

export const getUserProfile = async (request: Request) => {
  const user = await authenticator.isAuthenticated(request)
  return user?.profile ?? undefined
}
