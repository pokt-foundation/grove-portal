import { GraphQLClient } from "graphql-request"
import { getSdk as getSdkGen } from "~/models/portal/sdk"
import { getRequiredClientEnvVar } from "~/utils/environment"

type Headers = {
  [key: string]: string
}

function initPortalClient(headers: Headers = {}): ReturnType<typeof getSdkGen> {
  let options: { headers?: Headers } | undefined
  const { token, ...rest } = headers
  if (Object.keys(headers).length > 0) {
    options = {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...rest,
      },
    }
  }

  const client = new GraphQLClient(getRequiredClientEnvVar("PORTAL_API_URL"), options)

  return getSdkGen(client)
}

export { initPortalClient }
