import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/Card"
import CardList, { CardListItem, links as CardListLinks } from "~/components/CardList"
import PoweredBy, { links as PoweredByLinks } from "~/components/PoweredBy"
import { GetHighestBlockQuery } from "~/models/poktscan/sdk"

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
  latestBlock: GetHighestBlockQuery
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

export const getList = (latestBlock: GetHighestBlockQuery) => {
  const blockProducedDateInLocalTime = () => {
    const blockProducedTimeInDate = new Date(String(latestBlock.highestBlock?.item?.time))
    const hours = appendZeroToTime(blockProducedTimeInDate.getHours().toLocaleString())
    const minutes = appendZeroToTime(
      blockProducedTimeInDate.getMinutes().toLocaleString(),
    )

    return `${hours}:${minutes} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
  }

  return [
    {
      label: "Block",
      value: `${latestBlock.highestBlock?.item?.height}`,
    },
    {
      label: "Time",
      value: blockProducedDateInLocalTime(),
    },
    {
      label: "Relays",
      value: `${latestBlock.highestBlock?.item?.total_relays_completed}`,
    },
    {
      label: "Txs",
      value: `${latestBlock.highestBlock?.item?.total_txs}`,
    },
    {
      label: "Produced in",
      value: `${latestBlock.highestBlock?.item?.took.toFixed(2)} min`,
    },
    {
      label: "Validator Threshold",
      value: `${latestBlock.highestBlock?.validatorThreshold?.toLocaleString()}`,
    },
  ]
}
