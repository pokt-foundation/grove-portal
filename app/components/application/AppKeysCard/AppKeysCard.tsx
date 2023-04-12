import { Space, Text } from "@pokt-foundation/pocket-blocks"
import { useState } from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import CopyText from "~/components/shared/CopyText"
import RevealIcon from "~/components/shared/RevealIcon"
import TextInput from "~/components/shared/TextInput"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface AppKeysCardProps {
  id: string
  secret?: string | null
  publicKey?: string
  isMember: boolean
}

export default function AppKeysCard({
  id,
  secret,
  publicKey,
  isMember,
}: AppKeysCardProps) {
  const [secretHidden, setSecretHidden] = useState(true)
  const [publicKeyHidden, setPublicKeyHidden] = useState(true)

  return (
    <div className="pokt-app-keys">
      <Card>
        <Text mb={0}>Portal ID</Text>
        <TextInput readOnly aria-label="Portal ID" value={id}>
          <CopyText text={String(id)} />
        </TextInput>
        {secret && !isMember && (
          <>
            <Space h="sm" />
            <Text mb={0}>Secret Key</Text>
            <TextInput
              readOnly
              aria-label="Secret Key"
              rightSection={
                <RevealIcon
                  revealed={secretHidden}
                  setRevealed={() => setSecretHidden(!secretHidden)}
                />
              }
              type={secretHidden ? "password" : "text"}
              value={secret}
            >
              <CopyText text={String(secret)} />
            </TextInput>
          </>
        )}
        {publicKey && (
          <>
            <Space h="sm" />
            <Text mb={0}>Public Key</Text>
            <TextInput
              readOnly
              aria-label="Public Key"
              rightSection={
                <RevealIcon
                  revealed={publicKeyHidden}
                  setRevealed={() => setPublicKeyHidden(!publicKeyHidden)}
                />
              }
              type={publicKeyHidden ? "password" : "text"}
              value={publicKey}
            >
              <CopyText text={String(publicKey)} />
            </TextInput>
          </>
        )}
      </Card>
    </div>
  )
}
