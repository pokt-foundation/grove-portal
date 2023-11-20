import { Avatar, Flex, Stack, Text } from "@mantine/core"
import React from "react"
import { Blockchain } from "~/models/portal/sdk"

type ChainProps = {
  chain: Blockchain
}
const Chain = ({ chain }: ChainProps) => {
  return (
    <Flex gap="sm">
      <Avatar radius={40} size={40} src={`/chain-logos/${chain.blockchain}.svg`} />
      <Stack spacing={0} w={200}>
        <Text truncate fw={600}>
          {chain?.description}
        </Text>
        <Text c="dimmed" fz="xs">
          {chain?.blockchain}
        </Text>
      </Stack>
    </Flex>
  )
}

export default Chain
