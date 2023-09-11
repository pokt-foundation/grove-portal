import { Box, LoadingOverlay } from "@pokt-foundation/pocket-blocks"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { useFetcher } from "@remix-run/react"
import { useState } from "react"
import invariant from "tiny-invariant"
import PortalLoader from "~/components/PortalLoader"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanType } from "~/models/portal/sdk"
import { Stripe, stripe } from "~/models/stripe/stripe.server"
import AccountPlansContainer from "~/routes/account_.$accountId.create/components/AccountPlansContainer"
import AppForm from "~/routes/account_.$accountId.create/components/AppForm"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredClientEnvVar, getRequiredServerEnvVar } from "~/utils/environment"
import { MAX_USER_APPS } from "~/utils/pocketUtils"
import { getUserPermissions, requireUser, Permissions } from "~/utils/user.server"

export const meta: MetaFunction = () => {
  return {
    title: "Create New Application",
  }
}

type LoaderData = {
  price: Stripe.Price | void
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const { accountId } = params

  const portal = initPortalClient({ token: user.accessToken })
  const endpointsResponse = await portal.endpoints().catch((e) => {
    console.log(e)
  })

  const permissions = getUserPermissions(user.accessToken)
  const underMaxApps = () => {
    return !endpointsResponse || endpointsResponse.owner.length < MAX_USER_APPS
  }

  const userCanCreateApp =
    permissions.includes(Permissions.AppsUnlimited) ||
    (user.profile.id &&
      getRequiredClientEnvVar("GODMODE_ACCOUNTS")?.includes(user.profile.id)) ||
    underMaxApps()

  if (!userCanCreateApp) {
    return redirect(`/account/${accountId}/app-limit-exceeded`)
  }

  const priceID = getRequiredServerEnvVar("STRIPE_PRICE_ID")
  const price = await stripe.prices.retrieve(priceID).catch((error) => {
    console.log(error)
  })

  return json<LoaderData>(
    {
      price: price,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  )
}

// type ActionData = {
//   error: true
//   message: string
// }

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request)
  const portal = initPortalClient({ token: user.accessToken })
  const formData = await request.formData()
  const subscription = formData.get("app-subscription")
  const name = formData.get("app-name")
  // const description = formData.get("app-description")
  // const appmoji = formData.get("appmoji")
  const { accountId } = params

  invariant(
    subscription && typeof subscription === "string",
    "app subscription not found",
  )
  invariant(name && typeof name === "string", "app name not found")

  try {
    const { createNewEndpoint } = await portal.createEndpoint({
      name,
    })

    if (!createNewEndpoint) {
      throw new Error("portal api could not create new endpoint")
    }

    if (subscription === PayPlanType.PayAsYouGoV0) {
      formData.append("app-id", createNewEndpoint.id)

      // setting to any because of a TS known error: https://github.com/microsoft/TypeScript/issues/19806
      const params = new URLSearchParams(formData as any).toString()
      return redirect(`/api/stripe/checkout-session?${params}`)
    }

    return redirect(`/account/${accountId}/${createNewEndpoint.id}`)
  } catch (error) {
    return json({
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function CreateApp() {
  // const action = useActionData() as ActionData
  const fetcher = useFetcher()
  const [appFromData, setAppFromData] = useState<FormData>()

  return fetcher.state === "idle" ? (
    <Box maw={860} mx="auto">
      {appFromData ? (
        <AccountPlansContainer
          onPlanSelected={(plan: PayPlanType) => {
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
