import { IconInfo, Avatar, Button } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import React from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

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
              <Avatar color="red" radius="xl" size="sm">
                <IconInfo fill="#000" />
              </Avatar>
            </div>
            <div>
              <h4>{t.AppOverLimitCard.subtitle}</h4>
              {t.AppOverLimitCard.body.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <Button component="a" href="mailto:sales@pokt.network">
                {t.AppOverLimitCard.link}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
