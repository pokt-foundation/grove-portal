import { Configuration, UserApi } from "./sdk"
import { getRequiredServerEnvVar } from "~/utils/environment"

function initDwhClient(): UserApi {
  const dwh = new UserApi(
    new Configuration({
      basePath: getRequiredServerEnvVar("DWH_API_URL"),
      apiKey: getRequiredServerEnvVar("DWH_API_KEY"),
      headers: {
        "Content-Type": "application/json",
      },
    }),
  )

  return dwh
}

export { initDwhClient }
