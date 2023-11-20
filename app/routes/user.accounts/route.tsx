import { ActionFunction, json, MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import invariant from "tiny-invariant"
import UserAccounts from "./view"
import ErrorView from "~/components/ErrorView"
import { initPortalClient } from "~/models/portal/portal.server"
import { UserAccountLoaderData } from "~/routes/user/route"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return [
    {
      title: `User Accounts ${seo_title_append}`,
    },
  ]
}

export type UserInvitedAccountsActionData = {
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
      const accountId = formData.get("accountId")
      invariant(typeof accountId === "string", "accountId must be set")

      const updateUserResponse = await portal.updateUserAcceptAccount({
        accountID: accountId,
        accepted: invite_response === "accept",
      })
      res = updateUserResponse.updateUserAcceptAccount
    }

    return json<DataStruct<UserInvitedAccountsActionData>>({
      data: {
        success: res,
      },
      error: false,
      message: "Invite response saved",
    })
  } catch (error) {
    return json<DataStruct<UserInvitedAccountsActionData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function Accounts() {
  const { data, error, message } = useOutletContext<DataStruct<UserAccountLoaderData>>()

  if (error) {
    return <ErrorView message={message} />
  }

  const { accounts, pendingAccounts, user } = data

  return (
    <UserAccounts accounts={accounts} pendingAccounts={pendingAccounts} user={user} />
  )
}
