import { Tooltip as MantineTooltip, TooltipProps } from "@pokt-foundation/pocket-blocks"

export type { TooltipProps }

export default function Tooltip(props: TooltipProps) {
  const { children, ...tooltipProps } = props
  return (
    <MantineTooltip wrapLines={tooltipProps.wrapLines ?? true} {...tooltipProps}>
      {children}
    </MantineTooltip>
  )
}
