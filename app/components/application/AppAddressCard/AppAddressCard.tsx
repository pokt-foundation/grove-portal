import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useTranslate } from "~/context/TranslateContext"
import { ProcessedEndpoint } from "~/models/portal/sdk"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...TextInputLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface AppAddressCardProps {
  apps: ProcessedEndpoint["apps"]
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
          apps.map((item) =>
            item ? <TextInput key={item.appId} copy readOnly value={item.appId} /> : null,
          )
        ) : (
          <p>{appAddressCard.error}</p>
        )}
      </Card>
    </div>
  )
}
