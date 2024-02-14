import {
  Button,
  Divider,
  Group,
  Stack,
  TextInput,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import React, { useMemo } from "react"
import useChainSandboxContext from "~/components/ChainSandbox/state"
import ChainSelectItem from "~/components/ChainSelectItem"
import CopyTextButton from "~/components/CopyTextButton"
import FluidSelect from "~/components/FluidSelect"
import { Blockchain, PortalApp } from "~/models/portal/sdk"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"
import { evmMethods, getAppEndpointUrl, isEvmChain } from "~/utils/chainUtils"

type ChainSandboxInputsProps = {
  apps?: PortalApp[]
  chains: Blockchain[]
  isLoading: boolean
  onSendRequest: () => void
}
const ChainSandboxInputs = ({
  apps,
  chains,
  isLoading,
  onSendRequest,
}: ChainSandboxInputsProps) => {
  const theme = useMantineTheme()
  const { state, dispatch } = useChainSandboxContext()
  const { selectedChain, selectedApp, selectedMethod, chainRestPath } = state
  const appId = selectedApp?.id
  const isRpc = selectedChain?.enforceResult === "JSON"

  const chainsSelectItems = chains?.map((chain) => ({
    value: chain.blockchain,
    label: chain.description ?? chain.blockchain,
    chain,
  }))

  const appsSelectItems = [
    ...(apps && apps.length > 0
      ? apps.map((app) => ({
          value: app?.id ?? "",
          label: `${String.fromCodePoint(
            parseInt(app?.appEmoji ? app.appEmoji : DEFAULT_APPMOJI, 16),
          )} ${app?.name}`,
        }))
      : []),
  ]

  const handleChainSelect = (chainId: string) => {
    const chain = chains.find((chain) => chain.blockchain === chainId)
    if (chain) {
      dispatch({ type: "SET_SELECTED_CHAIN", payload: chain })
    }
  }

  const handleAppSelect = (appId: string) => {
    const app = apps?.find((app) => app.id === appId)
    if (app) {
      dispatch({ type: "SET_SELECTED_APP", payload: app })
    }
  }

  const chainMethods = useMemo(
    () =>
      isEvmChain(selectedChain)
        ? evmMethods.map((method) => ({ value: method, label: method }))
        : [],
    [selectedChain],
  )

  return selectedChain ? (
    <Stack spacing="xl">
      <Group>
        <Group
          pos="relative"
          spacing={0}
          style={{
            border: `1px solid ${theme.colors.gray[8]}`,
            borderRadius: 4,
          }}
        >
          {appsSelectItems.length > 0 ? (
            <>
              <Divider orientation="vertical" />
              <Tooltip
                disabled={chainMethods.length > 0}
                label="Currently, methods are only available for EVM chains. Enter a method in the body instead."
              >
                <FluidSelect
                  withSearch
                  items={appsSelectItems}
                  placeholder="Select App"
                  value={appId}
                  onSelect={handleAppSelect}
                />
              </Tooltip>
            </>
          ) : null}
          <FluidSelect
            withSearch
            itemComponent={ChainSelectItem}
            items={chainsSelectItems}
            value={selectedChain?.blockchain}
            onSelect={handleChainSelect}
          />
          {isRpc ? (
            <>
              <Divider orientation="vertical" />
              <Tooltip
                disabled={chainMethods.length > 0}
                label="Currently, methods are only available for EVM chains. Enter a method in the body instead."
              >
                <FluidSelect
                  withSearch
                  disabled={chainMethods.length === 0}
                  items={chainMethods}
                  placeholder="Select Method"
                  value={selectedMethod}
                  onSelect={(method) =>
                    dispatch({ type: "SET_SELECTED_METHOD", payload: method })
                  }
                />
              </Tooltip>
            </>
          ) : null}
        </Group>

        <Button loading={isLoading} radius={4} size="sm" onClick={onSendRequest}>
          Send Request
        </Button>
      </Group>
      <Stack>
        <Title order={6}>Endpoint URL</Title>
        <TextInput
          readOnly
          bg="#27292F80"
          miw={300}
          pl={12}
          pr={3}
          rightSection={
            <CopyTextButton
              size={16}
              value={getAppEndpointUrl(selectedChain, appId)}
              variant="transparent"
              width={28}
            />
          }
          value={getAppEndpointUrl(selectedChain, appId)}
          variant="unstyled"
        />
      </Stack>

      {!isRpc ? (
        <TextInput
          autoFocus
          placeholder="Path"
          style={{ flexGrow: 1 }}
          value={chainRestPath}
          onChange={(e) => {
            dispatch({ type: "SET_CHAIN_REST_PATH", payload: e.currentTarget.value })
          }}
          onFocus={() => {
            if (!chainRestPath) dispatch({ type: "SET_CHAIN_REST_PATH", payload: "/" })
          }}
        />
      ) : null}
    </Stack>
  ) : null
}

export default ChainSandboxInputs