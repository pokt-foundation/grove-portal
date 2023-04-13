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
      onClick={setRevealed}
      p="0 .5em"
      size="xs"
      tabIndex={0}
      variant="subtle"
    >
      {revealed ? (
        <IconEyeOn cursor="pointer" fill={theme.colors.gray[6]} height={18} width={18} />
      ) : (
        <IconEyeOff cursor="pointer" fill={theme.colors.gray[6]} height={18} width={18} />
      )}
    </Button>
  )
}
