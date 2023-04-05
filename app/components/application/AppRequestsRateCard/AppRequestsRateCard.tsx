import { Grid, IconArrowDown, IconArrowUp } from "@pokt-foundation/pocket-blocks"
import { useMemo } from "react"
import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/shared/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import { useTranslate } from "~/context/TranslateContext"
import { RelayMetric } from "~/models/relaymeter/relaymeter.server"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface RequestsRateCardProps {
  previousRelays: RelayMetric["Count"]
  currentRelays: RelayMetric["Count"]
}

export default function AppRequestsRateCard({
  previousRelays,
  currentRelays,
}: RequestsRateCardProps) {
  const { t } = useTranslate()

  const successRate = useMemo(() => {
    return currentRelays.Total === 0 ? 0 : currentRelays.Success / currentRelays.Total
  }, [currentRelays])
  const previousSuccessRate = useMemo(() => {
    return previousRelays.Total === 0 ? 0 : previousRelays.Success / previousRelays.Total
  }, [previousRelays])

  const successRateDelta = useMemo(() => {
    const actualPreviousSuccessRate = previousSuccessRate > 1.0 ? 1 : previousSuccessRate

    if (successRate >= 0.9999) {
      return Number((0).toFixed(2))
    }

    return (((successRate - actualPreviousSuccessRate) / 1) * 100).toFixed(2)
  }, [previousSuccessRate, successRate])

  const errorRateDelta = useMemo(() => {
    if (successRate >= 0.9999 || (currentRelays.Total === 0 && successRate === 0)) {
      return Number((0).toFixed(2))
    }
    return Number((100 - successRate * 100).toFixed(2))
  }, [successRate, currentRelays])

  const successPercent = useMemo(() => Math.min(successRate * 100, 100), [successRate])

  const getItemColor = (successRateDelta: string | number) => {
    if (Math.abs(successRateDelta as number) === 0) return undefined
    if (successRateDelta > 0) return "success"
    return "error"
  }

  const getItemIcon = (successRateDelta: string | number) => {
    if (Math.abs(successRateDelta as number) === 0) return undefined
    if (successRateDelta > 0) return ArrowSuccess
    return ArrowError
  }

  const listItems: CardListItem[] = [
    {
      label: t.AppRequestsRateCard.list.successDelta.label,
      value: `${Math.abs(successRateDelta as number)}%`,
      help: t.AppRequestsRateCard.list.successDelta.help,
      color: getItemColor(successRateDelta),
      icon: getItemIcon(successRateDelta),
    },
    {
      label: t.AppRequestsRateCard.list.errorRate.label,
      value: `${Math.abs(errorRateDelta as number)}%`,
      help: t.AppRequestsRateCard.list.errorRate.help,
      color: errorRateDelta > 0 ? "error" : undefined,
    },
    {
      label: t.AppRequestsRateCard.list.totalRequests.label,
      value: Intl.NumberFormat().format(currentRelays.Total),
    },
  ]

  return (
    <div className="pokt-app-requests-rate">
      <Card>
        <div className="pokt-card-header">
          <h3>{t.AppRequestsRateCard.label}</h3>
        </div>
        <div>
          <Grid align="center">
            <Grid.Col xs={successPercent > 0 ? 9 : 12}>
              <CardList items={listItems} />
            </Grid.Col>
          </Grid>
        </div>
      </Card>
    </div>
  )
}

const ArrowSuccess = () => (
  <IconArrowUp fill="var(--mantine-color-yellow-6)" height={16} width={16} />
)
const ArrowError = () => (
  <IconArrowDown fill="var(--mantine-color-red-6)" height={16} width={16} />
)
