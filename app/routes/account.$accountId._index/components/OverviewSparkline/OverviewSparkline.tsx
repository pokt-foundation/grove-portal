import { Box, LoadingOverlay, Space, Text } from "@mantine/core"
import React from "react"
import { type AxisDomain } from "recharts/types/util/types"
import Sparkline from "~/components/Sparkline"
import { ChartData } from "~/types/global"

type OverviewSparklineProps = {
  label?: string
  title?: string
  sparklineData: ChartData[]
  isLoading?: boolean
  customYAxisDomain?: AxisDomain
  commifyLabelValue?: boolean
}

export const OverviewSparkline = ({
  label = "relays",
  commifyLabelValue,
  title,
  sparklineData,
  isLoading,
  customYAxisDomain,
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
      <LoadingOverlay overlayProps={{ blur: 1 }} visible={!!isLoading} />
      <Sparkline
        commifyLabelValue={commifyLabelValue}
        customYAxisDomain={customYAxisDomain}
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
