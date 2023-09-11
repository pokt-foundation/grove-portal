import { LoaderFunction, redirect } from "@remix-run/node"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanTypeV2 } from "~/models/portal/sdk"
import { authenticator } from "~/utils/auth.server"

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request).catch((err) => {
    console.log(err)
  })

  if (!user) {
    return redirect("/api/auth/auth0")
  }

  const portal = initPortalClient({ token: user.accessToken })
  const accounts = await portal.getUserAccounts()
  let account: { id: string | null; planType: PayPlanTypeV2 | null } = {
    id: null,
    planType: null,
  }

  accounts.getUserAccounts.forEach((acc) => {
    if (acc) {
      if (acc.planType === PayPlanTypeV2.FreetierV0) {
        account = {
          id: acc.id,
          planType: acc.planType,
        }
      }
      if (acc.planType === PayPlanTypeV2.PayAsYouGoV0) {
        account = {
          id: acc.id,
          planType: acc.planType,
        }
      }
      if (acc.planType === PayPlanTypeV2.Enterprise) {
        account = {
          id: acc.id,
          planType: acc.planType,
        }
      }

      if (account.id === null) {
        account = {
          id: acc.id,
          planType: acc.planType,
        }
      }
    }
  })

  return redirect(`/account/${account.id}`)
}
