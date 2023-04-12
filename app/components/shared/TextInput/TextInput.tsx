import {
  Grid,
  TextInput as MantineTextInput,
  TextInputProps,
  useMantineTheme,
} from "@pokt-foundation/pocket-blocks"

export type InputProps = TextInputProps & {
  revealed?: boolean
  setRevealed?: () => void
  children?: React.ReactNode
}

export default function TextInput({
  revealed = false,
  setRevealed,
  children,
  ...props
}: InputProps) {
  const theme = useMantineTheme()
  return (
    <Grid
      align="center"
      justify="space-between"
      m={0}
      sx={{
        gap: ".5em",
      }}
      w="100%"
    >
      <MantineTextInput
        rightSection={props.rightSection}
        rightSectionWidth="3.5em"
        size={props.size ?? "sm"}
        variant={props.variant ?? "filled"}
        {...props}
        sx={{
          backgroundColor: theme.colors.navy ? theme.colors.navy[6] : "blue",
          flexGrow: 1,
          marginBottom: 0,

          ".mantine-TextInput-input": {
            padding: props.rightSection ? ".5em 5em .5em .5em" : ".5em",
            fontSize: "0.75em",
          },
        }}
      />
      {children}
    </Grid>
  )
}
