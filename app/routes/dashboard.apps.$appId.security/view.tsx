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
} from "@pokt-foundation/pocket-blocks"
import { useFetcher, useNavigation } from "@remix-run/react"
import { forwardRef } from "react"
import React from "react"
import useSecurityState from "./hooks/useSecurityState"
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

  // get all states from the state hook
  const {
    saveModalsShown: {
      isSecretKeySaveShown,
      isApprovedChainsSaveShown,
      isWhitelistUserAgentsSaveShown,
      isWhitelistOriginsSaveShown,
      // isWhitelistContractsSaveShown,
      // isWhitelistMethodsSaveShown,
    },
    secretKeyRequired,
    whitelistBlockchains,
    whitelistUserAgents,
    whitelistUserAgentsInput,
    whitelistOrigins,
    whitelistOriginsInput,
    // whitelistContracts,
    // whitelistMethods,
    // whitelistUserAgentsElement,
    // whitelistOriginsElement,
    // whitelistContractsInput,
    // whitelistContractsDropdown,
    // whitelistContractsError,
    // whitelistMethodsInput,
    // whitelistMethodsDropdown,
    // whitelistMethodsError,
  } = state

  const addIfMissing = (item: string, arr: string[]) => {
    if (arr.indexOf(item) !== -1) {
      return arr
    }
    return [...arr, item]
  }

  return (
    <div className="security">
      <securityAction.Form action={`/api/${appId}/settings`} method="post">
        <input name="appID" type="hidden" value={appId} />
        <Card>
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
      </securityAction.Form>
      <securityAction.Form action={`/api/${appId}/settings`} method="post">
        <input name="appID" type="hidden" value={appId} />
        <Card>
          <div className="pokt-card-header">
            <h3>{t.security.headings.approvedChains}</h3>
            {isApprovedChainsSaveShown ? (
              <Flex>
                <Button
                  mr=".5em"
                  px="2em"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    dispatch({
                      type: "SET_WHITELIST_BLOCKCHAINS",
                      payload: endpoint.gatewaySettings.whitelistBlockchains as string[],
                    })
                    dispatch({
                      type: "SET_SAVE_MODAL_SHOWN",
                      payload: { modal: "isApprovedChainsSaveShown", shown: false },
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
          <Flex justify="space-between">
            <Text size="sm">{t.security.approvedChainsText}</Text>
            <ChainsDropdown
              chains={blockchains}
              checkboxData={whitelistBlockchains}
              onChange={(val: string) => {
                const newArray = addIfMissing(val, whitelistBlockchains)
                console.log(newArray)
                dispatch({
                  type: "SET_WHITELIST_BLOCKCHAINS",
                  payload: addIfMissing(val, whitelistBlockchains),
                })
                dispatch({
                  type: "SET_SAVE_MODAL_SHOWN",
                  payload: { modal: "isApprovedChainsSaveShown", shown: true },
                })
              }}
            />
          </Flex>

          {whitelistBlockchains.map((item: string) => {
            const blockchain: Blockchain | undefined | null = blockchains.find(
              (c) => c?.id === item,
            )
            return (
              <React.Fragment key={item}>
                <AppEndpointUrl
                  key={item}
                  readOnly
                  chain={blockchain}
                  handleRemove={() => {
                    const newArray = state.whitelistBlockchains.filter(
                      (blockchain) => blockchain !== item,
                    )
                    dispatch({ type: "SET_WHITELIST_BLOCKCHAINS", payload: newArray })
                    dispatch({
                      type: "SET_SAVE_MODAL_SHOWN",
                      payload: { modal: "isApprovedChainsSaveShown", shown: true },
                    })
                  }}
                  hasDelete={true}
                  value={blockchain?.description ?? ""}
                />
                <input name="whitelistBlockchains" type="hidden" value={item} />
              </React.Fragment>
            )
          })}
        </Card>
      </securityAction.Form>
      <securityAction.Form action={`/api/${appId}/settings`} method="post">
        <input name="appID" type="hidden" value={appId} />
        <Card>
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
                <IconPlus height="18px" style={{ marginRight: "10px" }} width="18px" />{" "}
                Add
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
      </securityAction.Form>
      <securityAction.Form action={`/api/${appId}/settings`} method="post">
        <input name="appID" type="hidden" value={appId} />
        <Card>
          <div className="pokt-card-header">
            <h3>{t.security.headings.origins}</h3>
            {isWhitelistOriginsSaveShown ? (
              <Flex>
                <Button
                  mr=".5em"
                  px="2em"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    dispatch({
                      type: "SET_WHITELIST_ORIGINS",
                      payload: endpoint.gatewaySettings.whitelistOrigins as string[],
                    })
                    dispatch({
                      type: "SET_SAVE_MODAL_SHOWN",
                      payload: { modal: "isWhitelistOriginsSaveShown", shown: false },
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
          <Text size="sm">{t.security.whitelistOriginsText}</Text>
          <div className="flexGrowRow">
            <TextInput
              id="userOrigins"
              placeholder={t.security.OriginPlaceholder}
              value={whitelistOriginsInput}
              onChange={(e) => {
                dispatch({ type: "SET_WHITELIST_ORIGINS_INPUT", payload: e.target.value })
              }}
            />
            {whitelistOriginsInput !== "" ? (
              <Button
                aria-label={t.security.OriginAria}
                size="xs"
                type="button"
                variant="outline"
                onClick={() => {
                  dispatch({
                    type: "SET_WHITELIST_ORIGINS",
                    payload: addIfMissing(whitelistOriginsInput, whitelistOrigins),
                  })
                  dispatch({ type: "SET_WHITELIST_ORIGINS_INPUT", payload: "" })
                  dispatch({
                    type: "SET_SAVE_MODAL_SHOWN",
                    payload: { modal: "isWhitelistOriginsSaveShown", shown: true },
                  })
                }}
              >
                <IconPlus height="18px" style={{ marginRight: "10px" }} width="18px" />{" "}
                Add
              </Button>
            ) : null}
          </div>
          <div>
            {whitelistOrigins.map((item: string) => (
              <div key={item} className="list">
                <TextInput readOnly value={item} />
                <CopyText text={String(item)} />
                <Delete
                  onDelete={() => {
                    const newArray = whitelistOrigins.filter((i) => i !== item)
                    dispatch({ type: "SET_WHITELIST_ORIGINS", payload: newArray })
                    dispatch({
                      type: "SET_SAVE_MODAL_SHOWN",
                      payload: { modal: "isWhitelistOriginsSaveShown", shown: true },
                    })
                  }}
                />
                <input name="whitelistOrigins" type="hidden" value={item} />
              </div>
            ))}
          </div>
        </Card>
      </securityAction.Form>
      {/* <securityAction.Form action={`/api/${appId}/settings`} method="post">
        <input name="appID" type="hidden" value={appId} />
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
                    setWhitelistContracts(
                      formatData<WhitelistContractType>(
                        endpoint.gatewaySettings?.whitelistContracts,
                        "contracts",
                      ),
                    )
                    setIsWhitelistContractsSaveShown(false)
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
          <div className="flexGrowRow">
            <ChainsDropdown
              chains={blockchains}
              onChange={(val: string) => setWhitelistContractsDropdown(val)}
            />
            <input
              className="grow userInputs"
              name="whitelistContractsInput"
              value={whitelistContractsInput}
              onChange={(e) => {
                setWhitelistContractsInput(e.target.value)
              }}
              placeholder={t.security.contractPlaceholder}
            />
            {whitelistContractsInput !== "" && whitelistContractsDropdown !== "" ? (
              <Button
                aria-label={t.security.contractAria}
                size="xs"
                type="button"
                variant="outline"
                onClick={() => {
                  if (
                    whitelistContractsInput === "" ||
                    whitelistContractsDropdown === ""
                  ) {
                    setWhitelistContractsError(true)
                  } else {
                    setWhitelistContractsError(false)
                    setWhitelistContracts([
                      ...whitelistContracts,
                      {
                        id: whitelistContractsDropdown,
                        inputValue: whitelistContractsInput,
                      },
                    ])
                    setWhitelistContractsInput("")
                    setWhitelistContractsDropdown("")
                    setIsWhitelistContractsSaveShown(true)
                  }
                }}
              >
                <IconPlus height="18px" style={{ marginRight: "10px" }} width="18px" />{" "}
                Add
              </Button>
            ) : null}
          </div>
          {whitelistContractsError && (
            <div>
              <p className="errorText">{t.security.contractError}</p>
            </div>
          )}
          <div>
            {whitelistContracts.map((item) => {
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
                      setWhitelistContracts((current) =>
                        removeFromArrayByValue(item.inputValue, "inputValue", current),
                      )
                      setIsWhitelistContractsSaveShown(true)
                    }}
                    value={item.inputValue}
                  />
                  <input name="whitelistContractsChains" type="hidden" value={item.id} />
                  <input
                    name="whitelistContractsValues"
                    type="hidden"
                    value={item.inputValue}
                  />
                </div>
              )
            })}
          </div>
        </Card>
      </securityAction.Form>
      <securityAction.Form action={`/api/${appId}/settings`} method="post">
        <input name="appID" type="hidden" value={appId} />
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
                    setWhitelistMethods(
                      formatData<WhitelistMethodType>(
                        endpoint.gatewaySettings?.whitelistMethods,
                        "methods",
                      ),
                    )
                    setIsWhitelistMethodsSaveShown(false)
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
          <div className="flexGrowRow">
            <ChainsDropdown
              chains={blockchains}
              onChange={(val: string) => setWhitelistMethodsDropdown(val)}
            />

            <input
              className="grow userInputs"
              name="whitelistMethodsInput"
              value={whitelistMethodsInput}
              onChange={(e) => {
                setWhitelistMethodsInput(e.target.value)
              }}
              placeholder={t.security.methodPlaceholder}
            />
            {whitelistMethodsInput !== "" && whitelistMethodsDropdown !== "" ? (
              <Button
                aria-label={t.security.methodAria}
                size="xs"
                type="button"
                variant="outline"
                onClick={() => {
                  if (whitelistMethodsInput === "" || whitelistMethodsDropdown === "") {
                    setWhitelistMethodsError(true)
                  } else {
                    setWhitelistMethodsError(false)
                    setWhitelistMethods([
                      ...whitelistMethods,
                      { id: whitelistMethodsDropdown, inputValue: whitelistMethodsInput },
                    ])
                    setWhitelistMethodsInput("")
                    setWhitelistMethodsDropdown("")
                    setIsWhitelistMethodsSaveShown(true)
                  }
                }}
              >
                <IconPlus height="18px" style={{ marginRight: "10px" }} width="18px" />{" "}
                Add
              </Button>
            ) : null}
          </div>

          {whitelistMethodsError && (
            <div>
              <p className="errorText">{t.security.methodError}</p>
            </div>
          )}
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
                      setWhitelistMethods((current) =>
                        removeFromArrayByValue(item.inputValue, "inputValue", current),
                      )
                      setIsWhitelistMethodsSaveShown(true)
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
      </securityAction.Form> */}
    </div>
  )
}

export default SecurityView
