import { Group, Text } from "@mantine/core"
import { ActionFunction, MetaFunction, redirect } from "@remix-run/node"
import { Form, Link } from "@remix-run/react"
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
import { initPortalClient } from "~/models/portal/portal.server"
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

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request)
  const portal = initPortalClient(user.accessToken)
  const formData = await request.formData()
  const name = formData.get("app-name")
  const chain = formData.get("app-chain")

  invariant(name && typeof name === "string", "app name not found")
  invariant(chain && typeof chain === "string", "app name not found")

  // TODO: chain is not currently supported in new API
  const { createNewEndpoint } = await portal.createEndpoint({
    input: {
      name,
    },
  })

  return redirect(`/dashboard/apps/${createNewEndpoint?.id}`)
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
            <TextInput name="app-name" label="Name" placeholder="New App Name" />
            <Select
              name="app-chain"
              label="Chain"
              placeholder="Select Chain"
              searchable
              nothingFound="No options"
              itemComponent={SelectItem}
              data={chains}
              filter={(value, item) =>
                item.chain.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.value.toLowerCase().includes(value.toLowerCase().trim())
              }
            />
            <div>
              <Text size="xs" mt={32} mb={16}>
                By using this application and the service, you agree to our{" "}
                <a
                  href="https://www.pokt.network/site-terms-of-use"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms of Use
                </a>
                .
              </Text>
            </div>
            <Group align="center" position="apart">
              <Button type="submit">Launch Application</Button>
              <Button component={Link} to="/dashboard/apps" variant="subtle">
                Back
              </Button>
            </Group>
          </Form>
        </Card>
      </section>
    </>
  )
}
