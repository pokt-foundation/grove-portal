import { Box, LoadingOverlay } from "@pokt-foundation/pocket-blocks"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import invariant from "tiny-invariant"
import PortalLoader from "~/components/PortalLoader"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanTypeV2 } from "~/models/portal/sdk"
import AccountPlansContainer from "~/routes/account_.$accountId.create/components/AccountPlansContainer"
import AppForm from "~/routes/account_.$accountId.create/components/AppForm"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredClientEnvVar } from "~/utils/environment"
import { seo_title_append } from "~/utils/meta"
import { MAX_USER_APPS } from "~/utils/pocketUtils"
import { getUserPermissions, requireUser, Permissions } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: `Create New Application ${seo_title_append}`,
  }
}

// type LoaderData = {
//   price: Stripe.Price | void
// }

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const { accountId } = params
  const permissions = getUserPermissions(user.accessToken)

  invariant(accountId, "AccountId must be set")

  const getUserAccountResponse = await portal
    .getUserAccount({ accountID: accountId })
    .catch((e) => {
      console.log(e)
    })

  if (!getUserAccountResponse) {
    return redirect(`/account/${params.accountId}`)
  }

  const portalApps = getUserAccountResponse.getUserAccount.portalApps
  const underMaxApps = () => {
    return !portalApps || portalApps.length < MAX_USER_APPS
  }

  const userCanCreateApp =
    permissions.includes(Permissions.AppsUnlimited) ||
    (user.profile.id &&
      getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(user.profile.id)) ||
    underMaxApps()

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
  const subscription = formData.get("app-subscription")
  const name = formData.get("app-name")
  const description = formData.get("app-description")
  const appmoji = formData.get("app-emoji")
  const { accountId } = params

  invariant(
    subscription && typeof subscription === "string",
    "app subscription not found",
  )
  invariant(name && typeof name === "string", "app name not found")
  invariant(accountId && typeof accountId === "string", "accountId not found")

  try {
    const createUserPortalAppResponse = await portal
      .createUserPortalApp({
        input: {
          name,
          accountID: accountId,
          planType: subscription as PayPlanTypeV2,
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

    if (subscription === PayPlanTypeV2.PayAsYouGoV0) {
      formData.append("app-id", newApp.id)
      formData.append("app-accountId", accountId)

      // setting to any because of a TS known error: https://github.com/microsoft/TypeScript/issues/19806
      const params = new URLSearchParams(formData as any).toString()
      return redirect(`/api/stripe/checkout-session?${params}`)
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

  useEffect(() => {
    if (fetcher.data && fetcher.data.error) {
      // TODO: handle showNotification toast message
      console.log(fetcher.data)
    }
  }, [fetcher])

  return fetcher.state === "idle" ? (
    <Box maw={860} mx="auto">
      {appFromData ? (
        <AccountPlansContainer
          onPlanSelected={(plan: PayPlanTypeV2) => {
            appFromData?.append("app-subscription", plan)
            fetcher.submit(appFromData, {
              method: "POST",
            })
          }}
        />
      ) : (
        <AppForm onSubmit={(formData) => setAppFromData(formData)} />
      )}
      {/* TODO: Handle error messages and failures differently */}
      {/*{action && (*/}
      {/*  <Card>*/}
      {/*    <p>{action.message}</p>*/}
      {/*  </Card>*/}
      {/*)}*/}
    </Box>
  ) : (
    <LoadingOverlay
      visible
      loader={<PortalLoader message="Creating your application..." />}
    />
  )
}
