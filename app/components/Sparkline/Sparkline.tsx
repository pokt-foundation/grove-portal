import { Box, Text, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import React, { useMemo } from "react"
import {
  CartesianGrid,
  Area,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
} from "recharts"
import { type AxisDomain } from "recharts/types/util/types"
import { ChartData } from "~/types/global"
import { commify, formatNumberToSICompact } from "~/utils/formattingUtils"

type SparkLineProps = {
  data: ChartData[]
  label: string
  height: number
  xAxisDataKey: string
  yAxisDataKey: string
  customYAxisDomain?: AxisDomain
  commifyLabelValue?: boolean
}

const Sparkline = ({
  data,
  label = " relays",
  height,
  xAxisDataKey,
  yAxisDataKey,
  customYAxisDomain,
  commifyLabelValue,
}: SparkLineProps) => {
  const theme = useMantineTheme()

  const CustomTooltip = ({ active, payload, label, valueLabel, commifyValue }: any) => {
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
            {payload[0].value
              ? `${
                  commifyValue ? commify(payload[0].value) : payload[0].value
                } ${valueLabel}`
              : "No Data"}
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
      <ComposedChart data={data} height={height}>
        <defs>
          <linearGradient id="colorUv" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#389F58" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#27292F" stopOpacity={0.1} />
          </linearGradient>
        </defs>
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
          padding={{ left: 10, right: 10 }}
          stroke={theme.colors.gray[8]}
          tick={{ fill: theme.colors.gray[6] }}
          tickLine={false}
          tickMargin={35}
        />
        <YAxis
          axisLine={false}
          dataKey={yAxisDataKey}
          domain={customYAxisDomain}
          includeHidden={true}
          minTickGap={0}
          tick={{ fill: theme.colors.gray[6] }}
          tickFormatter={(val) => (val === 0 ? val : `${formatNumberToSICompact(val)}`)}
          tickLine={false}
          width={maxCharactersWidth}
        />
        <Tooltip
          content={<CustomTooltip commifyValue={commifyLabelValue} valueLabel={label} />}
          filterNull={false}
        />
        <Area
          connectNulls
          activeDot={{ stroke: theme.colors.green[5], strokeWidth: 1 }}
          dataKey="val"
          dot={false}
          fill="url(#colorUv)"
          fillOpacity={1}
          stroke={theme.colors.green[7]}
          strokeDasharray="4 4"
          strokeWidth={2}
          type="bumpX"
        />
        <Line
          activeDot={{ stroke: theme.colors.green[5], strokeWidth: 1 }}
          connectNulls={false}
          dataKey="val"
          dot={false}
          stroke={theme.colors.green[7]}
          strokeWidth={2}
          type="bumpX"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default Sparkline
