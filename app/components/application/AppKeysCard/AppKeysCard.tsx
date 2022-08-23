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
  secret?: string
  publicKey?: string
}

export default function AppKeysCard({ id, secret, publicKey }: AppKeysCardProps) {
  return (
    <div className="pokt-app-keys">
      <Card>
        <TextInput copy readOnly label="Portal ID" value={id} />
        {secret && (
          <TextInput copy readOnly label="Secret Key" type="password" value={secret} />
        )}
        {publicKey && (
          <TextInput copy readOnly label="Public Key" type="password" value={publicKey} />
        )}
      </Card>
    </div>
  )
}
