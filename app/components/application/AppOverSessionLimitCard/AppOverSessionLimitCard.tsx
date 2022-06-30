import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { Avatar } from "@mantine/core"
import { IconInfo } from "@pokt-foundation/ui"
import { useTranslate } from "~/context/TranslateContext"
import { Link } from "@remix-run/react"
import Button from "~/components/shared/Button"

export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}

interface OverLimitCardProps {
  exceedsSessionRelays?: boolean
  exceedsMaxRelays?: boolean
}

export default function AppOverLimitCard({
  exceedsMaxRelays = false,
  exceedsSessionRelays = false,
}: OverLimitCardProps) {
  const { t } = useTranslate()

  if (!exceedsMaxRelays && !exceedsSessionRelays) return <></>

  return (
    <div className="pokt-app-over-limit">
      <Card>
        <div className="pokt-card-header">
          <h3>{t.AppOverLimitCard.title}</h3>
          <Avatar color="red" size="sm" radius="xl">
            <IconInfo />
          </Avatar>
        </div>
        <div>
          <h4>{t.AppOverLimitCard.subtitle}</h4>
          {t.AppOverLimitCard.body.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <Button component={Link} to="mailto:sales@pokt.network">
            {t.AppOverLimitCard.link}
          </Button>
        </div>
      </Card>
    </div>
  )
}
