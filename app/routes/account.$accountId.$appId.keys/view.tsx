import { Divider } from "@mantine/core"
import { Box, Group, PasswordInput, Stack, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import CopyTextButton from "~/components/CopyTextButton"
import { EndpointQuery, RoleName } from "~/models/portal/sdk"

type AppKeysProps = {
  endpoint: EndpointQuery["endpoint"]
  role: RoleName | undefined
}

const AppKeys = ({ endpoint, role }: AppKeysProps) => {
  const publicKey = endpoint.apps ? endpoint.apps[0]?.publicKey : ""
  const secretKey = endpoint.gatewaySettings.secretKey
  return (
    <Stack spacing={0}>
      <Box px={40} py={20}>
        <Text fw={600}>Portal ID</Text>
        <Text fw={400} pt={8}>
          Unique identifier for the app. This string is included as part of the URL for
          each endpoint.
        </Text>
        <Group mt={20}>
          <PasswordInput
            readOnly
            aria-label="Portal ID"
            sx={{ flex: 1 }}
            value={endpoint.id}
          />
          <CopyTextButton value={endpoint.id} />
        </Group>
      </Box>

      <Divider mt={28} />

      {endpoint.gatewaySettings.secretKey && role !== RoleName.Member && (
        <Box px={40} py={20}>
          <Text fw={600}>Secret Key</Text>
          <Text fw={400} pt={8}>
            Security feature for apps. If “Private Secret Key Required” is selected in the
            security settings, the secret key will need to be sent along with the request
            using HTTP Basic Authentication.
          </Text>
          <Group mt={20}>
            <PasswordInput
              readOnly
              aria-label="Secret Key"
              sx={{ flex: 1 }}
              value={secretKey}
            />
            <CopyTextButton value={secretKey} />
          </Group>
        </Box>
      )}

      <Divider mt={28} />

      {publicKey && (
        <Box px={40} py={20}>
          <Text fw={600}>Public Key</Text>
          <Text fw={400} pt={8}>
            Unique identifier for a given app that will allow you to inspect the app's
            activity on-chain.
          </Text>
          <Group mt={20}>
            <PasswordInput
              readOnly
              aria-label="Public Key"
              sx={{ flex: 1 }}
              value={publicKey}
            />
            <CopyTextButton value={publicKey} />
          </Group>
        </Box>
      )}
      <Divider mt={28} />
    </Stack>
  )
}

export default AppKeys
