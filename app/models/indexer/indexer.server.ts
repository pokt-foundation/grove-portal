import { GraphQLClient } from "graphql-request"
import { getSdk as getSdkGen } from "~/models/indexer/sdk"
import { getRequiredClientEnvVar } from "~/utils/environment"

function initIndexerClient() {
  const client = new GraphQLClient(getRequiredClientEnvVar("INDEXER_API_URL"))

  return getSdkGen(client)
}

export { initIndexerClient }
