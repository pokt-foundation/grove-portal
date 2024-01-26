import { Select, TextInput, Flex, Tooltip, useMantineTheme } from "@mantine/core"
import { useParams } from "@remix-run/react"
import React, { useMemo } from "react"
import { Blockchain } from "~/models/portal/sdk"
import { AnalyticActions, AnalyticCategories, trackEvent } from "~/utils/analytics"
import { evmMethods, getAppEndpointUrl, isEvmChain } from "~/utils/chainUtils"

type ChainSandboxInputsProps = {
  chains: Blockchain[]
  selectedChain: Blockchain | null
  onChainSelect: (chain: Blockchain) => void
  selectedMethod: string | null | undefined
  onMethodSelect: (method: string | null) => void
  chainRestPath: string
  onChainRestPathSet: (path: string) => void
}
const ChainSandboxInputs = ({
  selectedChain,
  selectedMethod,
  onMethodSelect,
  chainRestPath,
  onChainRestPathSet,
}: ChainSandboxInputsProps) => {
  const { appId } = useParams()
  const theme = useMantineTheme()
  const isRpc = selectedChain?.enforceResult === "JSON"

  const chainMethods = useMemo(
    () =>
      isEvmChain(selectedChain)
        ? evmMethods.map((method) => ({ value: method, label: method }))
        : [],
    [selectedChain],
  )

  return selectedChain ? (
    <>
      <Flex direction="row" gap="sm">
        <TextInput
          readOnly
          bg={theme.colors.gray[9]}
          miw={300}
          style={{ flexGrow: 1.5 }}
          value={getAppEndpointUrl(selectedChain, appId)}
        />
        {isRpc ? (
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
                onMethodSelect(method)
                trackEvent({
                  category: AnalyticCategories.app,
                  action: AnalyticActions.app_chain_sandbox_select_method,
                  label: `Method: ${method}`,
                })
              }}
            />
          </Tooltip>
        ) : (
          <TextInput
            placeholder="Path"
            style={{ flexGrow: 1 }}
            value={chainRestPath}
            onChange={(e) => {
              onChainRestPathSet(e.currentTarget.value)
            }}
            onFocus={() => {
              if (!chainRestPath) onChainRestPathSet("/")
            }}
          />
        )}
      </Flex>
    </>
  ) : null
}

export default ChainSandboxInputs
