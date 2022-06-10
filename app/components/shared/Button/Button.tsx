import { Button as MantineButton, ButtonProps } from "@mantine/core"

export default function Button<C = "button">(props: ButtonProps<C>) {
  const { children, ...buttonProps } = props
  return (
    <MantineButton variant={buttonProps.variant ?? "outline"} {...buttonProps}>
      {children}
    </MantineButton>
  )
}
