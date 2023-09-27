import { useActionData } from ".pnpm/react-router@6.11.0_react@18.2.0/node_modules/react-router"
import { showNotification } from "@mantine/notifications"
import { ActionFunction, json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import UserInvitedApps from "./view"
import ErrorView from "~/components/ErrorView"
import { initPortalClient } from "~/models/portal/portal.server"
import { PortalApp, SortOrder, User } from "~/models/portal/sdk"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
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
export type UserInvitedAppsActionData = {
  success: Boolean
}

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  const formData = await request.formData()

  try {
    const invite_response = formData.get("invite_response")

    let res = false
    if (invite_response) {
      const portalAppID = formData.get("portalAppId")
      invariant(typeof portalAppID === "string", "portalAppId must be set")

      const updateUserResponse = await portal.updateUserAcceptAccount({
        portalAppID,
        accepted: invite_response === "accept",
      })
      res = updateUserResponse.updateUserAcceptAccount
    }

    return json<DataStruct<UserInvitedAppsActionData>>({
      data: {
        success: res,
      },
      error: false,
    })
  } catch (error) {
    return json<DataStruct<UserInvitedAppsActionData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })

  try {
    const userApps = await portal.getUserPortalApps({ sortOrder: SortOrder.Asc })
    if (!userApps.getUserPortalApps) {
      throw new Error(`Apps not found for user ${user.user.portalUserID}`)
    }

    return json<DataStruct<UserInvitedAppsLoaderData>>({
      data: {
        apps: userApps.getUserPortalApps as PortalApp[],
        user: user.user,
      },
      error: false,
    })
  } catch (error) {
    return json<DataStruct<UserInvitedAppsLoaderData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function InvitedApps() {
  const { data, error, message } = useLoaderData<DataStruct<UserInvitedAppsLoaderData>>()
  const actionData = useActionData() as DataStruct<UserInvitedAppsActionData>

  useEffect(() => {
    if (!actionData) return

    if (!actionData.error) {
      showNotification({
        message: "Invite response saved",
      })
    }

    if (actionData.error) {
      showNotification({
        message: actionData.message,
      })
    }
  }, [actionData])

  if (error) {
    return <ErrorView message={message} />
  }

  const { apps, user } = data

  return <UserInvitedApps apps={apps} user={user} />
}
