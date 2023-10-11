import { Box, Text, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import React, { useMemo } from "react"
import {
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartData } from "~/types/global"
import { formatNumberToSICompact } from "~/utils/formattingUtils"

type SparkLineProps = {
  data: ChartData[]
  label: string
  height: number
  xAxisDataKey: string
  yAxisDataKey: string
}

const Sparkline = ({
  data,
  label = " relays",
  height,
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

  const maxCharactersWidth = useMemo(() => {
    let max = 0
    data.forEach((item) => {
      if (String(formatNumberToSICompact(Number(item.val))).length > max) {
        max = String(formatNumberToSICompact(Number(item.val))).length
      }
    })
    return max * 8 + 8
  }, [data])

  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart data={data} height={height}>
        <CartesianGrid
          strokeDasharray="3 3"
          strokeWidth={0.2}
          style={{ fill: theme.colors.gray[8] }}
          vertical={false}
        />
        <XAxis
          dataKey={xAxisDataKey}
          height={60}
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
          tick={{ fill: theme.colors.gray[6] }}
          tickFormatter={(val) => (val === 0 ? val : `${formatNumberToSICompact(val)}`)}
          tickLine={false}
          width={maxCharactersWidth}
        />
        <Tooltip content={<CustomTooltip valueLabel={label} />} />
        <Line
          connectNulls
          activeDot={{ stroke: theme.colors.blue[5], strokeWidth: 1 }}
          dataKey="val"
          dot={{
            fill: theme.colors.dark[9],
            stroke: theme.colors.blue[7],
          }}
          stroke={theme.colors.blue[7]}
          type="bumpX"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Sparkline
