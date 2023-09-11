import { Authenticator } from "remix-auth"
import { Auth0ExtraParams, Auth0Profile, Auth0Strategy } from "remix-auth-auth0"
import { getRequiredServerEnvVar } from "./environment"
import { sessionStorage } from "./session.server"

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<{
  accessToken: string
  refreshToken: string
  extraParams: Auth0ExtraParams
  profile: Auth0Profile
}>(sessionStorage)

export type User = {
  accessToken: string
  refreshToken: string
  extraParams: Auth0ExtraParams
  profile: Auth0Profile
}

let auth0Strategy = new Auth0Strategy<User>(
  {
    callbackURL: "/api/auth/auth0/callback",
    clientID: getRequiredServerEnvVar("AUTH0_CLIENT_ID"),
    clientSecret: getRequiredServerEnvVar("AUTH0_CLIENT_SECRET"),
    domain: getRequiredServerEnvVar("AUTH0_DOMAIN"),
    audience: getRequiredServerEnvVar("AUTH0_AUDIENCE"),
    scope: getRequiredServerEnvVar("AUTH0_SCOPE"),
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value })
    return { accessToken, refreshToken, extraParams, profile }
  },
)

authenticator.use(auth0Strategy)
