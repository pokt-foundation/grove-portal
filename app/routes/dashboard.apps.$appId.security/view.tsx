import {
  Button,
  Text,
  Switch,
  Loader,
  Group,
  Flex,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { useFetcher, useNavigation } from "@remix-run/react"
import { forwardRef } from "react"
import styles from "./styles.css"
import { links as AppEndpointUrlLinks } from "~/components/application/AppEndpointUrl"
import Card, { links as CardLinks } from "~/components/Card"
import { useTranslate } from "~/context/TranslateContext"
import { BlockchainsQuery } from "~/models/portal/sdk"
import { EndpointQuery } from "~/models/portal/sdk"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import useSecurityState from "./hooks/useSecurityState"

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
      // isApprovedChainsSaveShown,
      // isWhitelistUserAgentsSaveShown,
      // isWhitelistOriginsSaveShown,
      // isWhitelistContractsSaveShown,
      // isWhitelistMethodsSaveShown,
    },
    secretKeyRequired,
    // whitelistBlockchains,
    // whitelistUserAgents,
    // whitelistOrigins,
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
      {/* <securityAction.Form action={`/api/${appId}/settings`} method="post">
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
                    setWhitelistBlockchains(
                      endpoint.gatewaySettings.whitelistBlockchains as string[],
                    )
                    setIsApprovedChainsSaveShown(false)
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
                setWhitelistBlockchains(addIfMissing(val, whitelistBlockchains))
                setIsApprovedChainsSaveShown(true)
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
                    setWhitelistBlockchains((current) => removeFromArray(item, current))
                    setIsApprovedChainsSaveShown(true)
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
                    setWhitelistUserAgents(
                      endpoint.gatewaySettings.whitelistUserAgents as string[],
                    )
                    setIsWhitelistUserAgentsSaveShown(false)
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
          <div className="flexGrowRow">
            <TextInput
              id="userAgents"
              name="whitelistUserAgentsInput"
              placeholder={t.security.userAgentPlaceholder}
              value={whitelistUserAgentsInput}
              onChange={(e) => {
                setWhitelistUserAgentsInput(e.target.value)
              }}
            />
            {whitelistUserAgentsInput !== "" ? (
              <Button
                aria-label={t.security.userAgentAria}
                size="xs"
                type="button"
                variant="outline"
                onClick={() => {
                  if (whitelistUserAgentsInput !== "") {
                    setWhitelistUserAgents(
                      addIfMissing(whitelistUserAgentsInput, whitelistUserAgents),
                    )
                    setWhitelistUserAgentsInput("")
                    setIsWhitelistUserAgentsSaveShown(true)
                  }
                }}
              >
                <IconPlus height="18px" style={{ marginRight: "10px" }} width="18px" />{" "}
                Add
              </Button>
            ) : null}
          </div>
          <div>
            {whitelistUserAgents.map((item: string) => (
              <div key={item} className="list">
                <TextInput readOnly value={item}>
                  <CopyText text={String(item)} />
                  <Delete
                    onDelete={() => {
                      setWhitelistUserAgents((current) => removeFromArray(item, current))
                      setIsWhitelistUserAgentsSaveShown(true)
                    }}
                  />
                </TextInput>
                <input name="whitelistUserAgents" type="hidden" value={item} />
              </div>
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
                    setWhitelistOrigins(
                      endpoint.gatewaySettings.whitelistOrigins as string[],
                    )
                    setIsWhitelistOriginsSaveShown(false)
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
                setWhitelistOriginsInput(e.target.value)
              }}
            />
            {whitelistOriginsInput !== "" ? (
              <Button
                aria-label={t.security.OriginAria}
                size="xs"
                type="button"
                variant="outline"
                onClick={() => {
                  if (whitelistOriginsInput !== "") {
                    setWhitelistOrigins(
                      addIfMissing(whitelistOriginsInput, whitelistOrigins),
                    )
                    setWhitelistOriginsInput("")
                    setIsWhitelistOriginsSaveShown(true)
                  }
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
                <TextInput readOnly value={item}>
                  <CopyText text={String(item)} />
                  <Delete
                    onDelete={() => {
                      setWhitelistOrigins((current) => removeFromArray(item, current))
                      setIsWhitelistOriginsSaveShown(true)
                    }}
                  />
                </TextInput>
                <input name="whitelistOrigins" type="hidden" value={item} />
              </div>
            ))}
          </div>
        </Card>
      </securityAction.Form>
      <securityAction.Form action={`/api/${appId}/settings`} method="post">
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
