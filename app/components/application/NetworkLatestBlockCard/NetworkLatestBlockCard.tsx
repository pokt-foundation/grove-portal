import { useMemo } from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import { LatestBlockType } from "~/routes/dashboard/index"

export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}

interface LatestBlockProps {
  latestBlock: LatestBlockType
}

function appendZeroToTime(time: string) {
  return time.length < 2 ? `0${time}` : time
}

export default function LatestBlock({ latestBlock }: LatestBlockProps) {
  const blockProducedDateInLocalTime = useMemo(() => {
    const blockProducedTimeInDate = new Date(latestBlock.time)
    const hours = appendZeroToTime(blockProducedTimeInDate.getHours().toLocaleString())
    const minutes = appendZeroToTime(
      blockProducedTimeInDate.getMinutes().toLocaleString(),
    )

    return `${hours}:${minutes} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
  }, [latestBlock])

  if (!latestBlock) {
    return null
  }

  const rows: CardListItem[] = [
    {
      label: "Block",
      value: latestBlock.height,
    },
    {
      label: "Time",
      value: blockProducedDateInLocalTime,
    },
    // {
    //   label: "Relays",
    //   value: latestBlock.total_relays_completed.toLocaleString(),
    // },
    {
      label: "Txs",
      value: latestBlock.total_txs.toLocaleString(),
    },
    {
      label: "Apps",
      value: latestBlock.total_apps.toLocaleString(),
    },
    {
      label: "Nodes",
      value: latestBlock.total_nodes.toLocaleString(),
    },
    {
      label: "Accounts",
      value: latestBlock.total_accounts.toLocaleString(),
    },
    // {
    //   label: "Produced in",
    //   value: `${latestBlock.took.toFixed(2)} min`,
    // },
    // {
    //   label: "Validator Threshold",
    //   value: latestBlock.validatorThreshold.toLocaleString(),
    // },
  ]

  return (
    <div className="pokt-network-latest-block">
      <Card>
        <div className="pokt-card-header">
          <h3>Latest Block</h3>
        </div>
        <CardList items={rows} />
      </Card>
    </div>
  )
}
