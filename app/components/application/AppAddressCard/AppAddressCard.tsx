import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore next */
export const links = () => {
  return [...CardLinks(), ...TextInputLinks(), { rel: "stylesheet", href: styles }]
}

interface AppAddressCardProps {
  apps: { appId: string }[]
}

export default function AppAddressCard({ apps }: AppAddressCardProps) {
  const {
    t: { appAddressCard },
  } = useTranslate()

  return (
    <div className="pokt-app-addresses">
      <Card>
        <div className="flexContainer">
          <h3>{appAddressCard.heading}</h3>
          {apps.length > 0 && <p>{apps.length}</p>}
        </div>
        {apps && apps.length > 0 ? (
          apps.map((item) => {
            return <TextInput key={item.appId} readOnly copy value={item.appId} />
          })
        ) : (
          <p>{appAddressCard.error}</p>
        )}
      </Card>
    </div>
  )
}
