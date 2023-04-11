import { Button, IconDeleteAlt, Text, theme } from "@pokt-foundation/pocket-blocks"
import styles from "./styles.css"
import ChainWithImage from "~/components/application/ChainWithImage"
import CopyText from "~/components/shared/CopyText/CopyText"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { InputProps } from "~/components/shared/TextInput"
import { Blockchain } from "~/models/portal/sdk"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }, ...TextInputLinks()]
}
/* c8 ignore stop */

type AppEndpointUrlProp = InputProps & {
  chain: Blockchain | undefined | null
  handleRemove: () => void
  hasDelete: boolean
}

export default function AppEndpointUrl({
  chain,
  handleRemove,
  hasDelete,
  ...props
}: AppEndpointUrlProp) {
  if (!chain) {
    return <></>
  }

  return (
    <div className="pokt-app-endpoint-url">
      <div className="pokt-app-endpoint-url-abbrv">
        <ChainWithImage chain={chain.description} label={chain.ticker} />
      </div>
      <TextInput {...props}>
        <CopyText text={String(props.value)}>
          <Text color={theme.white} fw="normal" fz="sm" mr="0.5em">
            Copy
          </Text>
        </CopyText>
        {hasDelete && (
          <Button
            aria-label="delete"
            className="pokt-button-outline"
            color="blue"
            variant="outline"
            onClick={handleRemove}
          >
            <IconDeleteAlt fill={theme.white} />
          </Button>
        )}
      </TextInput>
    </div>
  )
}
