import { Group, Select, Stack, Title } from "@mantine/core"
import { useParams } from "@remix-run/react"
import React, { useCallback, useEffect, useState } from "react"
import JsonEditor from "app/components/JsonEditor"
import useChainSandboxContext from "~/components/ChainSandbox/state"
import CodeEditor, { AutocompleteOption } from "~/components/CodeEditor"
import { KeyValuePair } from "~/types/global"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { evmMethods, isEvmChain } from "~/utils/chainUtils"

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
    ? JSON.stringify(
        {
          method: method ?? "",
          params: [],
          id: 1,
          jsonrpc: "2.0",
        },
        null,
        " ",
      )
    : "{}"
}

const methodsAutocompleteOptions: AutocompleteOption[] = evmMethods.map((method) => ({
  label: method,
}))

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

  const handleCodeEditorChange = useCallback(
    (value: string) => {
      trackEvent({
        category: AnalyticCategories.app,
        action: AnalyticActions.app_chain_sandbox_send_request,
        label: `App ID: ${appId}, Blockchain: ${selectedChain?.blockchain}`,
        value: JSON.stringify(value),
      })
      dispatch({ type: "SET_REQUEST_PAYLOAD", payload: value })

      try {
        const requestPayload = JSON.parse(value)

        const { method } = requestPayload
        if (
          isEvmChain(selectedChain) &&
          method &&
          evmMethods.includes(method) &&
          selectedMethod !== method
        ) {
          dispatch({ type: "SET_SELECTED_METHOD", payload: requestPayload.method })
        }
      } catch (e) {}
    },
    [appId, selectedChain, selectedMethod, dispatch],
  )

  return (
    <Stack gap={12} pos="relative">
      <Group justify="space-between">
        <Title order={6}>Body</Title>
        <Select
          data={[
            { value: "json", label: "JSON" },
            { value: "curl", label: "cURL" },
          ]}
          value={requestFormat}
          onChange={(value: string | null) =>
            value && setRequestFormat(value as RequestFormat)
          }
        />
      </Group>
      {requestFormat === "json" ? (
        <JsonEditor
          autocompleteOptions={
            isEvmChain(selectedChain) ? methodsAutocompleteOptions : undefined
          }
          value={requestPayload}
          onChange={handleCodeEditorChange}
        />
      ) : (
        <CodeEditor
          readOnly
          lang="shell"
          value={getCurlCommand(chainUrl, requestHeaders, requestPayload)}
        />
      )}
    </Stack>
  )
}

export default ChainSandboxBody
