import { ActionIcon, ActionIconProps, Box, CopyButton, Tooltip } from "@mantine/core"
import { forwardRef, HTMLAttributes } from "react"
import { LuCopy, LuCopyCheck } from "react-icons/lu"

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
                color={copied ? "teal" : color ?? "gray"}
                data-outline-exclude={copied ? "true" : "false"}
                radius="xl"
                size={width}
                variant={variant}
                onClick={copy}
              >
                {copied ? <LuCopyCheck size={size} /> : <LuCopy size={size} />}
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
