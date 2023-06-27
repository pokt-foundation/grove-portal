import {
  Badge,
  Button,
  Flex,
  Loader,
  useMantineTheme,
  Card,
  IconPlus,
  Text,
} from "@pokt-foundation/pocket-blocks"
import { Blockchain, EndpointQuery } from "~/models/portal/sdk"
import { useNavigation } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"
import useSecurityState, {
  FormatData,
  WhitelistMethodType,
  formatData,
} from "../../hooks/useSecurityState"
import ChainsDropdown from "~/components/ChainsDropdown/ChainsDropdown"
import AppEndpointUrl from "~/components/application/AppEndpointUrl"
import { blockchains } from "~/models/portal/portal.data"
import { trackEvent, AmplitudeEvents } from "~/utils/analytics"
import { getImageForChain } from "~/utils/known-chains/known-chains"

interface WhitelistMethodsCardProps {
  endpoint: EndpointQuery["endpoint"]
}

const WhitelistMethodsCard = ({ endpoint }: WhitelistMethodsCardProps) => {
  const navigation = useNavigation()
  const { t } = useTranslate()
  const theme = useMantineTheme()

  const [state, dispatch] = useSecurityState(endpoint, navigation.state)

  const {
    whitelistMethods,
    whitelistMethodsDropdown,
    whitelistMethodsInput,
    saveModalsShown: { isWhitelistMethodsSaveShown },
  } = state

  const whitelistMethodsDropdownChain =
    blockchains.find((chain) => chain?.id === whitelistMethodsDropdown)?.description || ""

  return (
    <Card mb="xl">
      <div className="pokt-card-header">
        <h3>{t.security.headings.methods}</h3>
        {isWhitelistMethodsSaveShown ? (
          <Flex>
            <Button
              mr=".5em"
              px="2em"
              size="sm"
              variant="outline"
              onClick={() => {
                dispatch({
                  type: "SET_WHITELIST_METHODS",
                  payload: formatData<WhitelistMethodType>(
                    endpoint.gatewaySettings?.whitelistMethods,
                    "methods",
                  ),
                })
                dispatch({
                  type: "SET_SAVE_MODAL_SHOWN",
                  payload: { modal: "isWhitelistMethodsSaveShown", shown: false },
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
      <Text size="sm">{t.security.whitelistMethodsText}</Text>
      <Flex align="center" gap="xs" mb="xs" w="100%">
        <ChainsDropdown
          chains={blockchains}
          onChange={(val: string) =>
            dispatch({ type: "SET_WHITELIST_METHODS_DROPDOWN", payload: val })
          }
        />
        {whitelistMethodsDropdownChain ? (
          <Badge
            fullWidth
            color="gray"
            leftSection={
              getImageForChain(whitelistMethodsDropdownChain) ? (
                <img
                  alt={whitelistMethodsDropdownChain}
                  height={16}
                  src={getImageForChain(whitelistMethodsDropdownChain)}
                />
              ) : null
            }
            p="12px 0"
            sx={{
              borderRadius: "8px",
            }}
            variant="outline"
            w={100}
          >
            {whitelistMethodsDropdownChain.substring(0, 3).toUpperCase()}
          </Badge>
        ) : null}
        <input
          className="grow userInputs"
          name="whitelistMethodsInput"
          placeholder={t.security.methodPlaceholder}
          value={whitelistMethodsInput}
          onChange={(e) => {
            dispatch({ type: "SET_WHITELIST_METHODS_INPUT", payload: e.target.value })
          }}
        />
        {whitelistMethodsInput !== "" && whitelistMethodsDropdown !== "" ? (
          <Button
            aria-label={t.security.methodAria}
            size="xs"
            type="button"
            variant="outline"
            onClick={() => {
              if (whitelistMethodsInput === "" || whitelistMethodsDropdown === "") {
              } else {
                dispatch({
                  type: "SET_WHITELIST_METHODS",
                  payload: [
                    ...whitelistMethods,
                    {
                      id: whitelistMethodsDropdown,
                      inputValue: whitelistMethodsInput,
                    },
                  ],
                })
                dispatch({ type: "SET_WHITELIST_METHODS_INPUT", payload: "" })
                dispatch({ type: "SET_WHITELIST_METHODS_DROPDOWN", payload: "" })
                dispatch({
                  type: "SET_SAVE_MODAL_SHOWN",
                  payload: { modal: "isWhitelistMethodsSaveShown", shown: true },
                })
              }
            }}
          >
            <IconPlus height="18px" style={{ marginRight: "10px" }} width="18px" /> Add
          </Button>
        ) : null}
      </Flex>
      <div>
        {whitelistMethods.map((item) => {
          const blockchain: Blockchain | undefined | null = blockchains.find(
            (c) => c?.id === item.id,
          )
          return (
            <div key={`${item.id} ${item.inputValue}`} className="list">
              <AppEndpointUrl
                hasDelete
                readOnly
                chain={blockchain}
                handleRemove={() => {
                  const newArray = whitelistMethods.filter((obj: FormatData) =>
                    !obj["inputValue"].includes(item.inputValue) ? obj : null,
                  )
                  dispatch({ type: "SET_WHITELIST_METHODS", payload: newArray })

                  dispatch({
                    type: "SET_SAVE_MODAL_SHOWN",
                    payload: { modal: "isWhitelistMethodsSaveShown", shown: true },
                  })
                }}
                value={item.inputValue}
              />
              <input name="whitelistMethodsChains" type="hidden" value={item.id} />
              <input
                name="whitelistMethodsValues"
                type="hidden"
                value={item.inputValue}
              />
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default WhitelistMethodsCard
