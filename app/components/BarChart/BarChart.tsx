import { useMantineTheme } from "@pokt-foundation/pocket-blocks"
import React, { useState } from "react"
import {
  CartesianGrid,
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import { ChartData } from "~/types/global"
type BarChartProps = {
  data: ChartData[]
  xAxisDataKey: string
  yAxisDataKey: string
}

const BarChart = ({ data, xAxisDataKey, yAxisDataKey }: BarChartProps) => {
  const theme = useMantineTheme()
  const [focusedBar, setFocusedBar] = useState<number | null>()
  const [mouseLeave, setMouseLeave] = useState(true)
  return (
    <ResponsiveContainer height="100%" width="100%">
      <RechartsBarChart
        data={data}
        height={350}
        margin={{ bottom: 100 }}
        onMouseLeave={() => {
          setMouseLeave(true)
          setFocusedBar(null)
        }}
        onMouseMove={(state) => {
          if (state.isTooltipActive) {
            setFocusedBar(state.activeTooltipIndex)
            setMouseLeave(false)
          }
        }}
      >
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
        <Tooltip cursor={false} />
        <Bar dataKey="val" fill={theme.colors.blue[7]} strokeWidth={3}>
          {data.map((entry, index) => (
            <Cell
              key={`${entry.val}-${index}`}
              fillOpacity={focusedBar === index || mouseLeave ? 1 : 0.2}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export default BarChart
