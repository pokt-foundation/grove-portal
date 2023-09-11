import { LoaderFunction, redirect } from "@remix-run/node"
import { initPortalClient } from "~/models/portal/portal.server"
import { requireUser } from "~/utils/user.server"

export const loader: LoaderFunction = async ({ request }) => {
  // const user = await requireUser(request, "/api/auth/auth0")
  // const portal = initPortalClient({ token: user.accessToken })

  // const getPortalUserIdResponse = await portal.getPortalUserID().catch((e) => {
  //   console.log(e)
  // })
  // const portalUserId = getPortalUserIdResponse?.getPortalUserID

  // return redirect(`/account/${portalUserId}`)
  return
}
