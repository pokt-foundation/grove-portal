import {
  Button,
  ButtonProps,
  IconDeleteAlt,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"

const Delete = ({
  children,
  onDelete,
  buttonProps,
}: {
  children?: React.ReactNode
  onDelete: () => void
  buttonProps?: ButtonProps & {
    iconFill?: string
    iconHeight?: number
    iconWidth?: number
  }
}) => {
  const theme = useMantineTheme()
  return (
    <Button
      aria-label="delete"
      size={buttonProps?.size ?? "xs"}
      p={buttonProps?.p ?? "0 .5em"}
      variant={buttonProps?.variant ?? "subtle"}
      onClick={onDelete}
      leftIcon={
        <IconDeleteAlt
          fill={buttonProps?.iconFill ?? theme.colors.gray[6]}
          height={buttonProps?.iconHeight ?? 18}
          width={buttonProps?.iconWidth ?? 18}
        />
      }
      sx={{
        ".mantine-Button-icon": {
          marginRight: children ? "1em" : 0,
        },
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}

export default Delete
