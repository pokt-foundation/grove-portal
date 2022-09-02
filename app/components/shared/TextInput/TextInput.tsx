import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core"
import { Button } from "@pokt-foundation/pocket-blocks"
import { IconTrashcan } from "@pokt-foundation/ui"
import clsx from "clsx"
import styles from "./styles.css"
import CopyTextIcon, {
  links as CopyTextIconLinks,
} from "~/components/shared/CopyTextIcon"
import RevealIcon, { links as RevealIconLinks } from "~/components/shared/RevealIcon"

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
  handleRemove?: () => void
  setRevealed?: Function
}

export default function TextInput({
  copy = false,
  revealed = false,
  hasDelete = false,
  handleRemove = () => {},
  setRevealed,
  ...props
}: InputProps) {
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
          "right-section": props.rightSection,
        })}
        rightSection={rightSection}
        size={props.size ?? "md"}
        variant={props.variant ?? "unstyled"}
        {...props}
      />
      {hasDelete && (
        <Button
          className="pokt-text-delete"
          color="blue"
          variant="outline"
          onClick={handleRemove}
        >
          <IconTrashcan />
        </Button>
      )}
    </div>
  )
}
