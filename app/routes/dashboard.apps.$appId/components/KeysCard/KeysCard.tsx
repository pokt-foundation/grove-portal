import { Space } from "@pokt-foundation/pocket-blocks"
import { useState } from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"

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

export default function KeysCard({ id, secret, publicKey, isMember }: AppKeysCardProps) {
  const [secretHidden, setSecretHidden] = useState(true)
  const [publicKeyHidden, setPublicKeyHidden] = useState(true)

  return (
    <div className="pokt-app-keys">
      <Card>
        <TextInput copy readOnly label="Portal ID" value={id} />
        {secret && !isMember && (
          <>
            <Space h="sm" />
            <TextInput
              copy
              readOnly
              label="Secret Key"
              revealed={secretHidden}
              setRevealed={() => setSecretHidden(!secretHidden)}
              type={secretHidden ? "password" : "text"}
              value={secret}
            />
          </>
        )}
        {publicKey && (
          <>
            <Space h="sm" />
            <TextInput
              copy
              iconPadding
              readOnly
              label="Public Key"
              revealed={publicKeyHidden}
              setRevealed={() => setPublicKeyHidden(!publicKeyHidden)}
              type={publicKeyHidden ? "password" : "text"}
              value={publicKey}
            />
          </>
        )}
      </Card>
    </div>
  )
}
