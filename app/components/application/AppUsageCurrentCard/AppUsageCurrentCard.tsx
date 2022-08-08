import {
  UserLBSessionRelaysResponse,
  UserLBTotalRelaysResponse,
} from "@pokt-foundation/portal-types"
import { CircleGraph } from "@pokt-foundation/ui"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { commify } from "~/utils/formattingUtils"
import Grid from "~/components/shared/Grid"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"
import { useTranslate } from "~/context/TranslateContext"

// const SESSIONS_PER_DAY = 24

export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}

interface UsageCurrentCardProps {
  maxDailyRelays: number
  totalRelays: UserLBTotalRelaysResponse["total_relays"]
  sessionRelays: UserLBSessionRelaysResponse["session_relays"]
}

export default function AppUsageCurrentCard({
  maxDailyRelays,
  totalRelays,
  sessionRelays,
}: UsageCurrentCardProps) {
  const { t } = useTranslate()

  const listItems: CardListItem[] = [
    {
      label: t.AppUsageCurrentCard.list.sessionRelays.label,
      value: commify(sessionRelays.toFixed(0)),
      help: t.AppUsageCurrentCard.list.sessionRelays.help,
      color: "secondary",
    },
    {
      label: t.AppUsageCurrentCard.list.dailyRelays.label,
      value: commify(totalRelays.toFixed(0)),
      help: t.AppUsageCurrentCard.list.dailyRelays.help,
      color: "secondary",
    },
    {
      label: t.AppUsageCurrentCard.list.maxRelays.label,
      value: commify(maxDailyRelays),
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
            {totalRelays > 0 && (
              <Grid.Col xs={3}>
                {maxDailyRelays && totalRelays && (
                  <CircleGraph
                    color="#c5ec4b"
                    size={70}
                    strokeWidth={10}
                    value={Math.min(1, totalRelays / maxDailyRelays)}
                  />
                )}
              </Grid.Col>
            )}
            <Grid.Col xs={totalRelays > 0 ? 9 : 12}>
              <CardList items={listItems} />
            </Grid.Col>
          </Grid>
        </div>
      </Card>
    </div>
  )
}
