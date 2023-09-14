import { Stack, Switch, Text } from "@pokt-foundation/pocket-blocks"
import React, { useState } from "react"

type PrivateSecretKeyProps = {
  secretKeyRequired: boolean
}

const PrivateSecretKey = ({ secretKeyRequired }: PrivateSecretKeyProps) => {
  const [isSecretKeyRequired, setIsSecretKeyRequired] = useState<boolean>(
    Boolean(secretKeyRequired),
  )
  return (
    <Stack px={40} py={32}>
      <Text fw={600}>Private Secret Key Required</Text>
      <Text>
        To maximize the security of your application, you should activate the private
        secret key for all requests and enable the use of whitelisted user-agents and
        origins.
      </Text>
      <Switch
        aria-label="Private Secret Key Required"
        checked={isSecretKeyRequired}
        id="secretRequired"
        name="secretKeyRequired"
        onChange={(event) => {
          setIsSecretKeyRequired(event.currentTarget.checked)
          // Also update settings here
        }}
      />
    </Stack>
  )
}

export default PrivateSecretKey
