import { Box, Group, Select, Stack, Title } from "@mantine/core"
import { Prism } from "@mantine/prism"
import { useParams } from "@remix-run/react"
import React, { useEffect, useState } from "react"
import useChainSandboxContext from "~/components/ChainSandbox/state"
import CopyTextButton from "~/components/CopyTextButton"
import JsonViewer from "~/components/JsonViewer"
import { KeyValuePair } from "~/types/global"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"

type ChainSandboxBodyProps = {
  chainUrl: string
  requestHeaders: KeyValuePair<string>
}

type RequestFormat = "json" | "curl"

const getCurlCommand = (url: string, headers: KeyValuePair<string>, body: string) => {
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

const ChainSandboxBody = ({ chainUrl, requestHeaders }: ChainSandboxBodyProps) => {
  const { appId } = useParams()
  const { state, dispatch } = useChainSandboxContext()
  const { selectedChain, selectedMethod, requestPayload } = state
  const isRpc = selectedChain?.enforceResult === "JSON"
  const [requestFormat, setRequestFormat] = useState<RequestFormat>("json")

  useEffect(() => {
    dispatch({
      type: "SET_REQUEST_PAYLOAD",
      payload: getInitialRequestPayload({ method: selectedMethod, isRpc }),
    })
  }, [selectedMethod, isRpc, dispatch])

  return (
    <Stack pos="relative" spacing={12}>
      <Group position="apart">
        <Title order={6}>Body</Title>
        <Select
          data={[
            { value: "json", label: "JSON" },
            { value: "curl", label: "cURL" },
          ]}
          value={requestFormat}
          onChange={(e: RequestFormat) => setRequestFormat(e)}
        />
      </Group>
      {requestFormat === "json" ? (
        <JsonViewer
          editable
          value={requestPayload}
          onEditSave={(payload) => {
            trackEvent({
              category: AnalyticCategories.app,
              action: AnalyticActions.app_chain_sandbox_send_request,
              label: `App ID: ${appId}, Blockchain: ${selectedChain?.blockchain}`,
              value: JSON.stringify(payload),
            })

            dispatch({ type: "SET_REQUEST_PAYLOAD", payload: payload })
          }}
        />
      ) : (
        <Box pos="relative">
          <CopyTextButton
            size={16}
            style={{ zIndex: 100, top: 8, right: 8, position: "absolute" }}
            value={getCurlCommand(
              chainUrl,
              requestHeaders,
              JSON.stringify(requestPayload),
            )}
            variant="transparent"
            width={28}
          />
          <Prism noCopy withLineNumbers language="bash">
            {getCurlCommand(chainUrl, requestHeaders, JSON.stringify(requestPayload))}
          </Prism>
        </Box>
      )}
    </Stack>
  )
}

export default ChainSandboxBody
