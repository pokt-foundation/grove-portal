import { Box, Grid, Group, Loader, Radio, RadioGroup, Text, Title } from "@mantine/core"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { Form, Link, useLoaderData, useActionData, useTransition } from "@remix-run/react"
import clsx from "clsx"
import { forwardRef, useState } from "react"
import ReactHtmlParser from "react-html-parser"
import invariant from "tiny-invariant"
import ChainWithImage, {
  AppEndpointProps,
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import Button from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Select, { links as SelectLinks } from "~/components/shared/Select"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useFeatureFlags } from "~/context/FeatureFlagContext"
import { initPortalClient } from "~/models/portal/portal.server"
import { Stripe, stripe } from "~/models/stripe.server"
import styles from "~/styles/dashboard.apps.create.css"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getErrorMessage } from "~/utils/catchError"
import { CHAIN_ID_PREFIXES } from "~/utils/chainUtils"
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
    ...SelectLinks(),
    ...ChainWithImageLinks(),
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

const SelectItem = forwardRef<HTMLDivElement, AppEndpointProps>(
  ({ chain, label, ...others }: AppEndpointProps, ref) => (
    <div ref={ref} {...others}>
      <ChainWithImage chain={chain} label={label} />
    </div>
  ),
)

export default function CreateApp() {
  const chains = Array.from(CHAIN_ID_PREFIXES.entries()).map(([id, { name }]) => ({
    chain: name,
    label: name,
    value: id,
  }))
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

  const planDetailsTitles = {
    pricing: "Pricing",
    relayLimit: "Relay Limit",
    chainAccess: "Chain Access",
    appsLimit: "Apps Limit",
  }

  const planDetails = {
    paid: {
      title: "Pay As You Go",
      description:
        "250k free relays per day, per app. Beyond that, pay only for what you use. The counter resets every 24h but you’ll only get billed monthly. Even better, after 24 months of paid relays, you’ll receive POKT to stake for continued service. No more payments.",
      description2: "No more sunk costs. Just fast, reliable infrastructure.",
      pricing: "Pay per relay + 250K Free Relays",
      relayLimit: "No limit",
      appsLimit: "Up to 2 Applicaitions",
      moreApps: "Need more apps? Contact us",
      chainAccess: "No limit",
    },
    free: {
      title: "Always Free",
      description:
        "Access to reliable, censor resistant infrastructure. Free up to 250k relays per day.",
      description2: "",
      pricing: "$0.00",
      relayLimit: "250k per app per day",
      appsLimit: "Up to 2 Applicaitions",
      moreApps: "Need more apps? Contact us",
      chainAccess: "No limit",
    },
    enterprise: {
      title: tiers[2].name,
      description:
        "Relays, applications, and pricing, all custom tailored to fit your specific needs.",
      description2: "No more sunk costs. Just fast, reliable infrastructure.",
      pricing: "based on your needs",
      relayLimit: "No limit",
      appsLimit: "based on your needs",
      moreApps: "",
      chainAccess: "No limit",
    },
  }

  console.log(`flag stripe payment = ${flags.STRIPE_PAYMENT}`)

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
        <Box sx={{ textAlign: "left" }}>
          <Title className="plan-data-overview title" mb={16} mt={32} order={3}>
            Flexible plans that grow with your app
          </Title>
          <Text mb={32}>
            Scalable plans because your needs change as yous app grows. All plans access
            to Pocket Network multichain infrastructure with our chain!
          </Text>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          <Title className="plan-data title" mb={16} mt={32} order={3}>
            {planDetails[radioSelectedValue as keyof typeof planDetails].title}
          </Title>
          <Text mb={32}>
            {planDetails[radioSelectedValue as keyof typeof planDetails].description}
          </Text>
          <Text mb={32}>
            {planDetails[radioSelectedValue as keyof typeof planDetails].description2}
          </Text>
        </Box>
        <Grid>
          <Grid.Col sm={3} xs={12}>
            <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
              {planDetailsTitles.pricing}
            </Title>
            <Text mb={32}>
              {ReactHtmlParser(
                planDetails[radioSelectedValue as keyof typeof planDetails].pricing,
              )}
            </Text>
          </Grid.Col>
          <Grid.Col sm={3} xs={12}>
            <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
              {planDetailsTitles.relayLimit}
            </Title>
            <Text mb={32}>
              {planDetails[radioSelectedValue as keyof typeof planDetails].relayLimit}
            </Text>
          </Grid.Col>
          <Grid.Col sm={3} xs={12}>
            <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
              {planDetailsTitles.chainAccess}
            </Title>
            <Text mb={32}>
              {planDetails[radioSelectedValue as keyof typeof planDetails].chainAccess}
            </Text>
          </Grid.Col>
          <Grid.Col sm={3} xs={12}>
            <Title className="plan-data-highlights" mb={16} mt={32} order={4}>
              {planDetailsTitles.appsLimit}
            </Title>
            <Text mb={32}>
              {planDetails[radioSelectedValue as keyof typeof planDetails].appsLimit}
            </Text>
          </Grid.Col>
        </Grid>
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
