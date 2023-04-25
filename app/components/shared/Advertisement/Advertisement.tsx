import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/shared/Card"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type AdvertisementProps = {
  styles: React.CSSProperties
  content: JSX.Element
  action: JSX.Element
}

export const Advertisement = ({ styles, content, action }: AdvertisementProps) => {
  return (
    <div className="pokt-ad" style={styles}>
      <Card>
        {content}
        {action}
      </Card>
    </div>
  )
}

export default Advertisement
