import { ActionFunction, json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import React from "react"
import invariant from "tiny-invariant"
import MembersView from "./view"
import { ErrorBoundaryView } from "~/components/ErrorBoundaryView"
import { initPortalClient } from "~/models/portal/portal.server"
import { RoleName, User } from "~/models/portal/sdk"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import { ActionDataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { triggerTeamActionNotification } from "~/utils/notifications.server"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"
import { action } from "./action"

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
