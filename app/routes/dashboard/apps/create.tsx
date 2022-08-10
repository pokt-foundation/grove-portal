import { Group, Loader, LoadingOverlay, Text } from "@mantine/core"
import { ActionFunction, json, MetaFunction, redirect } from "@remix-run/node"
import { Form, Link, useActionData, useTransition } from "@remix-run/react"
import { forwardRef, useRef } from "react"
import invariant from "tiny-invariant"
import ChainWithImage, {
  AppEndpointProps,
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import Button from "~/components/shared/Button"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Select, { links as SelectLinks } from "~/components/shared/Select"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { initPortalClient } from "~/models/portal/portal.server"
import { getErrorMessage } from "~/utils/catchError"
import { UserApplication, postLBUserApplication } from "~/models/portal.server"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { CHAIN_ID_PREFIXES } from "~/utils/chainUtils"
import { requireUser } from "~/utils/session.server"

export const meta: MetaFunction = () => {
  return {
    title: "Create New Application",
  }
}

export const links = () => {
  return [...CardLinks(), ...TextInputLinks(), ...SelectLinks(), ...ChainWithImageLinks()]
}

type ActionData = {
  error: true
  message: string
}

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const formData = await request.formData()
  const name = formData.get("app-name")
  const chain = formData.get("app-chain")

  invariant(name && typeof name === "string", "app name not found")
  invariant(chain && typeof chain === "string", "app name not found")

  try {
    const { createNewEndpoint } = await portal.createEndpoint({
      input: {
        name,
        notificationSettings: {
          signedUp: true,
          quarter: false,
          half: false,
          threeQuarters: true,
          full: true,
        },
        gatewaySettings: {
          secretKeyRequired: false,
          whitelistBlockchains: [],
          whitelistContracts: [],
          whitelistMethods: [],
          whitelistOrigins: [],
          whitelistUserAgents: [],
        },
      },
    })

    return redirect(`/dashboard/apps/${createNewEndpoint?.id}`)
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
  const transition = useTransition()
  const action = useActionData() as ActionData
  return (
    <>
      <section>
        <Card>
          <div className="pokt-card-header">
            <h3>Pocket Network Sponsor Stake</h3>
          </div>
          <div>
            <Text mb={32}>
              Your application will receive up to 1M free daily relays to connect to any
              of our suported chains, provided by Pocket Network Inc.
            </Text>
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
            <div>
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
            </div>
            <Group align="center" position="apart">
              <Button
                disabled={transition.state === "submitting"}
                type="submit"
                onClick={() => {
                  trackEvent(AmplitudeEvents.EndpointCreation)
                }}
              >
                Launch Application
                {transition.state !== "idle" && <Loader ml="sm" size={16} />}
              </Button>
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
    </>
  )
}
