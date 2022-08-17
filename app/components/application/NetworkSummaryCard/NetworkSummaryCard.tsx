import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"

/* c8 ignore next */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface NetworkSummaryCardProps {
  title: string
  subtitle: string
  imgSrc: string
}

export default function NetworkSummaryCard({
  imgSrc,
  subtitle,
  title,
}: NetworkSummaryCardProps) {
  return (
    <div className="pokt-network-summary">
      <Card>
        <div className="pokt-network-summary-content">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <img
          alt="network summary nodes"
          className="pokt-network-summary-image"
          src={imgSrc}
        />
      </Card>
    </div>
  )
}
