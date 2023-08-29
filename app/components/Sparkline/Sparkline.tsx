import { useMantineTheme } from "@pokt-foundation/pocket-blocks"
import React from "react"
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

type SparkLineProps = {
  data: ChartData[]
  xAxisDataKey: string
  yAxisDataKey: string
}

const Sparkline = ({ data, xAxisDataKey, yAxisDataKey }: SparkLineProps) => {
  const theme = useMantineTheme()

  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart data={data} height={350} margin={{ bottom: 100 }}>
        {/* style={{ transform: "translate(-5px, -5px)" }} }} */}
        {/* tick={{ stroke: "red", strokeWidth: 2, x: 50, cx: 60, y: 100 }} */}
        <CartesianGrid
          strokeWidth={0.2}
          style={{ fill: theme.colors.gray[8] }}
          vertical={false}
        />
        <XAxis
          dataKey={xAxisDataKey}
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
          tickFormatter={(val) => (val === 0 ? val : `${val}k`)}
          tickLine={false}
        />
        <Tooltip />
        <Line dataKey="val" dot={false} stroke={theme.colors.blue[7]} strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Sparkline
