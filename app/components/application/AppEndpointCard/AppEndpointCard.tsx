import { Text } from "@pokt-foundation/pocket-blocks"
import { useEffect, useMemo } from "react"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import { Card, links as CardLinks } from "~/components/Card"
import ChainsDropdown from "~/components/ChainsDropdown/ChainsDropdown"
import { useUser } from "~/context/UserContext"
import { Blockchain, BlockchainsQuery, EndpointQuery } from "~/models/portal/sdk"
import { ChainMetadata, prefixFromChainId } from "~/utils/chainUtils"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...AppEndpointUrlLinks()]
}
/* c8 ignore stop */

interface AppEndpointProps {
  app: EndpointQuery["endpoint"]
  blockchains: BlockchainsQuery["blockchains"]
}

export default function AppEndpointCard({ app, blockchains }: AppEndpointProps) {
  const user = useUser()
  const chains = useMemo(
    () =>
      user.data?.preferences?.endpoints
        ? user.data?.preferences?.endpoints[app.id]
        : null,
    [app.id, user],
  )
  const { name: chainDescription } = useMemo(() => {
    if (chains) {
      let c = app.apps ? app.apps[0].chain : null
      return c ? (prefixFromChainId(chains[0]) as ChainMetadata) : { name: "" }
    }
    return { name: "" }
  }, [chains, app])

  useEffect(() => {
    const storedChains = user.data?.preferences?.endpoints
      ? user.data?.preferences?.endpoints[app.id]
      : null

    let c = app.apps ? app.apps[0].chain : null

    if (user.type === "done" && !storedChains) {
      user.submit(
        {
          endpoints: JSON.stringify({
            [app.id]: c ? [c] : ["0021"],
          }),
        },
        {
          method: "post",
          action: "/api/user",
        },
      )
    }
  }, [app, user])

  const handleChangeInStoredChains = (chain: string) => {
    const currentEndpoints = user.data?.preferences?.endpoints?.[app.id]

    if (!currentEndpoints) return

    const modifiedEndpoints = currentEndpoints.includes(chain)
      ? currentEndpoints.filter((e: string) => e !== chain)
      : [...currentEndpoints, chain]

    user.submit(
      {
        endpoints: JSON.stringify({
          [app.id]: modifiedEndpoints,
        }),
      },
      {
        method: "post",
        action: "/api/user",
      },
    )
  }

  const handleRemoveFromStoredChains = (chain: string) => {
    if (!user.data?.preferences?.endpoints || !user.data?.preferences?.endpoints[app.id])
      return
    if (user.data?.preferences?.endpoints[app.id].includes(chain)) {
      const restOfEndpoints = user.data?.preferences?.endpoints[app.id].filter(
        (e: string) => e !== chain,
      )
      user.submit(
        {
          endpoints: JSON.stringify({
            [app.id]: restOfEndpoints,
          }),
        },
        {
          method: "post",
          action: "/api/user",
        },
      )
    }
  }

  return (
    <Card>
      <div className="pokt-card-header">
        <h3>Endpoints</h3>
        <div>
          {app.gigastake ? (
            <ChainsDropdown
              chains={blockchains}
              checkboxData={user.data?.preferences?.endpoints?.[app.id] || []}
              onChange={handleChangeInStoredChains}
            />
          ) : (
            <Text>{chainDescription}</Text>
          )}
        </div>
      </div>
      {chains &&
        chains.map((chain: string) => {
          const blockchain: Blockchain | undefined | null = blockchains.find(
            (c) => c?.id === chain,
          )
          const endpoint = `https://${blockchain?.blockchain}.gateway.pokt.network/v1/lb/${app.id}`
          return (
            <AppEndpointUrl
              key={chain}
              chain={blockchain}
              handleRemove={() => handleRemoveFromStoredChains(chain)}
              hasDelete={app.gigastake}
              value={endpoint}
            />
          )
        })}
    </Card>
  )
}
