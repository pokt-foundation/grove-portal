import { MetaFunction } from "@remix-run/node"
import React, { useEffect, useState } from "react"
import { useFetcher, Form, useParams } from "@remix-run/react"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { AppIdLoaderData } from "../$appId"
import styles from "../../../../styles/dashboard.apps.$appId.security.css"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import ChainsDropdown, {
  links as ChainsDropdownLinks,
} from "~/components/application/ChainsDropdown/ChainsDropdown"
import { CHAIN_ID_PREFIXES } from "~/utils/chainUtils"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Switch, { links as SwitchLinks } from "~/components/shared/Switch"
import Button from "~/components/shared/Button"
import { Text } from "@mantine/core"
import { AmplitudeEvents, trackEvent } from "~/utils/analytics"

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
    app: { gatewaySettings },
  } = appIDRoute?.data as AppIdLoaderData

  const formatData = (
    data: { blockchainID: string; [key: string]: string[] | string }[],
  ) => {
    let formattedData = []
    if (data[0]?.contracts || data[0]?.methods) {
      let key = data[0]?.contracts ? "contracts" : "methods"
      for (let i = 0; i < data.length; i += 1) {
        if (data[i][key].length > 1) {
          for (let j = 0; j < data[i][key].length; j += 1) {
            formattedData.push({
              id: data[i].blockchainID,
              inputValue: data[i][key][j],
            })
          }
        } else {
          formattedData.push({ id: data[i].blockchainID, inputValue: data[i][key][0] })
        }
      }
    }
    return formattedData
  }

  const [secretKeyRequired, setSecretKeyRequired] = useState<boolean>(
    gatewaySettings.secretKeyRequired,
  )
  const [whitelistBlockchains, setWhitelistBlockchains] = useState<string[]>(
    gatewaySettings.whitelistBlockchains || [],
  )
  const [whitelistUserAgentsElement, setWhitelistUserAgentsElement] = useState<string>("")
  const [whitelistUserAgents, setWhitelistUserAgents] = useState<string[]>(
    gatewaySettings.whitelistUserAgents || [],
  )
  const [whitelistOriginsElement, setWhitelistOriginsElement] = useState<string>("")
  const [whitelistOrigins, setWhitelistOrigins] = useState<string[]>(
    gatewaySettings.whitelistOrigins || [],
  )
  const [whitelistContractsInput, setWhitelistContractsInput] = useState("")
  const [whitelistContractsDropdown, setWhitelistContractsDropdown] = useState<string>("")
  const [whitelistContracts, setWhitelistContracts] = useState<
    Array<{ id: string; inputValue: string }>
  >(formatData(gatewaySettings.whitelistContracts))
  const [whitelistContractsError, setWhitelistContractsError] = useState<boolean>(false)
  const [whitelistMethodsInput, setWhitelistMethodsInput] = useState<string>("")
  const [whitelistMethodsDropdown, setWhitelistMethodsDropdown] = useState<string>("")
  const [whitelistMethods, setWhitelistMethods] = useState<
    Array<{ id: string; inputValue: string }>
  >(formatData(gatewaySettings.whitelistMethods))
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
      <securityAction.Form method="post" action="/api/securitySettings">
        <input type="hidden" name="appID" value={params.appId} />
        <Card>
          <div className="pokt-card-header">
            <h3>Private Secret Key Required</h3>
            <Switch
              aria-label="Private key required"
              id="secretRequired"
              name="secretKeyRequired"
              checked={secretKeyRequired}
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
              icon={true}
              aria-label="Select a chain to add to white list"
              defaultText="Select Chain"
              selectedChains={[""]}
              handleChainClick={(val) => {
                setWhitelistBlockchains(addIfMissing(val, whitelistBlockchains))
              }}
            />
          </div>
          {whitelistBlockchains.map((item: string) => (
            <React.Fragment key={item}>
              <AppEndpointUrl
                key={item}
                value={params.appId ?? ""}
                chainId={item}
                hasDelete={true}
                handleRemove={() => {
                  setWhitelistBlockchains((current) => removeFromArray(item, current))
                }}
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
              type="button"
              aria-label="Add user agents to white list"
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
              <div className="list" key={item}>
                <TextInput
                  readOnly
                  copy
                  hasDelete={true}
                  handleRemove={() => {
                    setWhitelistUserAgents((current) => removeFromArray(item, current))
                  }}
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
              type="button"
              aria-label="Add origins to white list"
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
              <div className="list" key={item}>
                <TextInput
                  readOnly
                  copy
                  hasDelete={true}
                  handleRemove={() => {
                    setWhitelistOrigins((current) => removeFromArray(item, current))
                  }}
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
              selectedChains={[""]}
              handleChainClick={(val) => {
                setWhitelistContractsDropdown(val)
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
              type="button"
              aria-label="Add contract selections to white list"
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
                  ]),
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
              <div className="list" key={`${item.id} ${item.inputValue}`}>
                <AppEndpointUrl
                  chainId={item.id}
                  value={item.inputValue}
                  copy
                  readOnly
                  hasDelete
                  handleRemove={() => {
                    setWhitelistContracts((current) =>
                      removeFromArrayByValue(item.inputValue, "inputValue", current),
                    )
                  }}
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
              icon={false}
              defaultText={
                whitelistMethodsDropdown !== ""
                  ? getChainName(whitelistMethodsDropdown)
                  : "Select Chain"
              }
              selectedChains={[""]}
              handleChainClick={(val) => {
                setWhitelistMethodsDropdown(val)
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
              type="button"
              aria-label="Add method selections to white list"
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
              <div className="list" key={`${item.id} ${item.inputValue}`}>
                <AppEndpointUrl
                  chainId={item.id}
                  value={item.inputValue}
                  hasDelete
                  copy
                  readOnly
                  handleRemove={() => {
                    setWhitelistMethods((current) =>
                      removeFromArrayByValue(item.inputValue, "inputValue", current),
                    )
                  }}
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
          variant="filled"
          type="submit"
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
