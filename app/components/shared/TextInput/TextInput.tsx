import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core"
import { IconTrashcan } from "@pokt-foundation/ui"
import clsx from "clsx"
import Button from "../Button"
import styles from "./styles.css"
import CopyTextIcon, {
  links as CopyTextIconLinks,
} from "~/components/shared/CopyTextIcon"

export const links = () => {
  return [...CopyTextIconLinks(), { rel: "stylesheet", href: styles }]
}

export type InputProps = TextInputProps & {
  copy?: boolean
  hasDelete?: boolean
  handleRemove?: () => void
}

export default function TextInput({
  copy = false,
  hasDelete = false,
  handleRemove = () => {},
  ...props
}: InputProps) {
  let rightSection = props.rightSection

  if (!rightSection && copy) {
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
        <Button className="pokt-text-delete" onClick={handleRemove}>
          <IconTrashcan />
        </Button>
      )}
    </div>
  )
}
