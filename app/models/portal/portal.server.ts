import { GraphQLClient } from "graphql-request"
import { getSdk as getSdkGen } from "~/models/portal/sdk"
import { getRequiredClientEnvVar } from "~/utils/environment"

function initPortalClient(token?: string) {
  let options = undefined

  if (token) {
    options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  }

  console.log("token: ", token)

  const client = new GraphQLClient(getRequiredClientEnvVar("PORTAL_API_URL"), options)

  return getSdkGen(client)
}

export { initPortalClient }
