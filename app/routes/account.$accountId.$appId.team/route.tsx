import { showNotification } from "@mantine/notifications"
import { ActionFunction, json, LoaderFunction } from "@remix-run/node"
import {
  useActionData,
  useCatch,
  useOutletContext,
  useRouteLoaderData,
} from "@remix-run/react"
import { useEffect } from "react"
import invariant from "tiny-invariant"
import { AppIdOutletContext } from "../account.$accountId.$appId/route"
import TeamView from "./view"
import ErrorView from "~/components/ErrorView"
import { initPortalClient } from "~/models/portal/portal.server"
import { RoleNameV2, User } from "~/models/portal/sdk"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { sendTeamInviteEmail, sendTeamUserRemovedEmail } from "~/utils/mail.server"
import { requireUser } from "~/utils/user.server"

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

export type ActionData = {
  email: string
  type: "delete" | "invite" | "updateRole" | "resend"
  error: boolean
}

export type TeamActionData = {
  success: Boolean
  type: TeamActionType
}

type TeamActionType = "delete" | "invite" | "updateRole" | "resend"

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const formData = await request.formData()

  const { appId, accountId } = params
  invariant(accountId, "account id not found")
  invariant(appId, "app id not found")

  try {
    const user_invite = formData.get("user_invite")
    const user_delete = formData.get("user_delete")
    const user_update = formData.get("user_update")
    const user_resend = formData.get("user_resend")

    let message = ""
    let type: TeamActionType = "invite"
    let res = false

    if (user_invite) {
      // invite user
      const user_email = formData.get("user_email")
      const user_role = formData.get("user_role")
      invariant(typeof user_email === "string", "user_email must be set")
      invariant(typeof user_role === "string", "user_role must be set")

      const createAccountUserResponse = await portal.createAccountUser({
        input: {
          accountID: accountId,
          portalAppID: appId,
          email: user_email,
          roleName: user_role as RoleNameV2,
        },
      })
      res = Boolean(createAccountUserResponse.createAccountUser)
      message = `User invite successfully sent to ${user_email}`
      if (!res) {
        throw new Error(`Error inviting user ${user_email} on app ${appId}`)
      }

      // todo: send user email with app name?
      await sendTeamInviteEmail(user_email, appId)
    }

    if (user_delete) {
      const user_id = formData.get("user_id")
      const user_email = formData.get("user_email")
      invariant(typeof user_id === "string", "user_id must be set")
      invariant(typeof user_email === "string", "user_email must be set")

      const removeAccountUserResponse = await portal.removeAccountUser({
        input: {
          accountID: accountId,
          portalAppID: appId,
          userID: user_id,
        },
      })

      res = removeAccountUserResponse.removeAccountUser
      message = `User ${user_id} was removed from app ${appId}`
      if (!res) {
        throw new Error(`Error removing user ${user_id} from app ${appId}`)
      }

      // todo: send remove email with app name?
      await sendTeamUserRemovedEmail(user_email, appId)
    }
    if (user_update) {
      const user_id = formData.get("user_id")
      const user_role = formData.get("user_role")
      const user_email = formData.get("user_email")
      invariant(typeof user_id === "string", "user_id must be set")
      invariant(typeof user_role === "string", "user_role must be set")
      invariant(typeof user_email === "string", "user_email must be set")

      const updateUserAccountRoleResponse = await portal.updateUserAccountRole({
        input: {
          accountID: accountId,
          portalAppID: appId,
          userID: user_id,
          roleName: user_role as RoleNameV2,
        },
      })

      res = updateUserAccountRoleResponse.updateUserAccountRole
      message = `User role was successfully updated to ${user_role}`
      if (!res) {
        throw new Error(`Error updating role ${user_role} for user ${user_id}`)
      }

      // send update email?
    }
    if (user_resend) {
      const user_email = formData.get("user_email")
      invariant(typeof user_email === "string", "user_email must be set")

      // todo: send user email with app name?
      await sendTeamInviteEmail(user_email, appId)

      res = true
      message = `Invite email resent to user ${user_email}`
    }

    return json<DataStruct<TeamActionData>>({
      data: {
        success: res,
        type,
      },
      error: false,
      message,
    })
  } catch (error) {
    return json<DataStruct<TeamActionData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function Team() {
  const { app, userRole } = useOutletContext<AppIdOutletContext>()
  const { data, error, message } = useRouteLoaderData(
    "routes/account.$accountId",
  ) as DataStruct<AccountIdLoaderData>
  const actionData = useActionData() as DataStruct<TeamActionData>

  useEffect(() => {
    if (!actionData) return

    showNotification({
      message: actionData.message,
    })
  }, [actionData])

  if (error) {
    return <ErrorView message={message} />
  }

  const { user } = data

  return <TeamView actionData={actionData} app={app} user={user} userRole={userRole} />
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>Team Catch Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>Team Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
