import {
  Card,
  Checkbox,
  Drawer,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import { Prism } from "@mantine/prism"
import {
  Flex,
  MantineTheme,
  PasswordInput,
  Tooltip,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { FetcherWithComponents, useFetcher, useParams } from "@remix-run/react"
import React, { useEffect, useMemo, useState } from "react"
import ChainSelect from "~/components/ChainSelect"
import { TitledCard } from "~/components/TitledCard"
import { Blockchain } from "~/models/portal/sdk"
import ChainSandboxBody from "~/routes/account.$accountId.$appId._index/components/ChainPlaygroundBody"
import { SandboxRequestData } from "~/routes/api.sandbox/route"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { evmMethods, getAppEndpointUrl, isEvmChain } from "~/utils/chainUtils"

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
  const theme = useMantineTheme()
  const chainFetcher: FetcherWithComponents<SandboxRequestData> = useFetcher()
  const [selectedMethod, setSelectedMethod] = useState<string | null>()
  const [includeSecretKey, setIncludeSecretKey] = useState<boolean>(false)
  const [selectedChain, setSelectedChain] = useState<Blockchain | null>(null)
  const [responseData, setResponseData] = useState()

  const chainMethods = useMemo(() => {
    return isEvmChain(selectedChain)
      ? evmMethods.map((method) => ({ value: method, label: method }))
      : []
  }, [selectedChain])

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
    onSideDrawerClose()
  }

  return (
    <Drawer
      opened={!!blockchain}
      overlayColor="#000000"
      overlayOpacity={0.5}
      padding="sm"
      position="right"
      size={800}
      withinPortal={false}
      onClose={handleSideDrawerClose}
    >
      <Stack mt="-md">
        {selectedChain && (
          <ChainSelect
            chains={chains}
            selectedChain={selectedChain}
            onChainSelect={(chain) => {
              trackEvent({
                category: AnalyticCategories.app,
                action: AnalyticActions.app_chain_sandbox_change_chain,
                label: `Blockchain: ${chain.blockchain}`,
              })
              setSelectedMethod(null)
              setSelectedChain(chain)
            }}
          />
        )}

        <Flex direction="row" gap="sm">
          {selectedChain && (
            <TextInput
              readOnly
              bg={theme.colors.gray[9]}
              miw={300}
              style={{ flexGrow: 1 }}
              value={getAppEndpointUrl(selectedChain, appId)}
            />
          )}
          <Tooltip
            disabled={chainMethods.length > 0}
            label="Currently, methods select is only available for EVM chains."
          >
            <Select
              searchable
              data={chainMethods}
              disabled={chainMethods.length === 0}
              miw={325}
              placeholder="Mehod"
              value={selectedMethod}
              onChange={(method) => {
                setSelectedMethod(method)
                trackEvent({
                  category: AnalyticCategories.app,
                  action: AnalyticActions.app_chain_sandbox_select_method,
                  label: `Method: ${method}`,
                })
              }}
            />
          </Tooltip>
        </Flex>
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
        {selectedChain && (
          <ChainSandboxBody
            blockchain={selectedChain}
            chainFetcher={chainFetcher}
            requestHeaders={requestHeaders}
            secretKey={includeSecretKey ? secretKey : ""}
            selectedMethod={selectedMethod}
          />
        )}

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
    </Drawer>
  )
}

export default ChainSandboxSideDrawer
