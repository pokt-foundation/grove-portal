import { Box, LoadingOverlay, Space, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import Sparkline from "~/components/Sparkline"
import { ChartData } from "~/types/global"

type OverviewSparklineProps = {
  label?: string
  title?: string
  sparklineData: ChartData[]
  isLoading?: boolean
}

export const OverviewSparkline = ({
  label = "relays",
  title,
  sparklineData,
  isLoading,
}: OverviewSparklineProps) => {
  const height = 350
  return (
    <Box h={`${height}px`}>
      {title ? (
        <Text fw="600" fz="md" mb="lg">
          {title}
        </Text>
      ) : (
        <Space mb="lg" />
      )}
      <LoadingOverlay overlayBlur={1} visible={!!isLoading} />
      <Sparkline
        data={sparklineData}
        height={height}
        label={label}
        xAxisDataKey="date"
        yAxisDataKey="val"
      />
    </Box>
  )
}

export default OverviewSparkline
