import { Box, LoadingOverlay } from "@mantine/core"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "@remix-run/react"
import React, { useEffect } from "react"
import invariant from "tiny-invariant"
import AccountForm from "./components/AccountForm"
import { ErrorBoundaryView } from "~/components/ErrorBoundaryView"
import PortalLoader from "~/components/PortalLoader"
import useActionNotification from "~/hooks/useActionNotification"
import { initPortalClient } from "~/models/portal/portal.server"
import { Account, RoleName } from "~/models/portal/sdk"
import { ActionDataStruct } from "~/types/global"
import { getUserAccountRole } from "~/utils/accountUtils"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return [
    {
      title: `Update Account ${seo_title_append}`,
    },
  ]
}

type AccountUpdateData = {
  account: Account
}

type AccountUpdateActionData = {
  success: boolean
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const { accountId } = params
  invariant(accountId, "AccountId must be set")

  try {
    const getUserAccountResponse = await portal.getUserAccount({
      accountID: accountId,
      accepted: true,
    })

    if (!getUserAccountResponse) {
      return redirect(`/account/${params.accountId}`)
    }

    const userRole = getUserAccountRole(
      getUserAccountResponse.getUserAccount.users,
      user.user.portalUserID,
    )

    if (!userRole || userRole === RoleName.Member) {
      return redirect(`/account/${params.accountId}`)
    }

    return json<AccountUpdateData>({
      account: getUserAccountResponse.getUserAccount as Account,
    })
  } catch (error) {
    throw new Response(getErrorMessage(error), {
      status: 500,
    })
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const formData = await request.formData()
  const name = formData.get("account_name")
  const { accountId } = params

  invariant(name && typeof name === "string", "account name not found")
  invariant(accountId && typeof accountId === "string", "accountId not found")

  try {
    const updateUserAccountResponse = await portal
      .updateUserAccount({
        input: {
          accountID: accountId,
          name,
        },
      })
      .catch(() => {
        throw new Error("Unable to update account")
      })

    if (!updateUserAccountResponse.updateUserAccount) {
      throw new Error("Unable to update account")
    }

    return json<ActionDataStruct<AccountUpdateActionData>>({
      data: { success: true },
      error: false,
      message: `Account name updated to ${name} successfully`,
    })
  } catch (error) {
    console.error(error)
    return json<ActionDataStruct<AccountUpdateActionData>>({
      data: null,
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function UpdateAccount() {
  const { account } = useLoaderData<AccountUpdateData>()
  const actionData = useActionData<typeof action>()
  const { accountId } = useParams()

  const { state } = useNavigation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const redirectTo = params.get("redirectTo")

  useActionNotification(actionData)

  useEffect(() => {
    if (actionData) {
      navigate(redirectTo ?? `/account/${accountId}/settings`)
    }
  }, [accountId, actionData, navigate, redirectTo])

  return state !== "idle" ? (
    <LoadingOverlay
      visible
      loader={
        <PortalLoader
          message={state === "submitting" ? "Updating your account..." : "Redirecting..."}
        />
      }
    />
  ) : (
    <Box maw={860} mt={90} mx="auto">
      <AccountForm account={account} redirectTo={redirectTo} />
    </Box>
  )
}

export function ErrorBoundary() {
  return <ErrorBoundaryView />
}
