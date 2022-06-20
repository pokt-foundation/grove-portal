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
      value={value}
      size={size}
      color={`url(#${id})`}
      strokeWidth={strokeWidth}
    >
      <defs>
        <linearGradient id={id}>
          {gradientConfig.map(({ color, offset, opacity }, id) => (
            <stop key={id} offset={offset} stopOpacity={opacity} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
    </CircleGraph>
  )
}
