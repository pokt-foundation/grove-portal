import { Auth0Profile } from "remix-auth-auth0"

export const getPoktId = (id: string) => {
  return id.split("|")[1]
}

export const isPoktAdmin = (profile: Auth0Profile): Boolean => {
  console.log(profile._json.email.includes("@pokt.network"))
  return profile._json.email.includes("@pokt.network")
}
