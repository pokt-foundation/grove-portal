import { Loader } from "@mantine/core"
import { Button, Text, Switch } from "@pokt-foundation/pocket-blocks"
import { useFetcher, useTransition } from "@remix-run/react"
import React, { useState } from "react"
import styles from "./styles.css"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import ChainsDropdown, {
  links as ChainsDropdownLinks,
} from "~/components/application/ChainsDropdown/ChainsDropdown"
import Card, { links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useTranslate } from "~/context/TranslateContext"
import {
  BlockchainsQuery,
  Maybe,
  WhitelistContract,
  WhitelistMethod,
} from "~/models/portal/sdk"
import { Blockchain, EndpointQuery } from "~/models/portal/sdk"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { CHAIN_ID_PREFIXES } from "~/utils/chainUtils"

/* c8 ignore start */
export const links = () => {
  return [
    ...CardLinks(),
    ...TextInputLinks(),
    ...ChainsDropdownLinks(),
    ...AppEndpointUrlLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

type SecurityViewProps = {
  endpoint: EndpointQuery["endpoint"]
  appId: string | undefined
  blockchains: BlockchainsQuery["blockchains"]
}

export const SecurityView = ({ endpoint, appId, blockchains }: SecurityViewProps) => {
  const transition = useTransition()

  type FormatData = {
    id: string
    inputValue: string
  }

  const formatData = <T extends WhitelistContract | WhitelistMethod>(
    data: Maybe<T>[],
    key: keyof T,
  ) => {
    return data.reduce((prev: FormatData[], curr) => {
      if (!curr) {
        return prev
      }
      const subArray = (curr[key] as unknown as string[]).reduce(
        (subPrev: FormatData[], subCurr) => {
          return [...subPrev, { id: curr.blockchainId, inputValue: subCurr }]
        },
        [],
      )
      return [...prev, ...subArray]
    }, [])
  }

  const { t } = useTranslate()
  const securityAction = useFetcher()

  const [secretKeyRequired, setSecretKeyRequired] = useState<boolean>(
    Boolean(endpoint.gatewaySettings.secretKeyRequired),
  )
  const [whitelistBlockchains, setWhitelistBlockchains] = useState<string[]>([])
  const [whitelistUserAgentsElement, setWhitelistUserAgentsElement] = useState<string>("")
  const [whitelistUserAgents, setWhitelistUserAgents] = useState<string[]>(
    (endpoint.gatewaySettings?.whitelistUserAgents as string[]) || [],
  )
  const [whitelistOriginsElement, setWhitelistOriginsElement] = useState<string>("")
  const [whitelistOrigins, setWhitelistOrigins] = useState<string[]>(
    (endpoint.gatewaySettings?.whitelistOrigins as string[]) || [],
  )
  const [whitelistContractsInput, setWhitelistContractsInput] = useState("")
  const [whitelistContractsDropdown, setWhitelistContractsDropdown] = useState<string>("")
  const [whitelistContracts, setWhitelistContracts] = useState<
    Array<{ id: string; inputValue: string }>
  >(
    formatData<WhitelistContract>(
      endpoint.gatewaySettings?.whitelistContracts,
      "contracts",
    ),
  )
  const [whitelistContractsError, setWhitelistContractsError] = useState<boolean>(false)
  const [whitelistMethodsInput, setWhitelistMethodsInput] = useState<string>("")
  const [whitelistMethodsDropdown, setWhitelistMethodsDropdown] = useState<string>("")
  const [whitelistMethods, setWhitelistMethods] = useState<
    Array<{ id: string; inputValue: string }>
  >(formatData<WhitelistMethod>(endpoint.gatewaySettings?.whitelistMethods, "methods"))
  const [whitelistMethodsError, setWhitelistMethodsError] = useState<boolean>(false)

  const removeFromArray = (item: string, arr: string[]) => arr.filter((i) => i !== item)
  const addIfMissing = (item: string, arr: string[]) => {
    if (arr.indexOf(item) !== -1) {
      return arr
    }
    return [...arr, item]
  }

  const getChainName = (key: string) => {
    const value = CHAIN_ID_PREFIXES.get(key)
    return value?.name || "Undefined"
  }

  const removeFromArrayByValue = (item: string, field: string, arr: any[]) => {
    return arr.filter((obj) => (!obj[field].includes(item) ? obj : null))
  }

  return (
    <div className="security">
      <securityAction.Form action="/api/securitySettings" method="post">
        <input name="appID" type="hidden" value={appId} />
        <Card>
          <div className="pokt-card-header">
            <h3>{t.security.headings.secretKey}</h3>
            <Switch
              aria-label={t.security.secretSwitchAria}
              checked={secretKeyRequired}
              id="secretRequired"
              name="secretKeyRequired"
              onChange={(event) => setSecretKeyRequired(event.currentTarget.checked)}
            />
          </div>
          <div>
            <Text size="sm">{t.security.secretKeyText}</Text>
          </div>
        </Card>
        <Card>
          <div className="pokt-card-header">
            <h3>{t.security.headings.approvedChains}</h3>
            <ChainsDropdown
              aria-label={t.security.chainsDropdownAria}
              blockchains={blockchains}
              defaultText={t.security.defaultSelectChainText}
              handleChainClick={(val) => {
                setWhitelistBlockchains(addIfMissing(val, whitelistBlockchains))
              }}
              icon={true}
              selectedChains={[""]}
            />
          </div>
          {whitelistBlockchains.map((item: string) => {
            const blockchain: Blockchain | undefined | null = blockchains.find(
              (c) => c?.id === item,
            )
            return (
              <React.Fragment key={item}>
                <AppEndpointUrl
                  key={item}
                  chain={blockchain}
                  handleRemove={() => {
                    setWhitelistBlockchains((current) => removeFromArray(item, current))
                  }}
                  hasDelete={true}
                  value={appId ?? ""}
                />
                <input name="whitelistBlockchains" type="hidden" value={item} />
              </React.Fragment>
            )
          })}
        </Card>
        <Card>
          <div className="pokt-card-header">
            <h3>{t.security.headings.userAgents}</h3>
          </div>
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
              type="button"
              onClick={() => {
                if (whitelistUserAgentsElement !== "") {
                  setWhitelistUserAgents(
                    addIfMissing(whitelistUserAgentsElement, whitelistUserAgents),
                  )
                  setWhitelistUserAgentsElement("")
                }
              }}
            >
              +
            </Button>
          </div>
          <div>
            {whitelistUserAgents.map((item: string) => (
              <div key={item} className="list">
                <TextInput
                  copy
                  readOnly
                  handleRemove={() => {
                    setWhitelistUserAgents((current) => removeFromArray(item, current))
                  }}
                  hasDelete={true}
                  value={item}
                />
                <input name="whitelistUserAgents" type="hidden" value={item} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="pokt-card-header">
            <h3>{t.security.headings.origins}</h3>
          </div>
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
              type="button"
              onClick={() => {
                if (whitelistOriginsElement !== "") {
                  setWhitelistOrigins(
                    addIfMissing(whitelistOriginsElement, whitelistOrigins),
                  )
                  setWhitelistOriginsElement("")
                }
              }}
            >
              +
            </Button>
          </div>
          <div>
            {whitelistOrigins.map((item: string) => (
              <div key={item} className="list">
                <TextInput
                  copy
                  readOnly
                  handleRemove={() => {
                    setWhitelistOrigins((current) => removeFromArray(item, current))
                  }}
                  hasDelete={true}
                  value={item}
                />
                <input name="whitelistOrigins" type="hidden" value={item} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="pokt-card-header">
            <h3>{t.security.headings.contracts}</h3>
          </div>
          <div className="flexGrowRow">
            <ChainsDropdown
              blockchains={blockchains}
              defaultText={
                whitelistContractsDropdown !== ""
                  ? getChainName(whitelistContractsDropdown)
                  : t.security.defaultSelectChainText
              }
              handleChainClick={(val) => {
                setWhitelistContractsDropdown(val)
              }}
              selectedChains={[""]}
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
              type="button"
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
                    copy
                    hasDelete
                    readOnly
                    chain={blockchain}
                    handleRemove={() => {
                      setWhitelistContracts((current) =>
                        removeFromArrayByValue(item.inputValue, "inputValue", current),
                      )
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
        <Card>
          <div className="pokt-card-header">
            <h3>{t.security.headings.methods}</h3>
          </div>
          <div className="flexGrowRow">
            <ChainsDropdown
              blockchains={blockchains}
              defaultText={
                whitelistMethodsDropdown !== ""
                  ? getChainName(whitelistMethodsDropdown)
                  : t.security.defaultSelectChainText
              }
              handleChainClick={(val) => {
                setWhitelistMethodsDropdown(val)
              }}
              icon={false}
              selectedChains={[""]}
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
              type="button"
              onClick={() => {
                if (whitelistMethodsInput === "" || whitelistMethodsDropdown === "") {
                  setWhitelistMethodsError(true)
                } else {
                  setWhitelistMethodsError(false)
                  setWhitelistMethods([
                    ...whitelistMethods,
                    { id: whitelistMethodsDropdown, inputValue: whitelistMethodsInput },
                  ]),
                    setWhitelistMethodsInput("")
                  setWhitelistMethodsDropdown("")
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
                    copy
                    hasDelete
                    readOnly
                    chain={blockchain}
                    handleRemove={() => {
                      setWhitelistMethods((current) =>
                        removeFromArrayByValue(item.inputValue, "inputValue", current),
                      )
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
        <Button
          type="submit"
          variant="filled"
          onClick={() => {
            trackEvent(AmplitudeEvents.SecuritySettingsUpdate)
          }}
        >
          {t.common.save}
          {transition.state !== "idle" && <Loader color="black" ml={8} size="sm" />}
        </Button>
      </securityAction.Form>
    </div>
  )
}

export default SecurityView
