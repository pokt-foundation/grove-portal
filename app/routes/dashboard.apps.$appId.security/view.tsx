import {
  Button,
  Text,
  Switch,
  Loader,
  Select,
  Group,
} from "@pokt-foundation/pocket-blocks"
import { useFetcher, useNavigation } from "@remix-run/react"
import React, { useState, useMemo, forwardRef, useRef } from "react"
import styles from "./styles.css"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import { links as ChainsDropdownLinks } from "~/components/application/ChainsDropdown/ChainsDropdown"
import ChainWithImage, {
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import Card, { links as CardLinks } from "~/components/Card"
import TextInput, { links as TextInputLinks } from "~/components/TextInput"
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
  return [
    ...CardLinks(),
    ...TextInputLinks(),
    ...ChainsDropdownLinks(),
    ...AppEndpointUrlLinks(),
    ...ChainWithImageLinks(),
    { rel: "stylesheet", href: styles },
  ]
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
        <ChainWithImage chain={label} withIcon={false} />
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

  const approvedChainsSelectRef = useRef<HTMLInputElement>(null)

  const { t } = useTranslate()
  const securityAction = useFetcher()

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

  const selectChainData = useMemo(() => {
    return blockchains.map((chain) => ({
      label: chain?.description ?? "",
      value: chain?.id ?? "",
    }))
  }, [blockchains])

  return (
    <div className="security">
      <securityAction.Form action={`/api/${appId}/settings`} method="post">
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
            {/* <ChainsDropdown
              aria-label={t.security.chainsDropdownAria}
              blockchains={blockchains}
              defaultText={t.security.defaultSelectChainText}
              handleChainClick={(val) => {
                setWhitelistBlockchains(addIfMissing(val, whitelistBlockchains))
              }}
              icon={true}
              id="whitelistBlockchainsDropdown"
              selectedChains={[""]}
            /> */}
            <Select
              ref={approvedChainsSelectRef}
              searchable
              aria-label={t.security.chainsDropdownAria}
              data={selectChainData}
              itemComponent={SelectItem}
              placeholder={t.security.defaultSelectChainText}
              sx={(theme) => ({
                ".mantine-Select-dropdown": {
                  backgroundColor: "#0f161d",
                },
                ".mantine-Select-input": {
                  backgroundColor: "transparent",
                  borderColor: theme.colors.blue[5],
                },
                ".mantine-Select-input::placeholder": {
                  color: theme.colors.blue[5],
                  fontWeight: 600,
                  fontSize: "12px",
                },
              })}
              onChange={(val) => {
                if (val) {
                  setWhitelistBlockchains(addIfMissing(val, whitelistBlockchains))
                }
              }}
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
                  readOnly
                  chain={blockchain}
                  handleRemove={() => {
                    setWhitelistBlockchains((current) => removeFromArray(item, current))
                  }}
                  hasDelete={true}
                  value={blockchain?.description ?? ""}
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
              size="sm"
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
              size="sm"
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
            <Select
              searchable
              aria-label={t.security.headings.contracts}
              data={selectChainData}
              itemComponent={SelectItem}
              placeholder={t.security.defaultSelectChainText}
              sx={(theme) => ({
                ".mantine-Select-dropdown": {
                  backgroundColor: "#0f161d",
                },
                ".mantine-Select-input": {
                  backgroundColor: "transparent",
                  borderColor: theme.colors.blue[5],
                },
                ".mantine-Select-input::placeholder": {
                  color: theme.colors.blue[5],
                  fontWeight: 600,
                  fontSize: "12px",
                },
              })}
              onChange={(val) => {
                if (val) {
                  setWhitelistContractsDropdown(val)
                }
              }}
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
              size="sm"
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
            <Select
              searchable
              aria-label={t.security.headings.methods}
              data={selectChainData}
              itemComponent={SelectItem}
              placeholder={t.security.defaultSelectChainText}
              sx={(theme) => ({
                ".mantine-Select-dropdown": {
                  backgroundColor: "#0f161d",
                },
                ".mantine-Select-input": {
                  backgroundColor: "transparent",
                  borderColor: theme.colors.blue[5],
                },
                ".mantine-Select-input::placeholder": {
                  color: theme.colors.blue[5],
                  fontWeight: 600,
                  fontSize: "12px",
                },
              })}
              onChange={(val) => {
                if (val) {
                  setWhitelistMethodsDropdown(val)
                }
              }}
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
              size="sm"
              type="button"
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
          {navigation.state !== "idle" && <Loader color="black" ml={8} size="sm" />}
        </Button>
      </securityAction.Form>
    </div>
  )
}

export default SecurityView
