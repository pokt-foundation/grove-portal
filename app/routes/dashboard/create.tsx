import { Grid, Radio, Text } from "@mantine/core"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { Form, useLoaderData, useActionData, useTransition } from "@remix-run/react"
import clsx from "clsx"
import { forwardRef, useState } from "react"
import invariant from "tiny-invariant"
import AppPlansOverview, {
  links as AppPlansOverviewLinks,
} from "~/components/application/AppPlansOverview"
// import ChainWithImage, {
//   AppEndpointProps,
//   links as ChainWithImageLinks,
// } from "~/components/application/ChainWithImage"
import Button from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
// import Select, { links as SelectLinks } from "~/components/shared/Select"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useFeatureFlags } from "~/context/FeatureFlagContext"
import { initPortalClient } from "~/models/portal/portal.server"
import { Stripe, stripe } from "~/models/stripe.server"
import styles from "~/styles/dashboard.apps.create.css"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getErrorMessage } from "~/utils/catchError"
// import { CHAIN_ID_PREFIXES } from "~/utils/chainUtils"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { requireUser } from "~/utils/session.server"

export const meta: MetaFunction = () => {
  return {
    title: "Create New Application",
  }
}

export const links = () => {
  return [
    ...CardLinks(),
    ...TextInputLinks(),
    //...SelectLinks(),
    //...ChainWithImageLinks(),
    ...AppPlansOverviewLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

type LoaderData = {
  price: Stripe.Price | void
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request)

  const priceID = getRequiredServerEnvVar("STRIPE_PRICE_ID")
  const price = await stripe.prices
    .retrieve(priceID, {
      expand: ["tiers"],
    })
    .catch((error) => {
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
  const chain = formData.get("app-chain")

  invariant(
    subscription && typeof subscription === "string",
    "app subscription not found",
  )
  invariant(name && typeof name === "string", "app name not found")
  invariant(chain && typeof chain === "string", "app name not found")

  try {
    const { createNewEndpoint } = await portal.createEndpoint({
      name,
    })

    if (!createNewEndpoint) {
      throw new Error("portal api could not create new endpoint")
    }

    if (subscription === "paid") {
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

// const SelectItem = forwardRef<HTMLDivElement, AppEndpointProps>(
//   ({ chain, label, ...others }: AppEndpointProps, ref) => (
//     <div ref={ref} {...others}>
//       <ChainWithImage chain={chain} label={label} />
//     </div>
//   ),
// )

export default function CreateApp() {
  // const chains = Array.from(CHAIN_ID_PREFIXES.entries()).map(([id, { name }]) => ({
  //   chain: name,
  //   label: name,
  //   value: id,
  // }))
  const { flags } = useFeatureFlags()
  const { price } = useLoaderData() as LoaderData
  const transition = useTransition()
  const action = useActionData() as ActionData
  const [radioSelectedValue, setRadioSelectedValue] = useState("free")

  const tiers = [
    {
      name: "Always Free",
      value: "free",
      active: "true",
      price: 0,
      priceText: "$0.00",
      cardDescription:
        "Access to reliable, censor resistant infrastructure. Free up to 250k relays per day.",
    },
    {
      name: "Pay As You Go",
      value: "paid",
      active: flags.STRIPE_PAYMENT,
      price: price?.tiers![1].unit_amount_decimal || 0.0000123,
      priceText: "pay per relay",
      cardDescription:
        "250k free relays per day, per app. Beyond that, pay only for what you use.",
    },
    {
      name: "Enterprise",
      value: "enterprise",
      active: flags.ENTERPRISE,
      price: 0,
      priceText: "custom fit",
      cardDescription: "Custom solution for large enterprises.",
    },
  ]

  return (
    <section className="create-application">
      <Card>
        <div className="pokt-card-header">
          <h3>Create New App</h3>
        </div>
        <Form method="post">
          <TextInput label="Name" name="app-name" placeholder="New App Name" />
          {/* // removing for now as it functionally serves almost no purpose
            <Select
            searchable
            data={chains}
            filter={(value, item) =>
              item.chain.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
            itemComponent={SelectItem}
            label="Chain"
            name="app-chain"
            nothingFound="No options"
            placeholder="Select Chain"
          /> 
          */}
          {/* TO DO componentize radio-cards */}
          <Grid align="center" className="radio-card-grid">
            {tiers.map((tier) => (
              <Grid.Col key={tier.name} sm={4} xs={12}>
                <div
                  className={clsx(
                    "radio-card",
                    tier.value === radioSelectedValue ? "active" : null,
                  )}
                  onClick={() =>
                    tier.active === "true" && setRadioSelectedValue(tier.value)
                  }
                >
                  <Radio
                    readOnly
                    checked={tier.value === radioSelectedValue}
                    disabled={tier.active != "true"}
                    label={tier.name}
                    value={tier.name}
                  />
                  <p>{tier.priceText}</p>
                  <p>{tier.cardDescription}</p>
                </div>
              </Grid.Col>
            ))}
          </Grid>
          <Button
            disabled={transition.state === "submitting"}
            name="app-subscription"
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

        {/* TO DO add in calculator component
        <Calculator />
              */}
      </Card>

      {action && (
        <Card>
          <p>{action.message}</p>
        </Card>
      )}
    </section>
  )
}
