import { LoaderFunction, json } from "@remix-run/node"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import UserOrganizations from "~/routes/account.$accountId.organizations/view"
import { requireUser } from "~/utils/user.server"

type LoaderData = {
  profile: Auth0Profile
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  return json<LoaderData>({
    profile: user.profile,
  })
}

export default function Profile() {
  const { accounts } = useOutletContext<AccountIdLoaderData>()

  return <UserOrganizations accounts={accounts} />
}
