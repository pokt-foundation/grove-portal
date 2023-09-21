import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import UserInvitedApps from "./view"
import ErrorView from "~/components/ErrorView"
import { initPortalClient } from "~/models/portal/portal.server"
import { PortalApp, SortOrder, User } from "~/models/portal/sdk"
import { getErrorMessage } from "~/utils/catchError"
import { LoaderDataStruct } from "~/utils/loader"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: "Invited apps",
  }
}

export type UserInvitedAppsLoaderData = {
  apps: PortalApp[]
  user: User
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  try {
    const userApps = await portal.getUserPortalApps({ sortOrder: SortOrder.Asc })
    if (!userApps.getUserPortalApps) {
      throw new Error(`Apps not found for user ${user.user.portalUserID}`)
    }

    return json<LoaderDataStruct<UserInvitedAppsLoaderData>>({
      data: {
        apps: userApps.getUserPortalApps as PortalApp[],
        user: user.user,
      },
      error: false,
    })
  } catch (error) {
    return json<LoaderDataStruct<UserInvitedAppsLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function InvitedApps() {
  const { data, error, message } =
    useLoaderData<LoaderDataStruct<UserInvitedAppsLoaderData>>()

  if (error) {
    return <ErrorView message={message} />
  }

  const { apps, user } = data

  return <UserInvitedApps apps={apps} user={user} />
}
