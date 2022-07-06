import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { Avatar } from "@mantine/core"
import { IconInfo } from "@pokt-foundation/ui"
import { useTranslate } from "~/context/TranslateContext"
import { Link } from "@remix-run/react"
import Button from "~/components/shared/Button"
import React from "react"

/* c8 ignore next */
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

  return (
    <>
      {(exceedsMaxRelays || exceedsSessionRelays) && (
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
      )}
    </>
  )
}
