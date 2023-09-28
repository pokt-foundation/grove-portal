import { Divider } from "@mantine/core"
import {
  Box,
  Group,
  MantineTheme,
  PasswordInput,
  Stack,
  Text,
} from "@pokt-foundation/pocket-blocks"
import CopyTextButton from "~/components/CopyTextButton"
import { PortalApp, RoleNameV2 } from "~/models/portal/sdk"

type AppKeysProps = {
  app: PortalApp
  userRole: RoleNameV2
}

const AppKeys = ({ app, userRole }: AppKeysProps) => {
  // We shouldnt be using this value. The statement about it below is not true.
  //
  // const publicKey = app.aats ? app.aats[0].aat.publicKey : ""

  const secretKey = app.settings.secretKey
  return (
    <Stack spacing={0}>
      <Box px={40} py={20}>
        <Text fw={600}>App ID</Text>
        <Text fw={400} pt={8}>
          Unique identifier for the app. This string is included as part of the URL for
          each endpoint.
        </Text>
        <Group mt={20}>
          <PasswordInput
            readOnly
            aria-label="Portal ID"
            sx={(theme: MantineTheme) => ({
              flex: 1,
              backgroundColor: theme.colors.gray[9],
            })}
            value={app.id}
          />
          <CopyTextButton value={app.id} />
        </Group>
      </Box>

      <Divider mt={28} />

      {secretKey && userRole !== RoleNameV2.Member && (
        <>
          <Box px={40} py={20}>
            <Text fw={600}>Secret Key</Text>
            <Text fw={400} pt={8}>
              Security feature for apps. If “Private Secret Key Required” is selected in
              the security settings, the secret key will need to be sent along with the
              request using HTTP Basic Authentication.
            </Text>
            <Group mt={20}>
              <PasswordInput
                readOnly
                aria-label="Secret Key"
                sx={(theme: MantineTheme) => ({
                  flex: 1,
                  backgroundColor: theme.colors.gray[9],
                })}
                value={secretKey}
              />
              <CopyTextButton value={secretKey} />
            </Group>
          </Box>
          <Divider mt={28} />
        </>
      )}
    </Stack>
  )
}

export default AppKeys
