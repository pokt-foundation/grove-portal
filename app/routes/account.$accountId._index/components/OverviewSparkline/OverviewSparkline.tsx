import { Box, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import Sparkline from "~/components/Sparkline"
import { ChartData } from "~/types/global"

type OverviewSparklineProps = {
  label?: string
  title: string
  sparklineData: ChartData[]
}

export const OverviewSparkline = ({
  label = "relays",
  title,
  sparklineData,
}: OverviewSparklineProps) => {
  return (
    <Box h="350px" pt="xl">
      <Text fw="600" fz="md" mb="lg">
        {title}
      </Text>
      <Sparkline
        data={sparklineData}
        label={label}
        xAxisDataKey="date"
        yAxisDataKey="val"
      />
    </Box>
  )
}

export default OverviewSparkline
