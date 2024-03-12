import { Checkbox, Group, PasswordInput, Stack, Title } from "@mantine/core"
import React, { useEffect } from "react"
import useChainSandboxContext from "~/components/ChainSandbox/state"
import JsonViewer from "~/components/JsonViewer"

const ChainSandboxHeaders = () => {
  const { state, dispatch } = useChainSandboxContext()
  const { includeSecretKey, requestHeaders, selectedApp } = state
  const secretKey = selectedApp?.settings.secretKey as string

  useEffect(() => {
    dispatch({
      type: "SET_REQUEST_HEADERS",
      payload: {
        "Content-Type": "application/json",
        ...(includeSecretKey && { Authorization: secretKey }),
      },
    })
  }, [dispatch, includeSecretKey, secretKey])

  return (
    <Stack gap={12}>
      <Title order={6}>Header</Title>
      <Group>
        <Checkbox
          checked={includeSecretKey}
          label="Include secret key"
          onChange={(event) =>
            dispatch({
              type: "SET_INCLUDE_SECRET_KEY",
              payload: event.currentTarget.checked,
            })
          }
        />
        <PasswordInput
          readOnly
          aria-label="Secret Key"
          bg="#27292F80"
          classNames={{ input: "sandbox-input" }}
          pl={12}
          style={{
            flex: 1,
          }}
          value={secretKey}
          variant="unstyled"
        />
      </Group>

      <JsonViewer value={requestHeaders} />
    </Stack>
  )
}

export default ChainSandboxHeaders
