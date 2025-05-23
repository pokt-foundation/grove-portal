import { ActionIcon, ActionIconProps, Box, CopyButton, Tooltip } from "@mantine/core"
import { Copy, CopyCheck } from "lucide-react"
import { forwardRef, HTMLAttributes } from "react"

type CopyTextButtonProps = {
  value: string
  variant?: ActionIconProps["variant"]
  size?: number
  width?: number
} & HTMLAttributes<HTMLDivElement>

const CopyTextButton = forwardRef<HTMLDivElement, CopyTextButtonProps>(
  ({ value, variant = "outline", size = 18, width = 40, color, ...props }, ref) => {
    return (
      <Box ref={ref} {...props}>
        <CopyButton timeout={2000} value={value}>
          {({ copied, copy }) => (
            <Tooltip withArrow label={copied ? "Copied" : "Copy"}>
              <ActionIcon
                aria-label="Copy value"
                c={copied ? "teal" : undefined}
                data-outline-exclude={copied ? "true" : "false"}
                radius="xl"
                size={width}
                variant={variant}
                onClick={copy}
              >
                {copied ? <CopyCheck size={size} /> : <Copy size={size} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Box>
    )
  },
)

CopyTextButton.displayName = "CopyTextButton"

export default CopyTextButton
