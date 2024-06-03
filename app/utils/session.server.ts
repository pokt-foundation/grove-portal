import {
  Cookie,
  CookieParseOptions,
  CookieSerializeOptions,
  CookieSignatureOptions,
  createCookieSessionStorage,
} from "@remix-run/node"
import { getRequiredServerEnvVar } from "./environment"

let cookie:
  | Cookie
  | (CookieParseOptions & CookieSerializeOptions & CookieSignatureOptions) = {
  name: "_session", // use any name you want here
  httpOnly: true, // for security reasons, make this cookie http only
  path: "/", // remember to add this so the cookie will work in all routes
  sameSite: "lax", // this helps with CSRF
  secure: process.env.NODE_ENV === "production", // enable this in prod only
  secrets: [getRequiredServerEnvVar("SESSION_SECRET")], // replace this with an actual secret
}

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie,
})

export let { getSession, commitSession, destroySession } = sessionStorage
