import { Button, Collapse, Text, IconInfo } from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import { useMemo } from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/Card"
import { useTranslate } from "~/context/TranslateContext"
import { useUser } from "~/context/UserContext"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export default function LegacyBannerCard() {
  const { t } = useTranslate()
  const user = useUser()

  const show = useMemo(() => {
    return user.data.preferences.showExpandedLegacyBanner
  }, [user.data])

  const handleExpand = () => {
    user.submit(
      {
        showExpandedLegacyBanner: String(!show),
      },
      {
        method: "post",
        action: "/api/user",
      },
    )
  }

  return (
    <div className={clsx(["pokt-legacy-banner", { show: show }])}>
      <Card>
        <div className="pokt-card-header">
          <div className="pokt-group">
            <IconInfo fill="var(--mantine-color-blue-4)" />
            <h3>{t.LegacyBannerCard.title}</h3>
          </div>
          <Button variant="subtle" onClick={() => handleExpand()}>
            {show ? t.LegacyBannerCard.showButtonText : t.LegacyBannerCard.hideButtonText}
          </Button>
        </div>
        <Collapse in={show}>
          <div>
            {t.LegacyBannerCard.body.map((str, index) => (
              <Text key={index} mb={8}>
                {str}
              </Text>
            ))}
          </div>
        </Collapse>
      </Card>
    </div>
  )
}
