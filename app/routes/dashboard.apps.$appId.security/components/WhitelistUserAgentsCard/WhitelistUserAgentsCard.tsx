import {
  Button,
  Card,
  Flex,
  IconPlus,
  Loader,
  TextInput,
  Text,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { useNavigation } from "@remix-run/react"
import useSecurityState from "../../hooks/useSecurityState"
import { addIfMissing } from "../../utils/utils"
import CopyText from "~/components/CopyText"
import Delete from "~/components/Delete/Delete"
import { useTranslate } from "~/context/TranslateContext"
import { EndpointQuery } from "~/models/portal/sdk"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

interface WhitelistUserAgentsCardProps {
  endpoint: EndpointQuery["endpoint"]
}

const WhitelistUserAgentsCard = ({ endpoint }: WhitelistUserAgentsCardProps) => {
  const navigation = useNavigation()
  const { t } = useTranslate()
  const theme = useMantineTheme()

  const [state, dispatch] = useSecurityState(endpoint, navigation.state)

  const {
    whitelistUserAgents,
    whitelistUserAgentsInput,
    saveModalsShown: { isWhitelistUserAgentsSaveShown },
  } = state
  return (
    <Card mb="xl" p="xl">
      <div className="pokt-card-header">
        <h3>{t.security.headings.userAgents}</h3>
        {isWhitelistUserAgentsSaveShown ? (
          <Flex>
            <Button
              mr=".5em"
              px="2em"
              size="sm"
              variant="outline"
              onClick={() => {
                dispatch({
                  type: "SET_WHITELIST_USER_AGENTS",
                  payload: endpoint.gatewaySettings.whitelistUserAgents as string[],
                })
                dispatch({
                  type: "SET_SAVE_MODAL_SHOWN",
                  payload: { modal: "isWhitelistUserAgentsSaveShown", shown: false },
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
      <Text size="sm">{t.security.whitelistUserAgentsText}</Text>
      <Flex align="center" gap="md" mt="lg">
        <TextInput
          id="userAgents"
          name="whitelistUserAgentsInput"
          placeholder={t.security.userAgentPlaceholder}
          value={whitelistUserAgentsInput}
          w="100%"
          onChange={(e) => {
            dispatch({
              type: "SET_WHITELIST_USER_AGENTS_INPUT",
              payload: e.target.value,
            })
          }}
        />
        {whitelistUserAgentsInput !== "" ? (
          <Button
            aria-label={t.security.userAgentAria}
            size="xs"
            type="button"
            variant="outline"
            onClick={() => {
              dispatch({
                type: "SET_WHITELIST_USER_AGENTS",
                payload: addIfMissing(whitelistUserAgentsInput, whitelistUserAgents),
              })
              dispatch({ type: "SET_WHITELIST_USER_AGENTS_INPUT", payload: "" })
              dispatch({
                type: "SET_SAVE_MODAL_SHOWN",
                payload: { modal: "isWhitelistUserAgentsSaveShown", shown: true },
              })
            }}
          >
            <IconPlus height="18px" style={{ marginRight: "10px" }} width="18px" /> Add
          </Button>
        ) : null}
      </Flex>
      <div>
        {whitelistUserAgents.map((item: string) => (
          <Flex key={item} align="center" mt="md" w="100%">
            <TextInput readOnly mr="xs" value={item} w="100%"></TextInput>
            <CopyText text={String(item)} />
            <Delete
              onDelete={() => {
                const newArray = whitelistUserAgents.filter((i) => i !== item)
                dispatch({ type: "SET_WHITELIST_USER_AGENTS", payload: newArray })
                dispatch({
                  type: "SET_SAVE_MODAL_SHOWN",
                  payload: { modal: "isWhitelistUserAgentsSaveShown", shown: true },
                })
              }}
            />
            <input name="whitelistUserAgents" type="hidden" value={item} />
          </Flex>
        ))}
      </div>
    </Card>
  )
}

export default WhitelistUserAgentsCard
