import {
  Outlet,
  useActionData,
  useRouteLoaderData,
} from "@remix-run/react"
import React from "react"
import ErrorView from "~/components/ErrorView"
import useActionNotification from "~/hooks/useActionNotification"
import { AccountIdLoaderData } from "~/routes/account.$accountId/route"
import AccountSettingsLayoutView from "~/routes/account.$accountId.settings/view"
import { DataStruct } from "~/types/global"

export default function AccountSettings() {
  const { data, error, message } = useRouteLoaderData(
    "routes/account.$accountId",
  ) as DataStruct<AccountIdLoaderData>
  const actionData = useActionData()

  // handle all notifications at the layout level
  useActionNotification(actionData)

  if (error) {
    return <ErrorView message={message} />
  }

  const { account, accounts, user, userRole } = data

  return (
    <AccountSettingsLayoutView account={account}>
      <Outlet context={{ account, accounts, user, userRole }} />
    </AccountSettingsLayoutView>
  )
}
