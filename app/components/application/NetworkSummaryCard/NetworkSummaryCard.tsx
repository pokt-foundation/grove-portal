import { Card, links as CardLinks } from "~/components/shared/Card"
import styles from "./styles.css"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface NetworkSummaryCardProps {
  title: string
  subtitle: string
  imgSrc: string
  error?: boolean
  errorMessage?: string
}

export default function NetworkSummaryCard({
  imgSrc,
  subtitle,
  title,
  error,
  errorMessage,
}: NetworkSummaryCardProps) {
  return (
    <div className="pokt-network-summary">
      <Card>
        <div className="pokt-network-summary-content">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <img
          className="pokt-network-summary-image"
          src={imgSrc}
          alt="network summary nodes"
        />
      </Card>
    </div>
  )
}
