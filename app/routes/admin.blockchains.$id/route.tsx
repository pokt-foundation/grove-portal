import {
  Card,
  Group,
  Title,
  TextInput,
  Switch,
  Box,
  Button,
} from "@pokt-foundation/pocket-blocks"
import { ActionFunction, json, LoaderFunction } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import { Blockchain } from "../admin.blockchains/route"
import { getRequiredServerEnvVar } from "~/utils/environment"
import { useState } from "react"

type LoaderData = {
  blockchain: Blockchain
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

export const action: ActionFunction = async ({ request }) => {
  console.log(request)
}

export default function Analytics() {
  const { blockchain } = useLoaderData() as LoaderData

  const [save, setSave] = useState(false)

  // const handleChange = (initialValue, changeValue, stateFunction) => {
  //   if (initialValue === changeValue) {
  //     stateFunction(false)
  //   } else {
  //     stateFunction(true)
  //   }
  // }

  return (
    <Form method="post">
      <Group position="apart">
        <Title mb={32} order={1}>
          {blockchain.id}: {blockchain.blockchain}
        </Title>

        <Switch
          defaultChecked={blockchain.active}
          label="Active"
          labelPosition="left"
          mb={16}
          name="active"
        />
      </Group>
      <Card mb={32}>
        <Title order={4}>General</Title>
        <TextInput
          defaultValue={blockchain.id}
          label="ID"
          mb={16}
          name="id"
          // onChange={(e) =>
          //   handleChange(blockchain.id, e.currentTarget.value, setSave)
          // }
        />
        <TextInput
          defaultValue={blockchain.blockchain}
          label="Blockchain"
          mb={16}
          name="blockchain"
          // onChange={(e) =>
          //   handleChange(blockchain.blockchain, e.currentTarget.value, setSave)
          // }
        />
        <TextInput
          defaultValue={blockchain.description}
          label="Description"
          mb={16}
          name="description"
          // onChange={(e) =>
          //   handleChange(blockchain.description, e.currentTarget.value, setSave)
          // }
        />
        <TextInput
          defaultValue={blockchain.altruist}
          label="Altruist"
          mb={16}
          name="altruist"
          // onChange={(e) =>
          //   handleChange(blockchain.altruist, e.currentTarget.value, setSave)
          // }
        />
        <TextInput
          defaultValue={blockchain.chainID}
          label="Chain ID"
          mb={16}
          name="chainID"
          // onChange={(e) =>
          //   handleChange(blockchain.chainID, e.currentTarget.value, setSave)
          // }
        />
        {save && (
          <Button mt={16} size="sm" type="submit">
            Save
          </Button>
        )}
      </Card>
      <Card mb={32}>
        <Title order={4}>Aliases</Title>
        {blockchain.blockchainAliases &&
          blockchain.blockchainAliases.map((alias) => (
            <Box mb={32}>
              <TextInput
                defaultValue={alias}
                label="Alias"
                mb={16}
                name="redirect_alias"
              />
              {/* <Button mt={16} size="sm">
              Save
            </Button> */}
            </Box>
          ))}
      </Card>
      <Card mb={32}>
        <Title order={4}>Redirects</Title>
        {blockchain.redirects &&
          blockchain.redirects.map((redirect) => (
            <Box mb={32}>
              <TextInput
                defaultValue={redirect.alias}
                label="Alias"
                mb={16}
                name="redirect_alias"
              />
              <TextInput
                defaultValue={redirect.domain}
                label="Domain"
                mb={16}
                name="redirect_domain"
              />
              <TextInput
                defaultValue={redirect.loadBalancerID}
                label="Load Balancer ID"
                mb={16}
                name="redirect_loadBalancerID"
              />
              {/* <Button mt={16} size="sm">
              Save
            </Button> */}
            </Box>
          ))}
      </Card>
      <Card mb={32}>
        <Title order={4}>Sync Check</Title>
        <TextInput
          defaultValue={blockchain.syncCheckOptions.body}
          label="Body"
          mb={16}
          name="syncCheckOptions_body"
        />
        <TextInput
          defaultValue={blockchain.syncCheckOptions.resultKey}
          label="Result Key"
          mb={16}
          name="syncCheckOptions_resultKey"
        />
        <TextInput
          defaultValue={blockchain.syncCheckOptions.allowance}
          label="Allowance"
          mb={16}
          name="syncCheckOptions_allowance"
          type="number"
        />
        {/* <Button mt={16} size="sm">
            Save
          </Button> */}
      </Card>
    </Form>
  )
}
