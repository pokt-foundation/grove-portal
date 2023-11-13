import { Divider } from "@mantine/core"
import { Box, CloseButton, Flex, Text, Tooltip } from "@pokt-foundation/pocket-blocks"
import React from "react"

type ModalHeaderProps = {
  title: string
  subtitle: string
  onDiscard: () => void
}

const ModalHeader = ({ title, subtitle, onDiscard }: ModalHeaderProps) => {
  return (
    <Box>
      <Flex align="center" justify="space-between" mb={12}>
        <Text fw={600} fz="21px">
          {title}
        </Text>
        <Tooltip withArrow label="Discard" position="bottom">
          <CloseButton aria-label="Discard" size="lg" onClick={onDiscard} />
        </Tooltip>
      </Flex>
      <Text>{subtitle}</Text>

      <Divider my={32} />
    </Box>
  )
}

export default ModalHeader
