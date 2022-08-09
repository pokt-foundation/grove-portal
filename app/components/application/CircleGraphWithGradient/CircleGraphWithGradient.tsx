import { CircleGraph } from "@pokt-foundation/ui"

interface CircleGraphWithGradientProps {
  id: string
  config: {
    value: number
    size?: number
    strokeWidth?: number
  }
  gradientConfig: {
    offset: string
    opacity: string
    color: string
  }[]
}

export default function CircleGraphWithGradient({
  id,
  config,
  gradientConfig,
}: CircleGraphWithGradientProps) {
  const { size = 130, strokeWidth = 20, value } = config

  return (
    <CircleGraph
      color={`url(#${id})`}
      size={size}
      strokeWidth={strokeWidth}
      value={value}
    >
      <defs>
        <linearGradient id={id}>
          {gradientConfig.map(({ color, offset, opacity }, id) => (
            <stop key={id} offset={offset} stopColor={color} stopOpacity={opacity} />
          ))}
        </linearGradient>
      </defs>
    </CircleGraph>
  )
}
