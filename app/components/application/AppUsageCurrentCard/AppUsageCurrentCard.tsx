import { Grid } from "@pokt-foundation/pocket-blocks"
import { UserLBTotalRelaysResponse } from "@pokt-foundation/portal-types"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/Card"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/CardList"
import { useTranslate } from "~/context/TranslateContext"
import { commify } from "~/utils/formattingUtils"

// const SESSIONS_PER_DAY = 24

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface UsageCurrentCardProps {
  averageRelays: number
  maxDailyRelays: number
  totalRelays: UserLBTotalRelaysResponse["total_relays"]
}

export default function AppUsageCurrentCard({
  averageRelays,
  maxDailyRelays,
  totalRelays,
}: UsageCurrentCardProps) {
  const { t } = useTranslate()

  const listItems: CardListItem[] = [
    {
      label: t.AppUsageCurrentCard.list.avgRelays.label,
      value: commify(averageRelays.toFixed(0)),
      help: t.AppUsageCurrentCard.list.avgRelays.help,
      color: "secondary",
    },
    {
      label: t.AppUsageCurrentCard.list.dailyRelays.label,
      value: commify(totalRelays.toFixed(0)),
      help: t.AppUsageCurrentCard.list.dailyRelays.help,
    },
    {
      label: t.AppUsageCurrentCard.list.maxRelays.label,
      value: commify(maxDailyRelays) !== "0" ? commify(maxDailyRelays) : "Unlimited",
      help: t.AppUsageCurrentCard.list.maxRelays.help,
    },
  ]

  return (
    <div className="pokt-app-usage-over-time">
      <Card>
        <div className="pokt-card-header">
          <h3>{t.AppUsageCurrentCard.label}</h3>
        </div>
        <div>
          <Grid align="center">
            <Grid.Col xs={totalRelays > 0 ? 9 : 12}>
              <CardList items={listItems} />
            </Grid.Col>
          </Grid>
        </div>
      </Card>
    </div>
  )
}
