import {
  Button,
  Card,
  Flex,
  Loader,
  Switch,
  Text,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { EndpointQuery } from "~/models/portal/sdk"
import { trackEvent, AmplitudeEvents } from "~/utils/analytics"
import useSecurityState from "../../hooks/useSecurityState"
import { useNavigation } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"

interface SecretKeyCardProps {
  endpoint: EndpointQuery["endpoint"]
}

const SecretKeyCard = ({ endpoint }: SecretKeyCardProps) => {
  const navigation = useNavigation()
  const { t } = useTranslate()
  const theme = useMantineTheme()

  const [state, dispatch] = useSecurityState(endpoint, navigation.state)

  const {
    secretKeyRequired,
    saveModalsShown: { isSecretKeySaveShown },
  } = state

  return (
    <Card mb="xl" p="xl">
      <div className="pokt-card-header">
        <h3>{t.security.headings.secretKey}</h3>
        {isSecretKeySaveShown ? (
          <Flex>
            <Button
              mr=".5em"
              px="2em"
              size="sm"
              variant="outline"
              onClick={() => {
                dispatch({
                  type: "SET_SECRET_KEY_REQUIRED",
                  payload: endpoint.gatewaySettings.secretKeyRequired,
                })
                dispatch({
                  type: "SET_SAVE_MODAL_SHOWN",
                  payload: { modal: "isSecretKeySaveShown", shown: false },
                })
              }}
            >
              {t.common.reset}
            </Button>
            <Button
              size="sm"
              sx={{
                padding: "0 2em",
              }}
              type="submit"
              variant="filled"
              onClick={() => {
                trackEvent(AmplitudeEvents.SecuritySettingsUpdate)
              }}
            >
              {t.common.save}
              {navigation.state !== "idle" && (
                <Loader color={theme.colors.blue[5]} ml={8} size="xs" />
              )}
            </Button>
          </Flex>
        ) : null}
      </div>
      <div>
        <Text size="xs">{t.security.secretKeyText}</Text>
        <Flex justify="space-between" mt={16}>
          <Text size="xs">Private Secret Key Required</Text>
          <Switch
            aria-label={t.security.secretSwitchAria}
            checked={secretKeyRequired}
            id="secretRequired"
            name="secretKeyRequired"
            styles={{ track: { cursor: "pointer" } }}
            onChange={(event) => {
              dispatch({
                type: "SET_SECRET_KEY_REQUIRED",
                payload: event.currentTarget.checked,
              })
              dispatch({
                type: "SET_SAVE_MODAL_SHOWN",
                payload: { modal: "isSecretKeySaveShown", shown: true },
              })
            }}
          />
        </Flex>
      </div>
    </Card>
  )
}

export default SecretKeyCard
