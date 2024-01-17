import { Box, LoadingOverlay } from "@pokt-foundation/pocket-blocks"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { useFetcher } from "@remix-run/react"
import React, { useState } from "react"
import invariant from "tiny-invariant"
import AccountPlansContainer from "./components/AccountPlansContainer"
import AppForm from "./components/AppForm"
import { DEFAULT_APPMOJI } from "./components/AppmojiPicker"
import PortalLoader from "~/components/PortalLoader"
import useActionNotification from "~/hooks/useActionNotification"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanType, RoleName } from "~/models/portal/sdk"
import { getUserAccountRole } from "~/utils/accountUtils"
import { getErrorMessage } from "~/utils/catchError"
import { seo_title_append } from "~/utils/seo"
import { requireUser } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Create Application ${seo_title_append}`,
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const { accountId } = params
  invariant(accountId, "AccountId must be set")

  const getUserAccountResponse = await portal
    .getUserAccount({ accountID: accountId, accepted: true })
    .catch((e) => {
      console.log(e)
    })

  if (!getUserAccountResponse) {
    return redirect(`/account/${params.accountId}`)
  }

  const userAccount = getUserAccountResponse.getUserAccount
  const userRole = getUserAccountRole(userAccount.users, user.user.portalUserID)

  if (!userRole || userRole === RoleName.Member) {
    return redirect(`/account/${params.accountId}`)
  }
  const portalApps = userAccount.portalApps
  const underMaxApps = () => {
    return !portalApps || portalApps.length < userAccount.plan.appLimit
  }

  const userCanCreateApp = userAccount.plan.appLimit === 0 || underMaxApps()

  // ensure only users who can create new apps are allowed on this page
  if (!userCanCreateApp) {
    return redirect(`/account/${params.accountId}/app-limit-exceeded`)
  }

  // TODO: Dynamically get the price
  //
  // const priceID = getRequiredServerEnvVar("STRIPE_PRICE_ID")
  // const price = await stripe.prices.retrieve(priceID).catch((error) => {
  //   console.log(error)
  // })

  // return json<LoaderData>(
  //   {
  //     price: price,
  //   },
  //   {
  //     headers: {
  //       "Cache-Control": `private, max-age=${
  //         process.env.NODE_ENV === "production" ? "3600" : "60"
  //       }`,
  //     },
  //   },
  // )

  return null
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const formData = await request.formData()
  const subscription = formData.get("account-subscription")
  const name = formData.get("app-name")
  const referral = formData.get("referral-id")
  const description = formData.get("app-description")
  const appmoji = formData.get("app-emoji")
  const { accountId } = params

  invariant(
    subscription && typeof subscription === "string",
    "account subscription not found",
  )
  invariant(name && typeof name === "string", "app name not found")
  invariant(accountId && typeof accountId === "string", "accountId not found")

  try {
    const createUserPortalAppResponse = await portal
      .createUserPortalApp({
        input: {
          name,
          accountID: accountId,
          description: typeof description === "string" ? description : undefined,
          appEmoji: typeof appmoji === "string" ? appmoji : DEFAULT_APPMOJI,
        },
      })
      .catch((err) => {
        console.log(err)
        throw new Error("portal api could not create new endpoint")
      })

    if (!createUserPortalAppResponse.createUserPortalApp) {
      throw new Error("portal api could not create new endpoint")
    }

    const newApp = createUserPortalAppResponse.createUserPortalApp

    if (subscription === PayPlanType.PayAsYouGoV0) {
      return redirect(
        `/api/stripe/checkout-session?account-id=${accountId}&app-id=${newApp.id}&referral-id=${referral}`,
      )
    }

    return redirect(`/account/${accountId}/${newApp.id}`)
  } catch (error) {
    return json({
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function CreateApp() {
  const fetcher = useFetcher()
  const [appFromData, setAppFromData] = useState<FormData>()

  useActionNotification(fetcher.data)

  return fetcher.state === "idle" ? (
    <Box maw={860} mt={90} mx="auto">
      {appFromData ? (
        <AccountPlansContainer
          onPlanSelected={(plan: PayPlanType) => {
            appFromData?.append("account-subscription", plan)
            fetcher.submit(appFromData, {
              method: "POST",
            })
          }}
        />
      ) : (
        <AppForm onSubmit={(formData) => setAppFromData(formData)} />
      )}
    </Box>
  ) : (
    <LoadingOverlay
      visible
      loader={<PortalLoader message="Creating your application..." />}
    />
  )
}
