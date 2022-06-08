import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { CircleGraph } from "@pokt-foundation/ui"
import { UserLBSessionRelaysResponse } from "@pokt-foundation/portal-types"
import { commify } from "~/utils/formattingUtils"
import Grid from "~/components/shared/Grid"
import CardList, {
  CardListItem,
  links as CardListLinks,
} from "~/components/shared/CardList"

const SESSIONS_PER_DAY = 24

export const links = () => {
  return [...CardLinks(), ...CardListLinks(), { rel: "stylesheet", href: styles }]
}

interface UsageCurrentCardProps {
  maxDailyRelays: number
  sessionRelays: UserLBSessionRelaysResponse["session_relays"]
}

export default function AppUsageCurrentCard({
  maxDailyRelays,
  sessionRelays,
}: UsageCurrentCardProps) {
  const maxSessionRelays = maxDailyRelays / SESSIONS_PER_DAY

  const listItems: CardListItem[] = [
    {
      label: "Total Relays",
      value: commify(sessionRelays.toFixed(0)),
      help: "Total number of request sent during the current network session, each session has 4 blocks, 15 min each, 1 hour total.",
      color: "secondary",
    },
    {
      label: "Max Relays",
      value: commify(maxSessionRelays * 24),
    },
  ]

  return (
    <div className="pokt-app-usage-over-time">
      <Card>
        <div className="pokt-card-header">
          <h3>Current Session</h3>
        </div>
        <div>
          <Grid align="center">
            <Grid.Col xs={3}>
              {maxSessionRelays && sessionRelays && (
                <CircleGraph
                  value={
                    maxSessionRelays === 0
                      ? 0
                      : Math.min(1, sessionRelays / maxSessionRelays)
                  }
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
