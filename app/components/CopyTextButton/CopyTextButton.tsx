import { Tooltip, ActionIcon, CopyButton, Box, ActionIconProps } from "@mantine/core"
import cx from "clsx"
import { forwardRef, HTMLAttributes } from "react"
import { LuCopy, LuCopyCheck } from "react-icons/lu"
import useCommonStyles from "~/styles/commonStyles"

type CopyTextButtonProps = {
  value: string
  variant?: ActionIconProps["variant"]
  size?: number
  width?: number
} & HTMLAttributes<HTMLDivElement>

const CopyTextButton = forwardRef<HTMLDivElement, CopyTextButtonProps>(
  ({ value, variant = "outline", size = 18, width = 40, ...props }, ref) => {
    const { classes: commonClasses } = useCommonStyles()

    return (
      <Box ref={ref} {...props}>
        <CopyButton timeout={2000} value={value}>
          {({ copied, copy }) => (
            <Tooltip withArrow label={copied ? "Copied" : "Copy"}>
              <ActionIcon
                className={cx({ [commonClasses.grayOutline]: variant === "outline" })}
                color={copied ? "teal" : "gray"}
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
