import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/shared/Card"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

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
