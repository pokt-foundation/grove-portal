import { GraphQLClient } from "graphql-request"
import { getSdk as getSdkGen } from "~/models/portal/sdk"
import { getRequiredClientEnvVar } from "~/utils/environment"

function initPortalClient() {
  const client = new GraphQLClient(getRequiredClientEnvVar("PORTAL_API_URL"))

  return getSdkGen(client)
}

export { initPortalClient }
