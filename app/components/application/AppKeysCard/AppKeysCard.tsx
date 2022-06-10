import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"

export const links = () => {
  return [...CardLinks(), ...TextInputLinks(), { rel: "stylesheet", href: styles }]
}

interface AppKeysCardProps {
  id: string
  secret?: string
  publicKey?: string
}

export default function AppKeysCard({ id, secret, publicKey }: AppKeysCardProps) {
  return (
    <div className="pokt-app-keys">
      <Card>
        <TextInput readOnly copy value={id} label="Portal ID" />
        {secret && (
          <TextInput readOnly copy type="password" value={secret} label="Secret Key" />
        )}
        {publicKey && (
          <TextInput readOnly copy type="password" value={publicKey} label="Public Key" />
        )}
      </Card>
    </div>
  )
}
