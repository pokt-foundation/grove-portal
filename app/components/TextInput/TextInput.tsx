import {
  Button,
  IconDeleteAlt,
  TextInput as MantineTextInput,
  TextInputProps,
} from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import styles from "./styles.css"
import CopyTextIcon, { links as CopyTextIconLinks } from "~/components/CopyTextIcon"
import RevealIcon, { links as RevealIconLinks } from "~/components/RevealIcon"

/* c8 ignore start */
export const links = () => {
  return [
    ...CopyTextIconLinks(),
    ...RevealIconLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

export type InputProps = TextInputProps & {
  copy?: boolean
  revealed?: boolean
  hasDelete?: boolean
  iconPadding?: boolean
  handleRemove?: () => void
  setRevealed?: () => void
}

export default function TextInput({
  copy = false,
  revealed = false,
  hasDelete = false,
  iconPadding = false,
  handleRemove = () => {},
  setRevealed,
  ...props
}: InputProps) {
  const hasRightSection =
    Boolean(props.rightSection) || Boolean(copy) || Boolean(setRevealed)

  let rightSection = props.rightSection

  if (!rightSection && copy && setRevealed) {
    // hidden and copy icons
    rightSection = (
      <>
        <RevealIcon revealed={revealed} setRevealed={setRevealed} />
        <CopyTextIcon text={String(props.value)} />
      </>
    )
  } else if (!rightSection && !copy && setRevealed) {
    // only revealed icon
    rightSection = <RevealIcon revealed={revealed} setRevealed={setRevealed} />
  } else if (!rightSection && copy && !setRevealed) {
    // only copy icon
    rightSection = <CopyTextIcon text={String(props.value)} />
  }

  return (
    <div className="pokt-text">
      <MantineTextInput
        className={clsx({
          "pokt-text-input": true,
          "right-section": Boolean(hasRightSection),
          iconPadding: iconPadding,
        })}
        rightSection={rightSection}
        {...props}
      />
      {hasDelete && (
        <Button
          className="pokt-text-delete"
          color="gray"
          size="sm"
          variant="light"
          onClick={handleRemove}
        >
          <IconDeleteAlt />
        </Button>
      )}
    </div>
  )
}
