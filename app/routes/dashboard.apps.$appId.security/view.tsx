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
import React, { useState, forwardRef, useEffect } from "react"
import styles from "./styles.css"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import Card, { links as CardLinks } from "~/components/Card"
import ChainsDropdown from "~/components/ChainsDropdown/ChainsDropdown"
import CopyText from "~/components/CopyText"
import Delete from "~/components/Delete/Delete"
import TextInput from "~/components/TextInput"
import { useTranslate } from "~/context/TranslateContext"
import {
  BlockchainsQuery,
  Maybe,
  WhitelistContracts,
  WhitelistMethods,
} from "~/models/portal/sdk"
import { Blockchain, EndpointQuery } from "~/models/portal/sdk"
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

type WhitelistContractType = Pick<WhitelistContracts, "blockchainID" | "contracts">
type WhitelistMethodType = Pick<WhitelistMethods, "blockchainID" | "methods">

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

  type FormatData = {
    id: string
    inputValue: string
  }

  const formatData = <T extends WhitelistContractType | WhitelistMethodType>(
    data: Maybe<T>[],
    key: keyof T,
  ) => {
    return data.reduce((prev: FormatData[], curr) => {
      if (!curr) {
        return prev
      }
      const subArray = (curr[key] as unknown as string[]).reduce(
        (subPrev: FormatData[], subCurr) => {
          return [...subPrev, { id: curr.blockchainID, inputValue: subCurr }]
        },
        [],
      )
      return [...prev, ...subArray]
    }, [])
  }

  const { t } = useTranslate()
  const securityAction = useFetcher()
  const theme = useMantineTheme()

  const [secretKeyRequired, setSecretKeyRequired] = useState<boolean>(
    Boolean(endpoint.gatewaySettings.secretKeyRequired),
  )
  const [whitelistBlockchains, setWhitelistBlockchains] = useState<string[]>(
    endpoint.gatewaySettings.whitelistBlockchains as string[],
  )
  const [whitelistUserAgents, setWhitelistUserAgents] = useState<string[]>(
    endpoint.gatewaySettings?.whitelistUserAgents as string[],
  )
  const [whitelistOrigins, setWhitelistOrigins] = useState<string[]>(
    endpoint.gatewaySettings?.whitelistOrigins as string[],
  )
  const [whitelistContracts, setWhitelistContracts] = useState<
    Array<{ id: string; inputValue: string }>
  >(
    formatData<WhitelistContractType>(
      endpoint.gatewaySettings?.whitelistContracts,
      "contracts",
    ),
  )
  const [whitelistMethods, setWhitelistMethods] = useState<
    Array<{ id: string; inputValue: string }>
  >(
    formatData<WhitelistMethodType>(
      endpoint.gatewaySettings?.whitelistMethods,
      "methods",
    ),
  )

  const [whitelistUserAgentsElement, setWhitelistUserAgentsElement] = useState<string>("")
  const [whitelistOriginsElement, setWhitelistOriginsElement] = useState<string>("")
  const [whitelistContractsInput, setWhitelistContractsInput] = useState("")
  const [whitelistContractsDropdown, setWhitelistContractsDropdown] = useState<string>("")
  const [whitelistContractsError, setWhitelistContractsError] = useState<boolean>(false)
  const [whitelistMethodsInput, setWhitelistMethodsInput] = useState<string>("")
  const [whitelistMethodsDropdown, setWhitelistMethodsDropdown] = useState<string>("")
  const [whitelistMethodsError, setWhitelistMethodsError] = useState<boolean>(false)

  const [isSecretKeySaveShown, setIsSecretKeySaveShown] = useState<boolean>(false)
  const [isApprovedChainsSaveShown, setIsApprovedChainsSaveShown] =
    useState<boolean>(false)
  const [isWhitelistUserAgentsSaveShown, setIsWhitelistUserAgentsSaveShown] =
    useState<boolean>(false)
  const [isWhitelistOriginsSaveShown, setIsWhitelistOriginsSaveShown] =
    useState<boolean>(false)
  const [isWhitelistContractsSaveShown, setIsWhitelistContractsSaveShown] =
    useState<boolean>(false)
  const [isWhitelistMethodsSaveShown, setIsWhitelistMethodsSaveShown] =
    useState<boolean>(false)

  useEffect(() => {
    if (navigation.state === "idle") {
      setIsSecretKeySaveShown(false)
      setIsApprovedChainsSaveShown(false)
      setIsWhitelistUserAgentsSaveShown(false)
      setIsWhitelistOriginsSaveShown(false)
      setIsWhitelistContractsSaveShown(false)
      setIsWhitelistMethodsSaveShown(false)
    }
  }, [navigation])

  const removeFromArray = (item: string, arr: string[]) => arr.filter((i) => i !== item)
  const addIfMissing = (item: string, arr: string[]) => {
    if (arr.indexOf(item) !== -1) {
      return arr
    }
    return [...arr, item]
  }

  const removeFromArrayByValue = (item: string, field: string, arr: any[]) => {
    return arr.filter((obj) => (!obj[field].includes(item) ? obj : null))
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
                    setSecretKeyRequired(
                      Boolean(endpoint.gatewaySettings.secretKeyRequired),
                    )
                    setIsSecretKeySaveShown(false)
                  }}
                >
                  {t.common.reset}
                </Button>
                <Button
                  type="submit"
                  variant="filled"
                  size="sm"
                  sx={{
                    padding: "0 2em",
                  }}
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
            <Flex mt={16} justify="space-between">
              <Text size="xs">Private Secret Key Required</Text>
              <Switch
                aria-label={t.security.secretSwitchAria}
                checked={secretKeyRequired}
                id="secretRequired"
                name="secretKeyRequired"
                onChange={(event) => {
                  setSecretKeyRequired(event.currentTarget.checked)
                  setIsSecretKeySaveShown(true)
                }}
                sx={{
                  cursor: "pointer",
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
                    setWhitelistBlockchains(
                      endpoint.gatewaySettings.whitelistBlockchains as string[],
                    )
                    setIsApprovedChainsSaveShown(false)
                  }}
                >
                  {t.common.reset}
                </Button>
                <Button
                  type="submit"
                  variant="filled"
                  size="sm"
                  sx={{
                    padding: "0 2em",
                  }}
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
              endpoint={endpoint}
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
                  type="submit"
                  variant="filled"
                  size="sm"
                  sx={{
                    padding: "0 2em",
                  }}
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
              value={whitelistUserAgentsElement}
              onChange={(e) => {
                setWhitelistUserAgentsElement(e.target.value)
              }}
            />
            <Button
              aria-label={t.security.userAgentAria}
              size="xs"
              type="button"
              variant="outline"
              onClick={() => {
                if (whitelistUserAgentsElement !== "") {
                  setWhitelistUserAgents(
                    addIfMissing(whitelistUserAgentsElement, whitelistUserAgents),
                  )
                  setWhitelistUserAgentsElement("")
                  setIsWhitelistUserAgentsSaveShown(true)
                }
              }}
            >
              +
            </Button>
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
                  type="submit"
                  variant="filled"
                  size="sm"
                  sx={{
                    padding: "0 2em",
                  }}
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
              value={whitelistOriginsElement}
              onChange={(e) => {
                setWhitelistOriginsElement(e.target.value)
              }}
            />
            <Button
              aria-label={t.security.OriginAria}
              size="xs"
              type="button"
              variant="outline"
              onClick={() => {
                if (whitelistOriginsElement !== "") {
                  setWhitelistOrigins(
                    addIfMissing(whitelistOriginsElement, whitelistOrigins),
                  )
                  setWhitelistOriginsElement("")
                  setIsWhitelistOriginsSaveShown(true)
                }
              }}
            >
              +
            </Button>
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
                  type="submit"
                  variant="filled"
                  size="sm"
                  sx={{
                    padding: "0 2em",
                  }}
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
              endpoint={endpoint}
              onChange={(val: string) => setWhitelistContractsDropdown(val)}
            />
            <input
              className="grow userInputs"
              name="whitelistContractsInput"
              value={whitelistContractsInput}
              onChange={(e) => {
                setWhitelistContractsInput(e.target.value)
              }}
            />
            <Button
              aria-label={t.security.contractAria}
              size="xs"
              type="button"
              variant="outline"
              onClick={() => {
                if (whitelistContractsInput === "" || whitelistContractsDropdown === "") {
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
              +
            </Button>
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
                  type="submit"
                  variant="filled"
                  size="sm"
                  sx={{
                    padding: "0 2em",
                  }}
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
              endpoint={endpoint}
              onChange={(val: string) => setWhitelistMethodsDropdown(val)}
            />

            <input
              className="grow userInputs"
              name="whitelistMethodsInput"
              value={whitelistMethodsInput}
              onChange={(e) => {
                setWhitelistMethodsInput(e.target.value)
              }}
            />
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
              +
            </Button>
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
      </securityAction.Form>
    </div>
  )
}

export default SecurityView
