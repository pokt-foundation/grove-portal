import { Tooltip as MantineTooltip, TooltipProps } from "@pokt-foundation/pocket-blocks"

export type { TooltipProps }

export default function Tooltip(props: TooltipProps) {
  const { children, ...tooltipProps } = props
  return (
    <MantineTooltip
      color="blue"
      multiline={tooltipProps.multiline ?? true}
      {...tooltipProps}
    >
      {children}
    </MantineTooltip>
  )
}
