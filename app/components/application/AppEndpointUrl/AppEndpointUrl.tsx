import { Badge, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import styles from "./styles.css"
import CopyText from "~/components/shared/CopyText/CopyText"
import TextInput from "~/components/shared/TextInput"
import { InputProps } from "~/components/shared/TextInput"
import { Blockchain } from "~/models/portal/sdk"
import { getImageForChain } from "~/utils/known-chains/known-chains"
import Delete from "~/components/shared/Delete/Delete"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
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
  const theme = useMantineTheme()

  if (!chain) {
    return <></>
  }

  return (
    <div className="pokt-app-endpoint-url">
      <Badge
        fullWidth
        color="gray"
        leftSection={
          getImageForChain(chain.description || "") ? (
            <img
              alt={chain.description || ""}
              height={16}
              src={getImageForChain(chain.description || "")}
            />
          ) : null
        }
        p="12px 0"
        sx={{
          borderRadius: "8px",
        }}
        variant="outline"
        w={100}
      >
        {chain.description?.substring(0, 3).toUpperCase()}
      </Badge>
      <TextInput {...props}>
        <CopyText text={String(props.value)} />
        {hasDelete && <Delete onDelete={handleRemove} />}
      </TextInput>
    </div>
  )
}
