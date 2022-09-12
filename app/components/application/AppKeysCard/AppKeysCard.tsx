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
}

export default function AppKeysCard({ id, secret, publicKey }: AppKeysCardProps) {
  const [secretHidden, setSecretHidden] = useState(true)
  const [publicKeyHidden, setPublicKeyHidden] = useState(true)

  return (
    <div className="pokt-app-keys">
      <Card>
        <TextInput copy readOnly label="Portal ID" value={id} />
        {secret && (
          <TextInput
            copy
            readOnly
            label="Secret Key"
            revealed={secretHidden}
            setRevealed={setSecretHidden}
            type={secretHidden ? "password" : "text"}
            value={secret}
          />
        )}
        {publicKey && (
          <TextInput
            copy
            iconPadding
            readOnly
            label="Public Key"
            revealed={publicKeyHidden}
            setRevealed={setPublicKeyHidden}
            type={publicKeyHidden ? "password" : "text"}
            value={publicKey}
          />
        )}
      </Card>
    </div>
  )
}
