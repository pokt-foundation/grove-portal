import { Button, Card, Group, Select, Stack, Text } from "@mantine/core"
import { Prism } from "@mantine/prism"
import { FetcherWithComponents, useParams } from "@remix-run/react"
import React, { useEffect, useState } from "react"
import { LuSend } from "react-icons/lu"
import JsonEditor from "~/components/JsonEditor"
import { TitledCard } from "~/components/TitledCard"
import { Blockchain } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { isEvmChain } from "~/utils/chainUtils"

type ChainSandboxBodyProps = {
  blockchain: Blockchain
  chainUrl: string
  selectedMethod?: string | null
  secretKey?: string
  requestHeaders: { [key: string]: string }
  chainFetcher: FetcherWithComponents<any>
}

type RequestFormat = "json" | "curl"

const getCurlCommand = (
  url: string,
  headers: { [key: string]: string },
  body: string,
) => {
  const headersArray = Object.entries(headers).map(
    ([key, value]) => `-H '${key}: ${value}'`,
  )
  const headersString = headersArray.join(" \\\n  ")

  return `curl ${url} \\\n  -X POST \\\n  ${headersString} \\\n  -d '${body}'`
}

const getInitialRequestPayload = ({
  method,
  isRpc,
}: {
  method?: string | null
  isRpc: boolean
}) => {
  return isRpc
    ? {
        method: method ?? "",
        params: [],
        id: 1,
        jsonrpc: "2.0",
      }
    : {}
}

const ChainSandboxBody = ({
  blockchain,
  chainUrl,
  selectedMethod,
  secretKey,
  requestHeaders,
  chainFetcher,
}: ChainSandboxBodyProps) => {
  const { appId } = useParams()
  const isRpc = blockchain.enforceResult === "JSON"
  const [requestFormat, setRequestFormat] = useState<RequestFormat>("json")
  const [requestPayload, setRequestPayload] = useState<{ [key: string]: any }>(
    getInitialRequestPayload({ method: selectedMethod, isRpc }),
  )

  useEffect(() => {
    setRequestPayload(getInitialRequestPayload({ method: selectedMethod, isRpc }))
  }, [selectedMethod, isRpc])

  return (
    <TitledCard
      header={() => (
        <Group position="apart">
          <Text weight={600}>Body</Text>
          <Select
            data={[
              { value: "json", label: "JSON" },
              { value: "curl", label: "cURL" },
            ]}
            value={requestFormat}
            onChange={(e: RequestFormat) => setRequestFormat(e)}
          />
        </Group>
      )}
    >
      <Card.Section p="md">
        <Stack pos="relative" spacing={12}>
          {requestFormat === "json" ? (
            <JsonEditor
              payload={requestPayload}
              onEditSave={(payload) => {
                trackEvent({
                  category: AnalyticCategories.app,
                  action: AnalyticActions.app_chain_sandbox_send_request,
                  label: `App ID: ${appId}, Blockchain: ${blockchain.blockchain}`,
                  value: JSON.stringify(payload),
                })
                setRequestPayload(payload)
              }}
            />
          ) : (
            <Prism withLineNumbers language="bash">
              {getCurlCommand(chainUrl, requestHeaders, JSON.stringify(requestPayload))}
            </Prism>
          )}
          {blockchain && (
            <Button
              disabled={isEvmChain(blockchain) && !selectedMethod}
              leftIcon={<LuSend size={18} />}
              loading={chainFetcher.state === "submitting"}
              size="sm"
              w={200}
              onClick={() => {
                trackEvent({
                  category: AnalyticCategories.app,
                  action: AnalyticActions.app_chain_sandbox_edit_body,
                  label: `App ID: ${appId}, Blockchain: ${blockchain.blockchain}`,
                  value: JSON.stringify(requestPayload),
                })
                chainFetcher.submit(
                  {
                    payload: JSON.stringify(requestPayload),
                    chainUrl: chainUrl,
                    ...(secretKey && { secretKey }),
                  },
                  {
                    method: "POST",
                    action: "/api/sandbox",
                  },
                )
              }}
            >
              Send Request
            </Button>
          )}
        </Stack>
      </Card.Section>
    </TitledCard>
  )
}

export default ChainSandboxBody
