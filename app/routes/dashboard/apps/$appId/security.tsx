import { Text } from "@mantine/core"
import { Button } from "@pokt-foundation/pocket-blocks"
import { MetaFunction } from "@remix-run/node"
import { useFetcher, useParams } from "@remix-run/react"
import React, { useState, useEffect } from "react"
import { AppIdLoaderData } from "../$appId"
import styles from "../../../../styles/dashboard.apps.$appId.security.css"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import ChainsDropdown, {
  links as ChainsDropdownLinks,
} from "~/components/application/ChainsDropdown/ChainsDropdown"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Switch, { links as SwitchLinks } from "~/components/shared/Switch"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { Maybe, WhitelistContract, WhitelistMethod } from "~/models/portal/sdk"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"
import { CHAIN_ID_PREFIXES } from "~/utils/chainUtils"

export const meta: MetaFunction = () => {
  return {
    title: "Application Security - POKT Portal - Pocket Network",
  }
}

export const links = () => {
  return [
    ...SwitchLinks(),
    ...CardLinks(),
    ...TextInputLinks(),
    ...ChainsDropdownLinks(),
    ...AppEndpointUrlLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export type securitySettings = {
  gatewaySettings: {
    secretKey: string
    secretKeyRequired: boolean
    whitelistOrigins: string[]
    whitelistUserAgents: string[]
    whitelistBlockchains: string[]
    whitelistContracts: { blockchainID: string; contracts: string[] }[]
    whitelistMethods: { blockchainID: string; methods: string[] }[]
  }
}

export default function AppSecurity() {
  const appIDRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const params = useParams()
  const securityAction = useFetcher()

  useEffect(() => {
    trackEvent(AmplitudeEvents.SecurityDetailsView)
  }, [])

  const {
    endpoint: { gatewaySettings },
  } = appIDRoute?.data as AppIdLoaderData

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

  const [secretKeyRequired, setSecretKeyRequired] = useState<boolean>(
    Boolean(gatewaySettings.secretKeyRequired),
  )
  // const [whitelistBlockchains, setWhitelistBlockchains] = useState<string[]>(
  //   gatewaySettings.whitelistBlockchains || [],
  // )
  const [whitelistBlockchains, setWhitelistBlockchains] = useState<string[]>([])
  const [whitelistUserAgentsElement, setWhitelistUserAgentsElement] = useState<string>("")
  const [whitelistUserAgents, setWhitelistUserAgents] = useState<string[]>(
    (gatewaySettings?.whitelistUserAgents as string[]) || [],
  )
  const [whitelistOriginsElement, setWhitelistOriginsElement] = useState<string>("")
  const [whitelistOrigins, setWhitelistOrigins] = useState<string[]>(
    (gatewaySettings?.whitelistOrigins as string[]) || [],
  )
  const [whitelistContractsInput, setWhitelistContractsInput] = useState("")
  const [whitelistContractsDropdown, setWhitelistContractsDropdown] = useState<string>("")
  const [whitelistContracts, setWhitelistContracts] = useState<
    Array<{ id: string; inputValue: string }>
  >(formatData<WhitelistContract>(gatewaySettings?.whitelistContracts, "contracts"))
  const [whitelistContractsError, setWhitelistContractsError] = useState<boolean>(false)
  const [whitelistMethodsInput, setWhitelistMethodsInput] = useState<string>("")
  const [whitelistMethodsDropdown, setWhitelistMethodsDropdown] = useState<string>("")
  const [whitelistMethods, setWhitelistMethods] = useState<
    Array<{ id: string; inputValue: string }>
  >(formatData<WhitelistMethod>(gatewaySettings.whitelistMethods, "methods"))
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
        <input name="appID" type="hidden" value={params.appId} />
        <Card>
          <div className="pokt-card-header">
            <h3>Private Secret Key Required</h3>
            <Switch
              aria-label="Private key required"
              checked={secretKeyRequired}
              id="secretRequired"
              name="secretKeyRequired"
              onChange={(event) => setSecretKeyRequired(event.currentTarget.checked)}
            />
          </div>
          <div>
            <Text size="sm">
              To maximize the security of your application, you should activate the
              private secret key for all requests and enable the use of whitelist user
              agents and origins.
            </Text>
          </div>
        </Card>
        <Card>
          <div className="pokt-card-header">
            <h3>Approved Chains</h3>
            <ChainsDropdown
              aria-label="Select a chain to add to white list"
              defaultText="Select Chain"
              handleChainClick={(val) => {
                setWhitelistBlockchains(addIfMissing(val, whitelistBlockchains))
              }}
              icon={true}
              selectedChains={[""]}
            />
          </div>
          {whitelistBlockchains.map((item: string) => (
            <React.Fragment key={item}>
              <AppEndpointUrl
                key={item}
                chainId={item}
                handleRemove={() => {
                  setWhitelistBlockchains((current) => removeFromArray(item, current))
                }}
                hasDelete={true}
                value={params.appId ?? ""}
              />
              <input name="whitelistBlockchains" type="hidden" value={item} />
            </React.Fragment>
          ))}
        </Card>
        <Card>
          <div className="pokt-card-header">
            <h3>Whitelist User-Agents</h3>
          </div>
          <div className="flexGrowRow">
            <TextInput
              id="userAgents"
              name="whitelistUserAgentsInput"
              placeholder="Type user agent here"
              value={whitelistUserAgentsElement}
              onChange={(e) => {
                setWhitelistUserAgentsElement(e.target.value)
              }}
            />
            <Button
              aria-label="Add user agents to white list"
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
            <h3>Whitelist Origins</h3>
          </div>
          <div className="flexGrowRow">
            <TextInput
              id="userOrigins"
              placeholder="Type origin here"
              value={whitelistOriginsElement}
              onChange={(e) => {
                setWhitelistOriginsElement(e.target.value)
              }}
            />
            <Button
              aria-label="Add origins to white list"
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
            <h3>Whitelist Contracts</h3>
          </div>
          <div className="flexGrowRow">
            <ChainsDropdown
              defaultText={
                whitelistContractsDropdown !== ""
                  ? getChainName(whitelistContractsDropdown)
                  : "Select Chain"
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
              aria-label="Add contract selections to white list"
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
              <p className="errorText">
                You must select a chain and have a value to add to methods whitelist.
              </p>
            </div>
          )}
          <div>
            {whitelistContracts.map((item) => (
              <div key={`${item.id} ${item.inputValue}`} className="list">
                <AppEndpointUrl
                  copy
                  hasDelete
                  readOnly
                  chainId={item.id}
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
            ))}
          </div>
        </Card>
        <Card>
          <div className="pokt-card-header">
            <h3>Whitelist Methods</h3>
          </div>
          <div className="flexGrowRow">
            <ChainsDropdown
              defaultText={
                whitelistMethodsDropdown !== ""
                  ? getChainName(whitelistMethodsDropdown)
                  : "Select Chain"
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
              aria-label="Add method selections to white list"
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
              <p className="errorText">
                You must select a chain and have a value to add to methods whitelist.
              </p>
            </div>
          )}
          <div>
            {whitelistMethods.map((item) => (
              <div key={`${item.id} ${item.inputValue}`} className="list">
                <AppEndpointUrl
                  copy
                  hasDelete
                  readOnly
                  chainId={item.id}
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
            ))}
          </div>
        </Card>
        <Button
          type="submit"
          variant="filled"
          onClick={() => {
            trackEvent(AmplitudeEvents.SecuritySettingsUpdate)
          }}
        >
          Save
        </Button>
      </securityAction.Form>
    </div>
  )
}
