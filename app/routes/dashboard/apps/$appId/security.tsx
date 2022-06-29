import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useState } from "react"
import { Form } from "@remix-run/react"
import invariant from "tiny-invariant"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { getAppSecurity } from "../../../../models/portal.server"
import { AppIdLoaderData } from "../$appId"
import styles from "../../../../styles/dashboard.apps.$appId.security.css"
import { Checkbox } from "@mantine/core"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { IconTrashcan } from "@pokt-foundation/ui"
import ChainsDropdown, {
  links as ChainsDropdownLinks,
} from "~/components/application/ChainsDropdown/ChainsDropdown"
import { CHAIN_ID_PREFIXES } from "~/utils/chainUtils"

export const meta: MetaFunction = () => {
  return {
    title: "Application Security - POKT Portal - Pocket Network",
  }
}

export const links = () => {
  return [
    ...TextInputLinks(),
    ...ChainsDropdownLinks(),
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

export const loader: LoaderFunction = async ({ request, params, context }) => {
  invariant(params.appId, "app id not found")
  const id = params.appId
  const appSecurityData = await getAppSecurity(id, request)
  /*
  return json<securitySettings>(
    {
      ...appSecurityData,
    },
    {
      headers: {
        "Cache-Control": `private, max-age=${
          process.env.NODE_ENV === "production" ? "3600" : "60"
        }`,
      },
    },
  ) */
  return null
}

export default function AppSecurity() {
  const appIDRoute = useMatchesRoute("routes/dashboard/apps/$appId")
  const {
    app: { gatewaySettings },
  } = appIDRoute?.data as AppIdLoaderData
  const appID = appIDRoute?.id

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
  >(gatewaySettings.whitelistContracts)
  const [whitelistMethodsInput, setWhitelistMethodsInput] = useState<string>("")
  const [whitelistMethodsDropdown, setWhitelistMethodsDropdown] = useState<string>("")
  const [whitelistMethods, setWhitelistMethods] = useState<
    Array<{ id: string; inputValue: string }>
  >(gatewaySettings.whitelistMethods)
  const [whitelistMethodsError, setWhitelistMethodsError] = useState<boolean>(false)

  const removeFromArray = (item: string, arr: string[]) => {
    let newArr = arr
    newArr.splice(newArr.indexOf(item), 1)
    return newArr
  }

  const addIfMissing = (item: string, arr: string[]) => {
    if (arr.indexOf(item) !== -1) {
      return arr
    }
    return [...arr, item]
  }

  /* maybe not necessary....
  const findIndex = (data: { id: string; name: string }[], value: string) => {
    return data.findIndex((item) => item.id === value)
  }
*/
  const getChainName = (key: string) => {
    const value = CHAIN_ID_PREFIXES.get(key)
    return value?.name || "Undefined"
  }

  const removeFromArraybyValue = (
    data: { id: string; inputValue: string }[],
    findme: string,
  ) => {
    const index = data.findIndex(
      (item: { inputValue: string }) => item.inputValue === findme,
    )
    let newArr = data
    newArr.splice(index, 1)
    return newArr
  }

  return (
    <div className="security">
      <h3>Application Security</h3>
      <p>
        To maximize the security of your application, you should activate the private
        secret key for all requests and enable the use of whitelist user agents and
        origins.
      </p>
      <Form method="post" action="/api/securitySettings">
        <input type="hidden" name="appID" value={appID} />
        <div className="card">
          <div className="flexRow">
            <label htmlFor="secretRequired">Private Secret Key Required</label>
            <Checkbox
              id="secretRequired"
              name="secretKeyRequired"
              defaultValue={gatewaySettings.secretKeyRequired}
            />
          </div>
        </div>
        <div className="card">
          <div className="flexRow">
            <h3>Approved Chains</h3>
            <ChainsDropdown
              aria-label="Select a chain to add to white list"
              defaultText="Select Chain"
              selectedChains={["0021"]}
              handleChainClick={(val) => {
                setWhitelistBlockchains(addIfMissing(val, whitelistBlockchains))
              }}
            />
          </div>
          {whitelistBlockchains.map((item: string) => {
            return (
              <div className="flexGrowRow" key={item}>
                <TextInput readOnly copy value={getChainName(item)} />
                <button
                  type="button"
                  className="trash"
                  onClick={() => {
                    const removedFromArray = removeFromArray(item, whitelistBlockchains)
                    setWhitelistBlockchains(removedFromArray)
                  }}
                >
                  <IconTrashcan />
                </button>
                <input name="whitelistBlockchains" type="hidden" value={item} />
              </div>
            )
          })}
        </div>
        <div className="card">
          <div className="flexRow">
            <label htmlFor="userAgents">Whitelisted User-Agents</label>
          </div>
          <div className="flexGrowRow">
            <input
              className="grow userInputs"
              id="userAgents"
              name="whitelistUserAgentsInput"
              value={whitelistUserAgentsElement}
              onChange={(e) => {
                setWhitelistUserAgentsElement(e.target.value)
              }}
            />
            <button
              type="button"
              aria-label="Add user agents to white list"
              className="add"
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
            </button>
          </div>
          {whitelistUserAgents.map((item: string) => {
            return (
              <div key={item} className="flexGrowRow">
                <TextInput readOnly copy value={item} />
                <button
                  type="button"
                  className="trash"
                  onClick={() => {
                    const removedFromArray = removeFromArray(item, whitelistUserAgents)
                    setWhitelistUserAgents(removedFromArray)
                  }}
                >
                  <IconTrashcan />
                </button>
                <input name="whitelistUserAgents" type="hidden" value={item} />
              </div>
            )
          })}
        </div>
        <div className="card">
          <div className="flexRow">
            <label htmlFor="origins">Whitelisted Origins</label>
          </div>
          <div className="flexGrowRow">
            <input
              className="grow userInputs"
              id="userOrigins"
              value={whitelistOriginsElement}
              onChange={(e) => {
                setWhitelistOriginsElement(e.target.value)
              }}
            />
            <button
              type="button"
              aria-label="Add origins to white list"
              className="add"
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
            </button>
          </div>
          {whitelistOrigins.map((item: string) => {
            return (
              <div className="flexGrowRow" key={item}>
                <TextInput readOnly copy value={item} />
                <button
                  type="button"
                  className="trash"
                  onClick={() => {
                    const removedFromArray = removeFromArray(item, whitelistOrigins)
                    setWhitelistOrigins(removedFromArray)
                  }}
                >
                  <IconTrashcan />
                </button>
                <input name="whitelistOrigins" type="hidden" value={item} />
              </div>
            )
          })}
        </div>
        <div className="card">
          <label htmlFor="approvedContracts">Approved Contracts</label>

          <div className="flexGrowRow">
            <ChainsDropdown
              defaultText={
                whitelistContractsDropdown !== ""
                  ? getChainName(whitelistContractsDropdown)
                  : "Select Chain"
              }
              selectedChains={["0021"]}
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
            <button
              type="button"
              className="add"
              aria-label="Add contract selections to white list"
              onClick={() => {
                setWhitelistContracts([
                  ...whitelistContracts,
                  { id: whitelistContractsDropdown, inputValue: whitelistContractsInput },
                ]),
                  setWhitelistContractsInput("")
                setWhitelistContractsDropdown("")
              }}
            >
              +
            </button>
          </div>
          {whitelistContracts.map((item) => {
            return (
              <div className="flexGrowRow" key={item.inputValue}>
                <TextInput
                  readOnly
                  copy
                  value={`${getChainName(item.id)} ${item.inputValue}`}
                />
                <button
                  type="button"
                  className="trash"
                  onClick={() => {
                    const removedFromArray = removeFromArraybyValue(
                      whitelistContracts,
                      item.inputValue,
                    )
                    setWhitelistContracts(removedFromArray)
                  }}
                >
                  <IconTrashcan />
                </button>

                <input
                  name="whitelistContracts"
                  disabled
                  type="hidden"
                  value={`{chain: ${item.id}, value: ${item.inputValue}}`}
                />
              </div>
            )
          })}
        </div>
        <div className="card">
          <label htmlFor="approvedMethods">Approved Methods</label>

          <div className="flexGrowRow">
            <ChainsDropdown
              defaultText={
                whitelistMethodsDropdown !== ""
                  ? getChainName(whitelistMethodsDropdown)
                  : "Select Chain"
              }
              selectedChains={["0021"]}
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
            <button
              type="button"
              className="add"
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
            </button>
          </div>
          {whitelistMethodsError && (
            <div>
              <p className="errorText">
                You must select a chain and have a value to add to methods whitelist.
              </p>
            </div>
          )}
          {whitelistMethods.map((item) => {
            return (
              <div className="flexGrowRow" key={item.inputValue}>
                <TextInput
                  readOnly
                  copy
                  value={`${getChainName(item.id)} ${item.inputValue}`}
                />
                <button
                  type="button"
                  className="trash"
                  onClick={() => {
                    const removedFromArray = removeFromArraybyValue(
                      whitelistMethods,
                      item.inputValue,
                    )
                    setWhitelistMethods(removedFromArray)
                  }}
                >
                  <IconTrashcan />
                </button>

                <input
                  name="whitelistMethods"
                  disabled
                  type="hidden"
                  value={`{chain: ${item.id}, value: ${item.inputValue}}`}
                />
              </div>
            )
          })}
        </div>

        <button className="submit" type="submit">
          Save
        </button>
      </Form>
    </div>
  )
}
