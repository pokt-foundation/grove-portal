import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import { action } from "./action"
import MembersView from "./view"
import { ErrorBoundaryView } from "~/components/ErrorBoundaryView"
import { User } from "~/models/portal/sdk"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return [
    {
      title: `Account Members ${seo_title_append}`,
    },
  ]
}

export type TeamLoaderData = {
  profile: User
  accessToken: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)
  return json<TeamLoaderData>({
    profile: user.user,
    accessToken: user.accessToken,
  })
}

export { action }

export default function AccountMembers() {
  const { userRole, account, user } = useOutletContext<AccountIdLoaderData>()
  return <MembersView account={account} user={user} userRole={userRole} />
}

export function ErrorBoundary() {
  return <ErrorBoundaryView />
}
