import { useMemo } from "react"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { LatestBlockAndPerformanceData } from "~/models/portal.server"
import styles from "./styles.css"
import { Grid, List } from "@mantine/core"
import PoweredBy, { links as PoweredByLinks } from "~/components/shared/PoweredBy"

export const links = () => {
  return [...CardLinks(), ...PoweredByLinks(), { rel: "stylesheet", href: styles }]
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

  const rows = [
    {
      description: "Block",
      data: latestBlock.highestBlock.item.height,
    },
    {
      description: "Time",
      data: blockProducedDateInLocalTime,
    },
    {
      description: "Relays",
      data: latestBlock.highestBlock.item.total_relays_completed.toLocaleString(),
    },
    {
      description: "Txs",
      data: latestBlock.highestBlock.item.total_txs.toLocaleString(),
    },
    {
      description: "Produced in",
      data: `${latestBlock.highestBlock.item.took.toFixed(2)} min`,
    },
    {
      description: "Validator Threshold",
      data: latestBlock.highestBlock.validatorThreshold.toLocaleString(),
    },
  ]

  return (
    <div className="pokt-network-latest-block">
      <Card>
        <h3>Latest Block</h3>
        <List>
          {rows.map((row) => (
            <List.Item key={row.description}>
              <Grid>
                <Grid.Col xs={6}>
                  <p className="pokt-network-latest-block-row-description">
                    {row.description}
                  </p>
                </Grid.Col>
                <Grid.Col xs={6}>
                  <p className="pokt-network-latest-block-row-data">{row.data}</p>
                </Grid.Col>
              </Grid>
            </List.Item>
          ))}
        </List>
        <PoweredBy to="https://poktscan.com/" image="/poktscanLogo.png" alt="Poktscan" />
      </Card>
    </div>
  )
}
