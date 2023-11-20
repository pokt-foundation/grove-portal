import {
  Divider,
  Box,
  Group,
  MantineTheme,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import CopyTextButton from "~/components/CopyTextButton"
import { PortalApp, RoleName } from "~/models/portal/sdk"
import { trackEvent, AnalyticCategories, AnalyticActions } from "~/utils/analytics"

type AppKeysProps = {
  app: PortalApp
  userRole: RoleName
}

const AppKeys = ({ app, userRole }: AppKeysProps) => {
  // We shouldnt be using this value. The statement about it below is not true.
  //
  // const publicKey = app.aats ? app.aats[0].aat.publicKey : ""

  const secretKey = app.settings.secretKey
  return (
    <Stack spacing={0}>
      <Box py={20}>
        <Text fw={600}>App ID</Text>
        <Text fw={400} pt={8}>
          Unique identifier for the app. This string is included as part of the URL for
          each endpoint.
        </Text>
        <Group
          mt={20}
          onClick={() => {
            trackEvent({
              category: AnalyticCategories.app,
              action: AnalyticActions.app_keys_app_id,
              label: app.id,
            })
          }}
        >
          <TextInput
            readOnly
            aria-label="App ID"
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

      {secretKey && userRole !== RoleName.Member && (
        <>
          <Box py={20}>
            <Text fw={600}>Secret Key</Text>
            <Text fw={400} pt={8}>
              Security feature for apps. If “Private Secret Key Required” is selected in
              the security settings, the secret key will need to be sent along with the
              request using HTTP Basic Authentication.
            </Text>
            <Group
              mt={20}
              onClick={() => {
                trackEvent({
                  category: AnalyticCategories.app,
                  action: AnalyticActions.app_keys_secret,
                })
              }}
            >
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
