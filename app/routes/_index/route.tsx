import { LoaderFunction } from "@remix-run/node"
import { redirectToUserAccount, requireUser } from "~/utils/user.server"

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)

  return redirectToUserAccount(user.accessToken)
}
