import { GraphQLClient } from "graphql-request"
import { getSdk as getSdkGen } from "~/models/cms/sdk"
import { getRequiredServerEnvVar } from "~/utils/environment"

function initCmsClient() {
  const client = new GraphQLClient(getRequiredServerEnvVar("CMS_API_URL"), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getRequiredServerEnvVar("CMS_API_TOKEN")}`,
    },
  })

  return getSdkGen(client)
}

export { initCmsClient }
