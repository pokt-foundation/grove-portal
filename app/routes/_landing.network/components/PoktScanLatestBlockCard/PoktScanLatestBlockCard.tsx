import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/Card"
import CardList, { CardListItem, links as CardListLinks } from "~/components/CardList"
import PoweredBy, { links as PoweredByLinks } from "~/components/PoweredBy"
import { GetLatestBlockQuery } from "~/models/poktscan/sdk"
import { uPoktToPokt } from "~/utils/pocketUtils"

/* c8 ignore start */
export const links = () => {
  return [
    ...CardLinks(),
    ...CardListLinks(),
    ...PoweredByLinks(),
    { rel: "stylesheet", href: styles },
  ]
}
/* c8 ignore stop */

interface LatestBlockProps {
  latestBlock: GetLatestBlockQuery
}

function appendZeroToTime(time: string) {
  return time.length < 2 ? `0${time}` : time
}

export default function PoktScanLatestBlock({ latestBlock }: LatestBlockProps) {
  if (!latestBlock) {
    return null
  }

  const rows: CardListItem[] = getList(latestBlock)

  return (
    <div className="pokt-network-latest-block">
      <Card>
        <div className="pokt-card-header">
          <h3>Latest Block</h3>
        </div>
        <CardList items={rows} />
        <PoweredBy alt="Poktscan" image="/poktscanLogo.png" to="https://poktscan.com/" />
      </Card>
    </div>
  )
}

export const getList = (latestBlock: GetLatestBlockQuery) => {
  const blockProducedDateInLocalTime = () => {
    const blockProducedTimeInDate = new Date(
      String(latestBlock.GetLatestBlock?.block.time),
    )
    const hours = appendZeroToTime(blockProducedTimeInDate.getHours().toLocaleString())
    const minutes = appendZeroToTime(
      blockProducedTimeInDate.getMinutes().toLocaleString(),
    )

    return `${hours}:${minutes} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
  }

  return [
    {
      label: "Block",
      value: `${latestBlock.GetLatestBlock.block.height}`,
    },
    {
      label: "Time",
      value: blockProducedDateInLocalTime(),
    },
    {
      label: "Relays",
      value: `${latestBlock.GetLatestBlock.block.total_relays_completed}`,
    },
    {
      label: "Txs",
      value: `${latestBlock.GetLatestBlock.block.total_txs}`,
    },
    {
      label: "Produced in",
      value: `${latestBlock.GetLatestBlock.block.took.toFixed(2)} min`,
    },
    {
      label: "Validator Threshold",
      value: `${uPoktToPokt(
        latestBlock.GetLatestBlock.validator_data?.validator_threshold,
      ).toLocaleString()}`,
    },
  ]
}
