import {
  IconEyeOn,
  IconEyeOff,
  useMantineTheme,
  Button,
} from "@pokt-foundation/pocket-blocks"

type RevealIconProps = {
  revealed: boolean
  setRevealed: () => void
}

export default function RevealIcon({ revealed, setRevealed }: RevealIconProps) {
  const theme = useMantineTheme()

  return (
    <Button
      aria-label={`Click to ${revealed ? "show" : "hide"} value`}
      tabIndex={0}
      onClick={setRevealed}
      size="xs"
      variant="subtle"
    >
      {revealed ? (
        <IconEyeOn cursor="pointer" fill={theme.colors.blue[5]} width={18} height={18} />
      ) : (
        <IconEyeOff cursor="pointer" fill={theme.colors.blue[5]} height={18} width={18} />
      )}
    </Button>
  )
}
