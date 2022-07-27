import { Card, links as CardLinks } from "~/components/shared/Card"
import ChainWithImage, {
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import styles from "./styles.css"
import { ChainMetadata, prefixFromChainId } from "~/utils/chainUtils"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import { useUser } from "~/context/UserContext"
import { useEffect, useMemo } from "react"
import ChainsDropdown, { links as ChainsDropdownLinks } from "../ChainsDropdown"
import { ProcessedEndpoint } from "~/models/portal/sdk"

/* c8 ignore next */
export const links = () => {
  return [
    ...CardLinks(),
    ...ChainsDropdownLinks(),
    ...ChainWithImageLinks(),
    ...AppEndpointUrlLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

interface AppEndpointProps {
  app: ProcessedEndpoint
}

export default function AppEndpointCard({ app }: AppEndpointProps) {
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
      return app.chain ? (prefixFromChainId(chains[0]) as ChainMetadata) : { name: "" }
    }
    return { name: "" }
  }, [chains, app.chain])

  useEffect(() => {
    const storedChains = user.data?.preferences?.endpoints
      ? user.data?.preferences?.endpoints[app.id]
      : null

    if (user.type === "done" && !storedChains) {
      user.submit(
        {
          endpoints: JSON.stringify({
            [app.id]: app.chain ? [app.chain] : ["0021"],
          }),
        },
        {
          method: "post",
          action: "/api/user",
        },
      )
    }
  }, [app, user])

  const handleAddToStoredChains = (chain: string) => {
    if (!user.data?.preferences?.endpoints || !user.data?.preferences?.endpoints[app.id])
      return
    if (user.data?.preferences?.endpoints[app.id].includes(chain)) return

    user.submit(
      {
        endpoints: JSON.stringify({
          [app.id]: user.data?.preferences?.endpoints[app.id]
            ? [...user.data?.preferences?.endpoints[app.id], chain]
            : [chain],
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
        (e) => e !== chain,
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
    <div className="pokt-app-endpoint">
      <Card>
        <div className="pokt-card-header">
          <h3>Endpoint</h3>
          <div>
            {app.gigastake ? (
              <ChainsDropdown
                icon={true}
                defaultText="Add New"
                selectedChains={
                  user.data?.preferences.endpoints &&
                  user.data?.preferences.endpoints[app.id]
                    ? user.data?.preferences.endpoints[app.id]
                    : ["0021"]
                }
                handleChainClick={handleAddToStoredChains}
              />
            ) : (
              <ChainWithImage chain={chainDescription} />
            )}
          </div>
        </div>
        {chains &&
          chains.map((chain: string) => {
            const { prefix } = prefixFromChainId(chain) ?? { prefix: "" }
            const endpoint = `https://${prefix}.gateway.pokt.network/v1/lb/${app.id}`
            return (
              <AppEndpointUrl
                key={chain}
                chainId={chain}
                value={endpoint}
                hasDelete={app.gigastake}
                handleRemove={() => handleRemoveFromStoredChains(chain)}
              />
            )
          })}
      </Card>
    </div>
  )
}
