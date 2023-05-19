import {
  Button,
  Card,
  Group,
  Title,
  Table,
  IconCheck,
  IconDelete,
  IconCircle,
  IconCircleCheck,
  IconX,
  TextInput,
  Switch,
  Checkbox,
  Box,
} from "@pokt-foundation/pocket-blocks"
import { json, LinksFunction, LoaderFunction } from "@remix-run/node"
import { Form, Link, useLoaderData } from "@remix-run/react"
import { getRequiredServerEnvVar } from "~/utils/environment"

type LoaderData = {
  blockchain: unknown
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const id = params.id
  try {
    const res = await fetch(
      `${getRequiredServerEnvVar("PHD_API_URL")}/v1/blockchain/${id}`,
      {
        headers: {
          Authorization: getRequiredServerEnvVar("PHD_API_KEY"),
          "Content-Type": "application/json",
        },
      },
    )
    const chain = await res.json()

    return json<LoaderData>({
      blockchain: chain,
    })
  } catch (error) {}
}

export default function Analytics() {
  const { blockchain } = useLoaderData() as LoaderData

  console.log(blockchain)

  return (
    <>
      <Group position="apart">
        <Title order={1} mb={32}>
          {blockchain.id}: {blockchain.blockchain}
        </Title>
        <Form>
          <Switch
            mb={16}
            name="active"
            label="Active"
            labelPosition="left"
            checked={blockchain.active}
          />
        </Form>
      </Group>
      <Card mb={32}>
        <Title order={4}>General</Title>
        <Form>
          <TextInput mb={16} name="id" label="ID" defaultValue={blockchain.id} />
          <TextInput
            mb={16}
            name="blockchain"
            label="Blockchain"
            defaultValue={blockchain.blockchain}
          />
          <TextInput
            mb={16}
            name="description"
            label="Description"
            defaultValue={blockchain.description}
          />
          <TextInput
            mb={16}
            name="altruist"
            label="Altruist"
            defaultValue={blockchain.altruist}
          />
          <TextInput
            mb={16}
            name="chainID"
            label="Chain ID"
            defaultValue={blockchain.chainID}
          />
          {/* <Button mt={16} size="sm">
            Save
          </Button> */}
        </Form>
      </Card>
      <Card mb={32}>
        <Title order={4}>Aliases</Title>
        {blockchain.blockchainAliases &&
          blockchain.blockchainAliases.map((alias) => (
            <Box mb={32}>
              <Form>
                <TextInput
                  mb={16}
                  name="redirect_alias"
                  label="Alias"
                  defaultValue={alias}
                />
                {/* <Button mt={16} size="sm">
              Save
            </Button> */}
              </Form>
            </Box>
          ))}
      </Card>
      <Card mb={32}>
        <Title order={4}>Redirects</Title>
        {blockchain.redirects &&
          blockchain.redirects.map((redirect) => (
            <Box mb={32}>
              <Form>
                <TextInput
                  mb={16}
                  name="redirect_alias"
                  label="Alias"
                  defaultValue={redirect.alias}
                />
                <TextInput
                  mb={16}
                  name="redirect_domain"
                  label="Domain"
                  defaultValue={redirect.domain}
                />
                <TextInput
                  mb={16}
                  name="redirect_loadBalancerID"
                  label="Load Balancer ID"
                  defaultValue={redirect.loadBalancerID}
                />
                {/* <Button mt={16} size="sm">
              Save
            </Button> */}
              </Form>
            </Box>
          ))}
      </Card>
      <Card mb={32}>
        <Title order={4}>Sync Check</Title>
        <Form>
          <TextInput
            mb={16}
            name="syncCheckOptions_body"
            label="Body"
            defaultValue={blockchain.syncCheckOptions.body}
          />
          <TextInput
            mb={16}
            name="syncCheckOptions_resultKey"
            label="Result Key"
            defaultValue={blockchain.syncCheckOptions.resultKey}
          />
          <TextInput
            mb={16}
            name="syncCheckOptions_allowance"
            label="Allowance"
            type="number"
            defaultValue={blockchain.syncCheckOptions.allowance}
          />
          {/* <Button mt={16} size="sm">
            Save
          </Button> */}
        </Form>
      </Card>
    </>
  )
}
