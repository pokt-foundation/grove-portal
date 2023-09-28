import { Stack, Switch, Text } from "@pokt-foundation/pocket-blocks"
import { Form, useSubmit } from "@remix-run/react"

type PrivateSecretKeyProps = {
  secretKeyRequired: boolean
}

const PrivateSecretKey = ({ secretKeyRequired }: PrivateSecretKeyProps) => {
  const submit = useSubmit()

  return (
    <Stack px={40} py={32}>
      <Text fw={600}>Secret Key Required</Text>
      <Text>
        To maximize the security of your application, you should activate the private
        secret key for all requests and enable the use of whitelisted user-agents and
        origins.
      </Text>
      <Form method="post" onChange={(event) => submit(event.currentTarget)}>
        <Switch
          aria-label="Private Secret Key Required"
          defaultChecked={Boolean(secretKeyRequired)}
          id="secretRequired"
          name="secretKeyRequired"
        />
      </Form>
    </Stack>
  )
}

export default PrivateSecretKey
