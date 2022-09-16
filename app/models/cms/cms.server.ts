import { GraphQLClient } from "graphql-request"
import { getSdk as getSdkGen } from "~/models/indexer/sdk"
import { getRequiredServerEnvVar } from "~/utils/environment"

function initCmsClient() {
  const client = new GraphQLClient(getRequiredServerEnvVar("CMS_API_URL"), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getRequiredServerEnvVar("CMS_API_TOKEN")}`,
      Accept: "*/*",
    },
  })

  return getSdkGen(client)
}

export { initCmsClient }
