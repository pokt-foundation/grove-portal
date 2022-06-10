import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { CircleGraph } from "@pokt-foundation/ui"
import { useMemo } from "react"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import { IconUp, IconDown } from "@pokt-foundation/ui"
import Grid from "~/components/shared/Grid"
import { Link } from "@remix-run/react"

export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}

interface RequestsRateCardProps {
  previousRelays: number
  previousSuccessfulRelays: number
  successfulRelays: number
  totalRelays: number
}

export default function AppRequestsRateCard({
  previousRelays,
  previousSuccessfulRelays,
  successfulRelays,
  totalRelays,
}: RequestsRateCardProps) {
  const successRate = useMemo(() => {
    return totalRelays === 0 ? 0 : successfulRelays / totalRelays
  }, [successfulRelays, totalRelays])
  const previousSuccessRate = useMemo(() => {
    return previousSuccessfulRelays === 0 ? 0 : previousSuccessfulRelays / previousRelays
  }, [previousSuccessfulRelays, previousRelays])

  const successRateDelta = useMemo(() => {
    const actualPreviousSuccessRate = previousSuccessRate > 1.0 ? 1 : previousSuccessRate

    if (successRate >= 0.9999) {
      return Number((0).toFixed(2))
    }

    return (((successRate - actualPreviousSuccessRate) / 1) * 100).toFixed(2)
  }, [previousSuccessRate, successRate])

  const errorRateDelta = useMemo(() => {
    if (successRate >= 0.9999 || (totalRelays === 0 && successRate === 0)) {
      return Number((0).toFixed(2))
    }
    return Number((100 - successRate * 100).toFixed(2))
  }, [successRate, totalRelays])

  const successPercent = useMemo(() => Math.min(successRate * 100, 100), [successRate])

  const listItems: CardListItem[] = [
    {
      label: "Success Delta",
      value: `${Math.abs(successRateDelta as number)}%`,
      help: "Percentage of success among the total request attempted to perform by the application on the last 24h.",
      color: successRateDelta > 0 ? "success" : "error",
      icon: successRateDelta > 0 ? IconUp : IconDown,
    },
    {
      label: "Error Rate",
      value: `${Math.abs(errorRateDelta as number)}%`,
      help: "Percentage of error among the total request attempted to perform by the application.",
      color: errorRateDelta > 0 ? "error" : undefined,
    },
    {
      label: "Total Requests",
      value: Intl.NumberFormat().format(totalRelays),
    },
  ]

  return (
    <div className="pokt-app-requests-rate">
      <Card>
        <div className="pokt-card-header">
          <h3>Requests Rate</h3>
          <div>
            <Link to="requests">View Request Details</Link>
          </div>
        </div>
        <div>
          <Grid align="center">
            <Grid.Col xs={3}>
              {successPercent && (
                <CircleGraph
                  value={successRate}
                  size={70}
                  color="#c5ec4b"
                  strokeWidth={10}
                />
              )}
            </Grid.Col>
            <Grid.Col xs={9}>
              <CardList items={listItems} />
            </Grid.Col>
          </Grid>
        </div>
      </Card>
    </div>
  )
}
