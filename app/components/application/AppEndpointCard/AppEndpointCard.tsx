import { Grid } from "@mantine/core"
import { Box, Button, Text, theme } from "@pokt-foundation/pocket-blocks"
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
import CopyText from "~/components/shared/CopyText"
import HelpTooltip from "~/components/shared/HelpTooltip"
import TextInput from "~/components/shared/TextInput"
import { useUser } from "~/context/UserContext"
import { Blockchain, BlockchainsQuery, EndpointQuery } from "~/models/portal/sdk"
import { ChainMetadata, prefixFromChainId } from "~/utils/chainUtils"
import ExternalArrow from "~/components/shared/Icons/ExternalArrow"

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
                blockchains={blockchains.sort(function (a, b) {
                  if (a?.description && b?.description) {
                    if (a.description < b.description) {
                      return -1
                    }
                    if (a.description > b.description) {
                      return 1
                    }
                  }
                  return 0
                })}
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
          align="start"
          justify="space-between"
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
                margin: "0 0 2em 0",
              }}
            >
              <Grid align="center" m={0}>
                <Text m="0 0.5em 0 0" size="lg" weight={600}>
                  Your Data API
                </Text>
                <Text m="0 0.5em 0 0" size="sm" weight={400}>
                  (powered by Covalent)
                </Text>
                <HelpTooltip
                  label={
                    "The following API key can be used to authenticate against the Covalent API. When authenticating, use the API key as the username and a blank password."
                  }
                />
              </Grid>
              <Button className="pokt-button-outline" color="blue" variant="outline">
                <Text color={theme.white} fz="sm" fw="normal" mr="0.5em">
                  <a
                    href="https://www.covalenthq.com/docs/api/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Data API Docs
                  </a>
                </Text>
                <ExternalArrow />
              </Button>
            </Grid>
            <TextInput value={"https://api.covalenthq.com/v1"}>
              <CopyText text={String("https://api.covalenthq.com/v1")}>
                <Text color={theme.white} fz="sm" fw="normal" mr="0.5em">
                  Copy
                </Text>
              </CopyText>
            </TextInput>
            <Text color={theme.white} fz="sm" fw="normal" mb="0">
              This endpoint supports Ethereum, Polygon, BSC and more. For a full list,
              please{" "}
              <a
                className="link"
                href="https://docs.pokt.network/supported-blockchains/"
                target="_blank"
              >
                review the docs
              </a>
              .
            </Text>
            <Text color={theme.white} fz="sm" fw="normal" mt="0">
              How was your experience?{" "}
              <a
                className="link"
                href="https://docs.pokt.network/supported-blockchains/"
                target="_blank"
              >
                Tell us here
              </a>
              .
            </Text>
          </Box>
        </Grid>
      </Card>
    </div>
  )
}
