import { Box, Text } from "@pokt-foundation/pocket-blocks"
import React from "react"
import Sparkline from "~/components/Sparkline"
import { ChartData } from "~/types/global"

type OverviewSparklineProps = { title: string; sparklineData: ChartData[] }

export const OverviewSparkline = ({ title, sparklineData }: OverviewSparklineProps) => {
  return (
    <Box h="350px" pt="xl">
      <Text fw="600" fz="md" mb="lg">
        {title}
      </Text>
      <Sparkline data={sparklineData} xAxisDataKey="date" yAxisDataKey="val" />
    </Box>
  )
}

export default OverviewSparkline
