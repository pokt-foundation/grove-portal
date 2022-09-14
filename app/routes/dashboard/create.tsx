import { Button, Text } from "@pokt-foundation/pocket-blocks"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { Form, useLoaderData, useActionData, useTransition } from "@remix-run/react"
import { useEffect, useMemo, useState } from "react"
import invariant from "tiny-invariant"
import AppPlansOverview, {
  links as AppPlansOverviewLinks,
} from "~/components/application/AppPlansOverview"
import AppRadioCards, {
  links as AppRadioCardsLinks,
} from "~/components/application/AppRadioCards"
import CalculateYourPricing, {
  links as CalculateYourPricingLinks,
} from "~/components/application/CalculateYourPricing/CalculateYourPricing"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useFeatureFlags } from "~/context/FeatureFlagContext"
import { initPortalClient } from "~/models/portal/portal.server"
import { PayPlanType } from "~/models/portal/sdk"
import { Stripe, stripe } from "~/models/stripe/stripe.server"
import styles from "~/styles/dashboard.apps.create.css"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getErrorMessage } from "~/utils/catchError"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { requireUser } from "~/utils/session.server"
import { getPlanName } from "~/utils/utils"

export const meta: MetaFunction = () => {
  return {
    title: "Create New Application",
  }
}

export const links = () => {
  return [
    ...CardLinks(),
    ...TextInputLinks(),
    ...AppPlansOverviewLinks(),
    ...AppRadioCardsLinks(),
    ...CalculateYourPricingLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

type LoaderData = {
  price: Stripe.Price | void
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request)

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

type ActionData = {
  error: true
  message: string
}

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const formData = await request.formData()
  const subscription = formData.get("app-subscription")
  const name = formData.get("app-name")

  invariant(
    subscription && typeof subscription === "string",
    "app subscription not found",
  )
  invariant(name && typeof name === "string", "app name not found")

  try {
    const { createNewEndpoint } = await portal.createEndpoint({
      name,
      payPlanType: PayPlanType.FreetierV0,
    })

    if (!createNewEndpoint) {
      throw new Error("portal api could not create new endpoint")
    }

    if (subscription === PayPlanType.PayAsYouGoV0) {
      formData.append("app-id", createNewEndpoint.id)

      // setting to any because of a TS nnown error: https://github.com/microsoft/TypeScript/issues/19806
      const params = new URLSearchParams(formData as any).toString()
      return redirect(`/api/stripe/checkout-session?${params}`)
    }

    return redirect(`/dashboard/apps/${createNewEndpoint.id}`)
  } catch (error) {
    return json({
      error: true,
      message: getErrorMessage(error),
    })
  }
}

export default function CreateApp() {
  const { flags } = useFeatureFlags()
  const { price } = useLoaderData() as LoaderData
  const transition = useTransition()
  const action = useActionData() as ActionData
  const [radioSelectedValue, setRadioSelectedValue] = useState(
    flags.STRIPE_PAYMENT ? PayPlanType.PayAsYouGoV0 : PayPlanType.FreetierV0,
  )
  const [name, setName] = useState("")
  const [referral, setReferral] = useState("")

  useEffect(() => {
    const rid = window.localStorage.getItem("rid")

    if (rid) {
      setReferral(rid)
    }
  }, [])

  const priceValue = useMemo(() => {
    // divide by 100 because stripe sends the value as a decimal
    return Number(price?.unit_amount_decimal) / 100 || 0.00000958685
  }, [price])

  const tiers = [
    {
      name: getPlanName(PayPlanType.FreetierV0),
      value: PayPlanType.FreetierV0,
      active: "true",
      price: 0,
      priceText: "$0.00",
      cardDescription:
        "Access to reliable, censor resistant infrastructure. Free up to 250k relays per day.",
    },
    {
      name: getPlanName(PayPlanType.PayAsYouGoV0),
      value: PayPlanType.PayAsYouGoV0,
      active: flags.STRIPE_PAYMENT,
      price: priceValue,
      priceText: "pay per relay",
      cardDescription:
        "250k free relays per day, per app. Beyond that, pay only for what you use.",
    },
  ]

  return (
    <section className="create-application">
      <Card>
        <div className="pokt-card-header">
          <h3>Create New App</h3>
        </div>
        <Form method="post">
          <input hidden name="referral-id" type="text" value={referral} />
          <TextInput
            label="Name"
            name="app-name"
            placeholder="New App Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <AppRadioCards
            currentRadio={radioSelectedValue}
            radioData={tiers}
            setRadio={setRadioSelectedValue}
          />
          <Button
            disabled={transition.state === "submitting" || name === ""}
            type="submit"
            variant="filled"
            onClick={() => {
              trackEvent(AmplitudeEvents.EndpointCreation)
            }}
          >
            Create App
          </Button>
          <Text className="termsOfUseText" mb={16} mt={32} size="xs">
            By using this application, you agree to our{" "}
            <a
              href="https://www.pokt.network/site-terms-of-use"
              rel="noreferrer"
              target="_blank"
            >
              Terms of Use
            </a>
            .
          </Text>
        </Form>
        <AppPlansOverview planType={radioSelectedValue} />
        <CalculateYourPricing price={priceValue} />
      </Card>

      {action && (
        <Card>
          <p>{action.message}</p>
        </Card>
      )}
    </section>
  )
}
