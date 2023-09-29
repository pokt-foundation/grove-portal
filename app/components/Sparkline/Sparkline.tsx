import { Box, Text, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import React from "react"
import {
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts"
import { ChartData } from "~/types/global"
import { formatNumberToSICompact } from "~/utils/formattingUtils"

type SparkLineProps = {
  data: ChartData[]
  label: string
  xAxisDataKey: string
  yAxisDataKey: string
}

const Sparkline = ({
  data,
  label = " relays",
  xAxisDataKey,
  yAxisDataKey,
}: SparkLineProps) => {
  const theme = useMantineTheme()

  const CustomTooltip = ({ active, payload, label, valueLabel }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          p="sm"
          style={{
            backgroundColor: theme.colors.dark[9],
            border: `1px solid ${theme.colors.dark[4]}`,
          }}
        >
          <Text className="label">Date: {label}</Text>
          <Text className="desc">
            {payload[0].value}
            {valueLabel}
          </Text>
        </Box>
      )
    }

    return null
  }

  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart data={data} height={350} margin={{ bottom: 100 }}>
        {/* style={{ transform: "translate(-5px, -5px)" }} }} */}
        {/* tick={{ stroke: "red", strokeWidth: 2, x: 50, cx: 60, y: 100 }} */}
        <CartesianGrid
          strokeDasharray="3 3"
          strokeWidth={0.2}
          style={{ fill: theme.colors.gray[8] }}
          vertical={false}
        />
        <XAxis
          dataKey={xAxisDataKey}
          minTickGap={15}
          padding={{ left: 30, right: 30 }}
          stroke={theme.colors.gray[8]}
          tick={{ fill: theme.colors.gray[6] }}
          tickLine={false}
          tickMargin={35}
        />
        <YAxis
          axisLine={false}
          dataKey={yAxisDataKey}
          includeHidden={true}
          minTickGap={0}
          padding={{ top: 40 }}
          tick={{ fill: theme.colors.gray[6] }}
          tickFormatter={(val) => (val === 0 ? val : `${formatNumberToSICompact(val)}`)}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip valueLabel={label} />} />
        <Line
          activeDot={{ stroke: theme.colors.blue[5], strokeWidth: 1 }}
          dataKey="val"
          dot={{
            fill: theme.colors.dark[9],
            stroke: theme.colors.blue[7],
            strokeWidth: 1,
          }}
          stroke={theme.colors.blue[7]}
          // strokeWidth={2}
          type="bumpX"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Sparkline
