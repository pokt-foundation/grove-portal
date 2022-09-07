import { GraphQLClient } from "graphql-request"
import { getSdk as getSdkGen } from "~/models/poktscan/sdk"
import { getRequiredServerEnvVar } from "~/utils/environment"

function initPoktScanClient() {
  const client = new GraphQLClient(getRequiredServerEnvVar("POKT_SCAN_API_URL"), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getRequiredServerEnvVar("POKT_SCAN_API_TOKEN")}`,
      Accept: "*/*",
    },
  })

  return getSdkGen(client)
}

export { initPoktScanClient }
