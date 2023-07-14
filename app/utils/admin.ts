import { initPortalClient } from "~/models/portal/portal.server"
import { getSdk as getSdkGen } from "~/models/portal/sdk"
import { getRequiredServerEnvVar } from "~/utils/environment"

export const initAdminPortal = async (
  portal: ReturnType<typeof getSdkGen>,
): Promise<ReturnType<typeof getSdkGen>> => {
  const resultGetUserJWT = await portal.getUserJWT({
    username: getRequiredServerEnvVar("ADMIN_EMAIL"),
    password: getRequiredServerEnvVar("ADMIN_PASSWORD"),
  })

  return initPortalClient({
    token: resultGetUserJWT.getUserJWT,
    "x-Admin-Key": getRequiredServerEnvVar("ADMIN_KEY"),
  })
}
