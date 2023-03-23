import { Button, Space } from "@pokt-foundation/pocket-blocks"
import { useState } from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import CopyTextIcon from "~/components/shared/CopyTextIcon"
import RevealIcon from "~/components/shared/RevealIcon"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...TextInputLinks(), { rel: "stylesheet", href: styles }]
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
        <TextInput readOnly label="Portal ID" value={id}>
          <Button className="pokt-button-outline" color="blue" variant="outline">
            <CopyTextIcon text={String(id)} />
          </Button>
        </TextInput>
        {secret && !isMember && (
          <>
            <Space h="sm" />
            <TextInput
              readOnly
              rightSection={
                <RevealIcon
                  revealed={secretHidden}
                  setRevealed={() => setSecretHidden(!secretHidden)}
                />
              }
              label="Secret Key"
              type={secretHidden ? "password" : "text"}
              value={secret}
            >
              <Button className="pokt-button-outline" color="blue" variant="outline">
                <CopyTextIcon text={String(secret)} />
              </Button>
            </TextInput>
          </>
        )}
        {publicKey && (
          <>
            <Space h="sm" />
            <TextInput
              readOnly
              rightSection={
                <RevealIcon
                  revealed={publicKeyHidden}
                  setRevealed={() => setPublicKeyHidden(!publicKeyHidden)}
                />
              }
              label="Public Key"
              type={publicKeyHidden ? "password" : "text"}
              value={publicKey}
            >
              <Button className="pokt-button-outline" color="blue" variant="outline">
                <CopyTextIcon text={String(publicKey)} />
              </Button>
            </TextInput>
          </>
        )}
      </Card>
    </div>
  )
}
