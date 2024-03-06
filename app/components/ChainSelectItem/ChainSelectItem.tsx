import { Group, Text } from "@mantine/core"
import React, { forwardRef } from "react"
import Chain from "~/components/Chain"
import { Blockchain } from "~/models/portal/sdk"
interface ChainSelectItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string
  chain?: Blockchain
}

const ChainSelectItem = forwardRef<HTMLDivElement, ChainSelectItemProps>(
  ({ chain, label, ...others }: ChainSelectItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group wrap="nowrap">
        {chain ? (
          <Chain chain={chain} variant="compact" />
        ) : (
          <Text fw={400} fz={14}>
            {label}
          </Text>
        )}
      </Group>
    </div>
  ),
)

ChainSelectItem.displayName = "ChainSelectItem"

export default ChainSelectItem
