import { Box, LoadingOverlay } from "@pokt-foundation/pocket-blocks"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react"
import invariant from "tiny-invariant"
import OrganizationForm from "./components/OrganizationForm"
import ErrorView from "~/components/ErrorView"
import PortalLoader from "~/components/PortalLoader"
import useActionNotification from "~/hooks/useActionNotification"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account } from "~/models/portal/sdk"
import { DataStruct } from "~/types/global"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import isUserAccountOwner from "~/utils/user"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Update Account ${seo_title_append}`,
  }
}

type AccountUpdateData = {
  account: Account
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const { accountId } = params
  invariant(accountId, "AccountId must be set")

  try {
    const getUserAccountResponse = await portal
      .getUserAccount({ accountID: accountId, accepted: true })
      .catch((e) => {
        console.log(e)
      })

    if (!getUserAccountResponse) {
      return redirect(`/account/${params.accountId}`)
    }

    const getUserAccountsResponse = await portal.getUserAccounts({ accepted: true })
    if (!getUserAccountsResponse.getUserAccounts) {
      return redirect(`/account/${params.accountId}`)
    }

    const isUserOwner = isUserAccountOwner({
      accounts: getUserAccountsResponse.getUserAccounts as Account[],
      accountId: accountId as string,
      user: user.user,
    })

    if (!isUserOwner) {
      return redirect(`/account/${params.accountId}`)
    }

    return json<DataStruct<AccountUpdateData>>({
      data: {
        account: getUserAccountResponse.getUserAccount as Account,
      },
      error: false,
    })
  } catch (error) {
    return json<DataStruct<AccountUpdateData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const formData = await request.formData()
  const name = formData.get("account_name")
  const { accountId } = params

  invariant(name && typeof name === "string", "app name not found")
  invariant(accountId && typeof accountId === "string", "accountId not found")

  try {
    const updateUserAccountResponse = await portal
      .updateUserAccount({
        input: {
          accountID: accountId,
          name,
        },
      })
      .catch((err) => {
        console.log(err)
        throw new Error("Unable to update organization")
      })

    if (!updateUserAccountResponse.updateUserAccount) {
      throw new Error("Unable to update organization")
    }

    return redirect(`/account/${accountId}`)
  } catch (error) {
    return json<DataStruct<AccountUpdateData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function UpdateAccount() {
  const { data, error, message } = useLoaderData() as DataStruct<AccountUpdateData>
  const actionData = useActionData() as DataStruct<AccountUpdateData>
  const { state } = useNavigation()

  useActionNotification(actionData)

  if (error) {
    return <ErrorView message={message} />
  }

  const { account } = data

  return state === "idle" ? (
    <Box maw={860} mx="auto">
      <OrganizationForm account={account} />
    </Box>
  ) : (
    <LoadingOverlay
      visible
      loader={<PortalLoader message="Updating your organization..." />}
    />
  )
}
