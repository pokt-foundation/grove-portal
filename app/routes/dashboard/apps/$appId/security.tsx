import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useState } from "react"
import { Form } from "@remix-run/react"
import invariant from "tiny-invariant"
import { useMatchesRoute } from "~/hooks/useMatchesRoute"
import { getAppSecurity } from "../../../../models/portal.server"
import { AppIdLoaderData } from "../$appId"
import styles from "../../../../styles/dashboard.apps.$appId.security.css"
import { Checkbox } from "@mantine/core"

export const meta: MetaFunction = () => {
  return {
    title: "Application Security - POKT Portal - Pocket Network",
  }
}

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
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

  const chains = [
    { name: "Polygon", id: "123" },
    { name: "Binance", id: "234" },
    { name: "Pokt", id: "345" },
    { name: "Harmony", id: "456" },
    { name: "Boba", id: "567" },
  ]

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
  const [whitelistContractsDropdown, setWhitelistContractsDropdown] = useState<string>(
    chains[0].id,
  )
  const [whitelistContracts, setWhitelistContracts] = useState<
    Array<{ id: string; value: string }>
  >(gatewaySettings.whitelistContracts)

  const [whitelistMethodsInput, setWhitelistMethodsInput] = useState<string>("")
  const [whitelistMethodsDropdown, setWhitelistMethodsDropdown] = useState<string>(
    chains[0].id,
  )
  const [whitelistMethods, setWhitelistMethods] = useState<
    Array<{ id: string; value: string }>
  >(gatewaySettings.whitelistMethods)

  function removeFromArray(item: string, arr: string[]) {
    let newArr = arr
    newArr.splice(newArr.indexOf(item), 1)
    return newArr
  }

  function addIfMissing(item: string, arr: string[]) {
    if (arr.indexOf(item) !== -1) {
      return arr
    }
    return [...arr, item]
  }

  const findIndex = (data: { id: string; name: string }[], value: string) => {
    console.log(data)
    console.log(value)
    return data.findIndex((item) => item.id === value)
  }

  const removeFromArraybyValue = (
    data: { id: string; value: string }[],
    findme: string,
  ) => {
    const index = data.findIndex((item: { value: string }) => item.value === findme)
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
      <Form>
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
            <label htmlFor="approvedChains">Approved Chains</label>
            <select
              id="approvedChains"
              onChange={(e) => {
                setWhitelistBlockchains(
                  addIfMissing(e.target.value, whitelistBlockchains),
                )
              }}
            >
              {chains.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )
              })}
            </select>
          </div>
          {whitelistBlockchains.map((item: string) => {
            return (
              <div className="flexGrowRow" key={item}>
                <input
                  className="grow"
                  disabled
                  name="whitelistBlockchains"
                  value={item}
                />
                <button>copy</button>
                <button
                  onClick={() => {
                    const removedFromArray = removeFromArray(item, whitelistBlockchains)
                    setWhitelistBlockchains(removedFromArray)
                  }}
                >
                  remove
                </button>
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
              className="grow"
              id="userAgents"
              name="whitelistUserAgentsInput"
              value={whitelistUserAgentsElement}
              onChange={(e) => {
                setWhitelistUserAgentsElement(e.target.value)
              }}
            />
            <button
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
                <input
                  className="grow"
                  name="whitelistUserAgents"
                  defaultValue={item}
                  disabled
                />
                <button>copy</button>
                <button
                  onClick={() => {
                    const removedFromArray = removeFromArray(item, whitelistUserAgents)
                    setWhitelistUserAgents(removedFromArray)
                  }}
                >
                  remove
                </button>
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
              className="grow"
              id="userOrigins"
              value={whitelistOriginsElement}
              onChange={(e) => {
                setWhitelistOriginsElement(e.target.value)
              }}
            />
            <button
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
                <input className="grow" name="whitelistOrigins" value={item} disabled />
                <button>copy</button>
                <button
                  onClick={() => {
                    const removedFromArray = removeFromArray(item, whitelistOrigins)
                    setWhitelistOrigins(removedFromArray)
                  }}
                >
                  remove
                </button>
              </div>
            )
          })}
        </div>
        <div className="card">
          <label htmlFor="approvedContracts">Approved Contracts</label>

          <div className="flexGrowRow">
            <select
              id="approvedContracts"
              defaultValue={chains[0].id}
              onChange={(e) => {
                setWhitelistContractsDropdown(e.target.value)
              }}
            >
              {chains.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )
              })}
            </select>
            <input
              className="grow"
              name="whitelistContractsInput"
              value={whitelistContractsInput}
              onChange={(e) => {
                setWhitelistContractsInput(e.target.value)
              }}
            />
            <button
              onClick={() => {
                setWhitelistContracts([
                  ...whitelistContracts,
                  { id: whitelistContractsDropdown, value: whitelistContractsInput },
                ]),
                  setWhitelistContractsInput("")
              }}
            >
              +
            </button>
          </div>
          {whitelistContracts.map((item) => {
            console.log(item)
            return (
              <div className="flexGrowRow" key={item.value}>
                <p className="growInline">
                  {chains[findIndex(chains, item.id)].name} {item.value}
                </p>
                <button>copy</button>
                <button
                  onClick={() => {
                    const removedFromArray = removeFromArraybyValue(
                      whitelistContracts,
                      item.value,
                    )
                    setWhitelistContracts(removedFromArray)
                  }}
                >
                  remove
                </button>

                <input
                  name="whitelistContracts"
                  disabled
                  type="hidden"
                  value={`{chain: ${item.id}, value: ${item.value}}`}
                />
              </div>
            )
          })}
        </div>
        <div className="card">
          <label htmlFor="approvedMethods">Approved Methods</label>

          <div className="flexGrowRow">
            <select
              id="approvedMethods"
              defaultValue={chains[0].id}
              onChange={(e) => {
                setWhitelistMethodsDropdown(e.target.value)
              }}
            >
              {chains.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )
              })}
            </select>
            <input
              className="grow"
              name="whitelistMethodsInput"
              value={whitelistMethodsInput}
              onChange={(e) => {
                setWhitelistMethodsInput(e.target.value)
              }}
            />
            <button
              onClick={() => {
                setWhitelistMethods([
                  ...whitelistMethods,
                  { id: whitelistMethodsDropdown, value: whitelistMethodsInput },
                ]),
                  setWhitelistMethodsInput("")
              }}
            >
              +
            </button>
          </div>
          {whitelistMethods.map((item) => {
            console.log(item)
            return (
              <div className="flexGrowRow" key={item.value}>
                <p className="growInline">
                  {chains[findIndex(chains, item.id)].name} {item.value}
                </p>
                <button>copy</button>
                <button
                  onClick={() => {
                    const removedFromArray = removeFromArraybyValue(
                      whitelistMethods,
                      item.value,
                    )
                    setWhitelistMethods(removedFromArray)
                  }}
                >
                  remove
                </button>

                <input
                  name="whitelistMethods"
                  disabled
                  type="hidden"
                  value={`{chain: ${item.id}, value: ${item.value}}`}
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
