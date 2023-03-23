import { useEffect, useMemo } from "react"
import ChainsDropdown, { links as ChainsDropdownLinks } from "../ChainsDropdown"
import styles from "./styles.css"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import ChainWithImage, {
  links as ChainWithImageLinks,
} from "~/components/application/ChainWithImage"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { useUser } from "~/context/UserContext"
import { Blockchain, BlockchainsQuery, EndpointQuery } from "~/models/portal/sdk"
import { ChainMetadata, prefixFromChainId } from "~/utils/chainUtils"
import { Grid } from "@mantine/core"
import { Box, Button, Text } from "@pokt-foundation/pocket-blocks"
import HelpTooltip from "~/components/shared/HelpTooltip"
import TextInput from "~/components/shared/TextInput"
import DocsIcon from "~/components/shared/Icons/DocsIcon"
import CopyTextIcon from "~/components/shared/CopyTextIcon"

/* c8 ignore start */
export const links = () => {
  return [
    ...CardLinks(),
    ...ChainsDropdownLinks(),
    ...ChainWithImageLinks(),
    ...AppEndpointUrlLinks(),
    { rel: "stylesheet", href: styles },
  ]
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
                blockchains={blockchains}
                defaultText="Add New"
                handleChainClick={handleAddToStoredChains}
                icon={true}
                selectedChains={
                  user.data?.preferences.endpoints &&
                  user.data?.preferences.endpoints[app.id]
                    ? user.data?.preferences.endpoints[app.id]
                    : ["0021"]
                }
              />
            ) : (
              <ChainWithImage chain={chainDescription} />
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
        <Grid
          justify="space-between"
          align="start"
          sx={{
            margin: "2em 0 0",
            paddingTop: "2em",
            borderTop: "1px solid #2F373E",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Grid
              align="center"
              justify="space-between"
              sx={{
                margin: "0 0 3em 0",
              }}
            >
              <Grid align="center" m={0}>
                <Text weight={600} size="lg" mr="0.5em">Your Data API</Text>
                <Text weight={400} size="sm" mr="0.5em">
                  (powered by Covalent)
                </Text>
                <HelpTooltip label={"Help"} />
              </Grid>
              <Button className="pokt-button-outline" color="blue" variant="outline">
                <Text className="pokt-button-outline-text">
                  <a href="https://www.covalenthq.com/docs/api/" target="_blank">
                    Docs
                  </a>
                </Text>
                <DocsIcon />
              </Button>
            </Grid>
            <TextInput value={"https://api.covalenthq.com/v1"}>
              <Button className="pokt-button-outline" color="blue" variant="outline">
                <Text className="pokt-button-outline-text">Copy</Text>
                <CopyTextIcon text={String("https://api.covalenthq.com/v1")} />
              </Button>
            </TextInput>
          </Box>
        </Grid>
      </Card>
    </div>
  )
}
