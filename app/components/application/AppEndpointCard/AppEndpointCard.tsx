import {
  Anchor,
  Box,
  Button,
  Text,
  useMantineTheme,
  Grid,
  Group,
  Select,
  IconArrowUpRight,
  IconPlus,
} from "@pokt-foundation/pocket-blocks"
import { forwardRef, useEffect, useMemo, useRef } from "react"
import AppEndpointUrl, {
  links as AppEndpointUrlLinks,
} from "~/components/application/AppEndpointUrl"
import { Card, links as CardLinks } from "~/components/shared/Card"
import CopyText from "~/components/shared/CopyText"
import HelpTooltip from "~/components/shared/HelpTooltip"
import TextInput from "~/components/shared/TextInput"
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

const SelectItem = forwardRef<HTMLDivElement, { label: string; value: string }>(
  ({ label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text>{label}</Text>
      </Group>
    </div>
  ),
)

SelectItem.displayName = "SelectItem"

export default function AppEndpointCard({ app, blockchains }: AppEndpointProps) {
  const user = useUser()
  const theme = useMantineTheme()
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

  const addNewChainSelectRef = useRef<HTMLInputElement>(null)

  const selectChainData = useMemo(() => {
    return blockchains
      .map((chain) => ({
        label: chain?.description ?? "",
        value: chain?.id ?? "",
      }))
      .sort((a, b) => {
        if (a.label < b.label) {
          return -1
        }
        if (a.label > b.label) {
          return 1
        }
        return 0
      })
  }, [blockchains])

  return (
    <div className="pokt-app-endpoint">
      <Card>
        <div className="pokt-card-header">
          <h3>Endpoint</h3>
          <div>
            {app.gigastake ? (
              <Select
                ref={addNewChainSelectRef}
                searchable
                aria-label="Add new"
                placeholder="Add new"
                itemComponent={SelectItem}
                data={selectChainData}
                rightSection={
                  <IconPlus fill={theme.colors.blue[5]} width={18} height={18} />
                }
                onChange={handleAddToStoredChains}
                size="xs"
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
        <Grid
          align="center"
          dir="column"
          justify="space-between"
          sx={{
            margin: "2em 0 0",
            paddingTop: "2em",
            borderTop: "1px solid #2F373E",
          }}
        >
          <Grid align="center" justify="space-between" m={0} w="100%">
            <Group spacing={4}>
              <Text size="lg" weight={600}>
                Your Data API
              </Text>
              <Text size="sm" weight={400}>
                (powered by Covalent)
              </Text>
              <HelpTooltip
                label={"This endpoint supports Ethereum, Polygon, BSC and more."}
              />
            </Group>
            <Anchor href="https://www.covalenthq.com/docs/api/" target="_blank">
              <Button size="xs" variant="outline">
                <Text fw="normal" fz="xs" mr="0.5em">
                  Data API Docs
                </Text>
                <IconArrowUpRight fill={theme?.colors?.blue[5]} width={18} height={18} />
              </Button>
            </Anchor>
          </Grid>
          <Box>
            <Text mb={0}>URL</Text>
            <TextInput value="https://api.covalenthq.com/v1">
              <CopyText text={String("https://api.covalenthq.com/v1")} />
            </TextInput>
            <Text mb={0}>API Key</Text>
            <TextInput
              mt="0.5em"
              value={
                app.integrations.covalentAPIKeyPaid || app.integrations.covalentAPIKeyFree
              }
            >
              <CopyText
                text={String(
                  app.integrations.covalentAPIKeyPaid ||
                    app.integrations.covalentAPIKeyFree,
                )}
              />
            </TextInput>
            <Text color={theme.white} fw="normal" fz="sm" mb="0">
              The following API key can be uses to authenticate against the Covalent API.
              When authenticating, add the API key using the x-api-key header to the
              request.
            </Text>
          </Box>
        </Grid>
      </Card>
    </div>
  )
}
