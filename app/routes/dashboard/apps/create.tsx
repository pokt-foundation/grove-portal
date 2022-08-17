import { Box, Grid, Group, Loader, Text, Title } from "@mantine/core"
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node"
import { Form, Link, useLoaderData, useActionData, useTransition } from "@remix-run/react"
import { forwardRef } from "react"
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
  return [...CardLinks(), ...TextInputLinks(), ...SelectLinks(), ...ChainWithImageLinks()]
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

  const tiers = [
    {
      name: "Always Free",
      value: "free",
      active: "true",
    },
    {
      name: "Pay As You Go",
      value: "paid",
      active: flags.STRIPE_PAYMENT,
    },
    {
      name: "Enterprise",
      value: "enterprise",
      active: flags.ENTERPRISE,
    },
  ]

  return (
    <section>
      <Card>
        <div className="pokt-card-header">
          <h3>Create New App</h3>
        </div>
        <Form method="post">
          <TextInput label="Name" name="app-name" placeholder="New App Name" />
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
          {/* TODO: add feature flag wrap */}
          {price && (
            <Box sx={{ textAlign: "center" }}>
              <Title mb={16} mt={32} order={3}>
                Flexible plans that grow with your app
              </Title>
              <Text mb={32}>
                Scalable plans because your needs change as yous app grows. All plans
                access to Pocket Network multichain infrastructure with our chain!
              </Text>
              <Grid align="center">
                {tiers.map((tier, index) => (
                  <Grid.Col key={tier.name} sm={4} xs={12}>
                    <Card>
                      <div>
                        <h4>{tier.name}</h4>
                        <p>
                          {tier.active && price.tiers![index]
                            ? price.tiers![index].unit_amount_decimal
                            : "0"}
                        </p>
                      </div>
                      <div>
                        {tier.active === "true" ? (
                          <Button
                            disabled={transition.state === "submitting"}
                            name="app-subscription"
                            type="submit"
                            value={tier.value}
                            onClick={() => {
                              trackEvent(AmplitudeEvents.EndpointCreation)
                            }}
                          >
                            Select
                          </Button>
                        ) : (
                          <Button disabled name="app-subscription" type="submit" value="">
                            Coming Soon!
                          </Button>
                        )}
                      </div>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          )}

          <Text mb={16} mt={32} size="xs">
            By using this application and the service, you agree to our{" "}
            <a
              href="https://www.pokt.network/site-terms-of-use"
              rel="noreferrer"
              target="_blank"
            >
              Terms of Use
            </a>
            .
          </Text>
          <Group align="center" position="apart">
            {price ? (
              <div></div>
            ) : (
              <Button name="subscription" type="submit" value="free">
                Launch Application
              </Button>
            )}
            <Button component={Link} to="/dashboard/apps" variant="subtle">
              Back
            </Button>
          </Group>
        </Form>
      </Card>
      {action && (
        <Card>
          <p>{action.message}</p>
        </Card>
      )}
    </section>
  )
}
