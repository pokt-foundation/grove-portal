import {
  Button,
  Text,
  Switch,
  Loader,
  Group,
  Flex,
  useMantineTheme,
  TextInput,
  IconPlus,
  Box,
  Badge,
} from "@pokt-foundation/pocket-blocks"
import { useFetcher, useNavigation } from "@remix-run/react"
import { forwardRef } from "react"
import React from "react"
import useSecurityState, {
  FormatData,
  WhitelistContractType,
  WhitelistMethodType,
  formatData,
} from "./hooks/useSecurityState"
import styles from "./styles.css"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import Card, { links as CardLinks } from "~/components/Card"
import ChainsDropdown from "~/components/ChainsDropdown/ChainsDropdown"
import CopyText from "~/components/CopyText"
import Delete from "~/components/Delete/Delete"
import { useTranslate } from "~/context/TranslateContext"
import { Blockchain, BlockchainsQuery } from "~/models/portal/sdk"
import { EndpointQuery } from "~/models/portal/sdk"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { getImageForChain } from "~/utils/known-chains/known-chains"
import SecretKeyCard from "./components/SecretKeyCard/SecretKeyCard"
import WhitelistBlockchainsCard from "./components/WhitelistBlockchainsCard/WhitelistBlockchainsCard"
import WhitelistUserAgentsCard from "./components/WhitelistUserAgentsCard/WhitelistUserAgentsCard"
import { addIfMissing } from "./utils/utils"
import WhitelistOriginsCard from "./components/WhitelistOriginsCard/WhitelistOriginsCard"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...AppEndpointUrlLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type SecurityViewProps = {
  endpoint: EndpointQuery["endpoint"]
  appId: string | undefined
  blockchains: BlockchainsQuery["blockchains"]
}

const SelectItem = forwardRef<HTMLDivElement, { label: string; value: string }>(
  ({ label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text>{label}</Text>
      </Group>
    </div>
  ),
)

SelectItem.displayName = "SelectItem"

export const SecurityView = ({ endpoint, appId, blockchains }: SecurityViewProps) => {
  const navigation = useNavigation()
  const { t } = useTranslate()
  const securityAction = useFetcher()
  const theme = useMantineTheme()

  const [state, dispatch] = useSecurityState(endpoint, navigation.state)

  const {
    saveModalsShown: {
      isSecretKeySaveShown,
      isApprovedChainsSaveShown,
      isWhitelistUserAgentsSaveShown,
      isWhitelistOriginsSaveShown,
      isWhitelistContractsSaveShown,
      isWhitelistMethodsSaveShown,
    },
    secretKeyRequired,
    whitelistBlockchains,
    whitelistUserAgents,
    whitelistUserAgentsInput,
    whitelistOrigins,
    whitelistOriginsInput,
    whitelistContracts,
    whitelistContractsInput,
    whitelistContractsDropdown,
    whitelistMethods,
    whitelistMethodsInput,
    whitelistMethodsDropdown,
  } = state

  const whitelistContractsDropdownChain =
    blockchains.find((chain) => chain?.id === whitelistContractsDropdown)?.description ||
    ""

  const whitelistMethodsDropdownChain =
    blockchains.find((chain) => chain?.id === whitelistMethodsDropdown)?.description || ""

  return (
    <div className="security">
      <securityAction.Form action={`/api/${appId}/settings`} method="post">
        <input name="appID" type="hidden" value={appId} />
        <SecretKeyCard endpoint={endpoint} />
        <WhitelistBlockchainsCard blockchains={blockchains} endpoint={endpoint} />
        <WhitelistUserAgentsCard endpoint={endpoint} />
        <WhitelistOriginsCard endpoint={endpoint} />
        <Card>
          <div className="pokt-card-header">
            <h3>{t.security.headings.contracts}</h3>
            {isWhitelistContractsSaveShown ? (
              <Flex>
                <Button
                  mr=".5em"
                  px="2em"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    dispatch({
                      type: "SET_WHITELIST_CONTRACTS",
                      payload: formatData<WhitelistContractType>(
                        endpoint.gatewaySettings?.whitelistContracts,
                        "contracts",
                      ),
                    })
                    dispatch({
                      type: "SET_SAVE_MODAL_SHOWN",
                      payload: { modal: "isWhitelistContractsSaveShown", shown: false },
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
          <Text size="sm">{t.security.whitelistContractsText}</Text>
          <Flex align="center" gap="xs" mb="xs" w="100%">
            <ChainsDropdown
              chains={blockchains}
              onChange={(val: string) =>
                dispatch({ type: "SET_WHITELIST_CONTRACTS_DROPDOWN", payload: val })
              }
            />
            {whitelistContractsDropdownChain ? (
              <Badge
                fullWidth
                color="gray"
                leftSection={
                  getImageForChain(whitelistContractsDropdownChain) ? (
                    <img
                      alt={whitelistContractsDropdownChain}
                      height={16}
                      src={getImageForChain(whitelistContractsDropdownChain)}
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
                {whitelistContractsDropdownChain.substring(0, 3).toUpperCase()}
              </Badge>
            ) : null}
            <input
              className="grow userInputs"
              name="whitelistContractsInput"
              placeholder={t.security.contractPlaceholder}
              value={whitelistContractsInput}
              onChange={(e) => {
                dispatch({
                  type: "SET_WHITELIST_CONTRACTS_INPUT",
                  payload: e.target.value,
                })
              }}
            />
            {whitelistContractsInput !== "" && whitelistContractsDropdown !== "" ? (
              <Button
                aria-label={t.security.contractAria}
                size="xs"
                type="button"
                variant="outline"
                onClick={() => {
                  dispatch({
                    type: "SET_WHITELIST_CONTRACTS",
                    payload: [
                      ...whitelistContracts,
                      {
                        id: whitelistContractsDropdown,
                        inputValue: whitelistContractsInput,
                      },
                    ],
                  })
                  dispatch({ type: "SET_WHITELIST_CONTRACTS_INPUT", payload: "" })
                  dispatch({
                    type: "SET_SAVE_MODAL_SHOWN",
                    payload: { modal: "isWhitelistContractsSaveShown", shown: true },
                  })
                }}
              >
                <IconPlus height="18px" style={{ marginRight: "10px" }} width="18px" />{" "}
                Add
              </Button>
            ) : null}
          </Flex>
          <div>
            {whitelistContracts.map((item) => {
              const blockchain: Blockchain | undefined | null = blockchains.find(
                (c) => c?.id === item.id,
              )
              return (
                <Box key={`${item.id} ${item.inputValue}`}>
                  <AppEndpointUrl
                    hasDelete
                    readOnly
                    chain={blockchain}
                    handleRemove={() => {
                      const newArray = whitelistContracts.filter((obj: FormatData) =>
                        !obj["inputValue"].includes(item.inputValue) ? obj : null,
                      )
                      dispatch({ type: "SET_WHITELIST_CONTRACTS", payload: newArray })
                      dispatch({
                        type: "SET_SAVE_MODAL_SHOWN",
                        payload: { modal: "isWhitelistContractsSaveShown", shown: true },
                      })
                    }}
                    value={item.inputValue}
                  />
                  <input name="whitelistContractsChains" type="hidden" value={item.id} />
                  <input
                    name="whitelistContractsValues"
                    type="hidden"
                    value={item.inputValue}
                  />
                </Box>
              )
            })}
          </div>
        </Card>
        <Card>
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
                <IconPlus height="18px" style={{ marginRight: "10px" }} width="18px" />{" "}
                Add
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
      </securityAction.Form>
    </div>
  )
}

export default SecurityView
