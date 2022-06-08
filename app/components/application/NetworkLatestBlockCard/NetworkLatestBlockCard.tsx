import { useMemo } from "react"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { LatestBlockAndPerformanceData } from "~/models/portal.server"
import styles from "./styles.css"
import { Grid, List } from "@mantine/core"
import PoweredBy, { links as PoweredByLinks } from "~/components/shared/PoweredBy"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"

export const links = () => {
  return [
    ...CardLinks(),
    ...PoweredByLinks(),
    ...CardListLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

interface LatestBlockProps {
  latestBlock: LatestBlockAndPerformanceData
}

function appendZeroToTime(time: string) {
  return time.length < 2 ? `0${time}` : time
}

export default function LatestBlock({ latestBlock }: LatestBlockProps) {
  const blockProducedDateInLocalTime = useMemo(() => {
    const blockProducedTimeInDate = new Date(latestBlock.highestBlock.item.time)
    const hours = appendZeroToTime(blockProducedTimeInDate.getHours().toLocaleString())
    const minutes = appendZeroToTime(
      blockProducedTimeInDate.getMinutes().toLocaleString(),
    )

    return `${hours}:${minutes} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
  }, [latestBlock])

  if (!latestBlock.highestBlock) {
    return null
  }

  const rows: CardListItem[] = [
    {
      label: "Block",
      value: latestBlock.highestBlock.item.height,
    },
    {
      label: "Time",
      value: blockProducedDateInLocalTime,
    },
    {
      label: "Relays",
      value: latestBlock.highestBlock.item.total_relays_completed.toLocaleString(),
    },
    {
      label: "Txs",
      value: latestBlock.highestBlock.item.total_txs.toLocaleString(),
    },
    {
      label: "Produced in",
      value: `${latestBlock.highestBlock.item.took.toFixed(2)} min`,
    },
    {
      label: "Validator Threshold",
      value: latestBlock.highestBlock.validatorThreshold.toLocaleString(),
    },
  ]

  return (
    <div className="pokt-network-latest-block">
      <Card>
        <div className="pokt-card-header">
          <h3>Latest Block</h3>
        </div>
        <CardList items={rows} />
        <PoweredBy to="https://poktscan.com/" image="/poktscanLogo.png" alt="Poktscan" />
      </Card>
    </div>
  )
}
