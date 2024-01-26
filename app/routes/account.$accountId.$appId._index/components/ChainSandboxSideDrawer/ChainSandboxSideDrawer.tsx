import {
  Card,
  Checkbox,
  Drawer,
  Group,
  MantineTheme,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core"
import { Prism } from "@mantine/prism"
import { FetcherWithComponents, useFetcher, useParams } from "@remix-run/react"
import React, { useEffect, useMemo, useState } from "react"
import ChainSandboxBody from "app/routes/account.$accountId.$appId._index/components/ChainSandboxBody"
import { TitledCard } from "~/components/TitledCard"
import { Blockchain } from "~/models/portal/sdk"
import ChainSandboxInteractionPanel from "~/routes/account.$accountId.$appId._index/components/ChainSandboxInteractionPanel"
import { SandboxRequestData } from "~/routes/api.sandbox/route"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { getAppEndpointUrl } from "~/utils/chainUtils"

type ChainSandboxSideDrawerProps = {
  blockchain?: Blockchain
  chains: Blockchain[]
  onSideDrawerClose: () => void
  secretKey: string
}

// type ChainMethods = Pick<typeof schema, "methods">

const ChainSandboxSideDrawer = ({
  blockchain,
  chains,
  onSideDrawerClose,
  secretKey,
}: ChainSandboxSideDrawerProps) => {
  const { appId } = useParams()
  const chainFetcher: FetcherWithComponents<SandboxRequestData> = useFetcher()
  const [selectedMethod, setSelectedMethod] = useState<string | null>()
  const [includeSecretKey, setIncludeSecretKey] = useState<boolean>(false)
  const [selectedChain, setSelectedChain] = useState<Blockchain | null>(null)
  const [responseData, setResponseData] = useState()
  const [chainRestPath, setChainRestPath] = useState<string>("")

  const chainUrl = useMemo(
    () => `${getAppEndpointUrl(selectedChain, appId)}${chainRestPath || ""}`.trim(),
    [selectedChain, appId, chainRestPath],
  )

  const requestHeaders = {
    "Content-Type": "application/json",
    ...(includeSecretKey && { Authorization: secretKey }),
  }

  /*
    This is necessary because the blockchain prop can change over time, and without this, changes to the blockchain
    prop would not be reflected in the component after the initial render. The component is mounted only once, when
    route is loaded, since this is how Mantine Drawer works.
  */
  useEffect(() => {
    if (blockchain) {
      setSelectedChain(blockchain)
    }
  }, [blockchain])

  useEffect(() => {
    if (chainFetcher?.data?.data) {
      setResponseData(chainFetcher?.data?.data)
    }
  }, [chainFetcher?.data?.data])

  const handleSideDrawerClose = () => {
    setSelectedChain(null)
    setResponseData(undefined)
    setSelectedMethod(null)
    setIncludeSecretKey(false)
    setChainRestPath("")
    onSideDrawerClose()
  }

  const handleChainSelect = (chain: Blockchain) => {
    trackEvent({
      category: AnalyticCategories.app,
      action: AnalyticActions.app_chain_sandbox_change_chain,
      label: `Blockchain: ${chain.blockchain}`,
    })
    setSelectedMethod(null)
    setSelectedChain(chain)
    setChainRestPath("")
  }

  return (
    <Drawer
      opened={!!blockchain}
      overlayColor="#000000"
      overlayOpacity={0.5}
      padding="sm"
      position="right"
      size={800}
      onClose={handleSideDrawerClose}
    >
      {selectedChain ? (
        <Stack mt="-md">
          <ChainSandboxInteractionPanel
            chainRestPath={chainRestPath}
            chains={chains}
            selectedChain={selectedChain}
            selectedMethod={selectedMethod}
            onChainRestPathSet={setChainRestPath}
            onChainSelect={handleChainSelect}
            onMethodSelect={setSelectedMethod}
          />
          <TitledCard header={() => <Text weight={600}>Headers</Text>}>
            <Card.Section p="md">
              <Stack spacing={12}>
                <Group>
                  <Checkbox
                    checked={includeSecretKey}
                    label="Include secret key"
                    onChange={(event) => setIncludeSecretKey(event.currentTarget.checked)}
                  />
                  <PasswordInput
                    readOnly
                    aria-label="Secret Key"
                    sx={(theme: MantineTheme) => ({
                      flex: 1,
                    })}
                    value={secretKey}
                  />
                </Group>

                <Prism withLineNumbers language="json">
                  {JSON.stringify(requestHeaders, null, " ")}
                </Prism>
              </Stack>
            </Card.Section>
          </TitledCard>

          <ChainSandboxBody
            blockchain={selectedChain}
            chainFetcher={chainFetcher}
            chainUrl={chainUrl}
            requestHeaders={requestHeaders}
            secretKey={includeSecretKey ? secretKey : ""}
            selectedMethod={selectedMethod}
          />

          {responseData ? (
            <TitledCard header={() => <Text weight={600}>Response</Text>}>
              <Card.Section p="md">
                <Prism withLineNumbers language="json">
                  {JSON.stringify(responseData, null, " ")}
                </Prism>
              </Card.Section>
            </TitledCard>
          ) : null}
        </Stack>
      ) : null}
    </Drawer>
  )
}

export default ChainSandboxSideDrawer
