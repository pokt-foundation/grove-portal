import {
  Button,
  Text,
  IconInfo,
  IconWarning,
  IconCheck,
  IconErrorHex,
  Collapse,
} from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import { useState } from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface BannerCardProps {
  copy: { title: string; body: string; body2?: string }
  bannerType: "error" | "informational" | "success" | "warning"
}

export default function BannerCard({ copy, bannerType }: BannerCardProps) {
  const { t } = useTranslate()
  const [visible, setVisible] = useState(true)

  const close = () => {
    setVisible(!visible)
  }

  return (
    <>
      {visible && (
        <div className={clsx(["pokt-banner", bannerType])}>
          <Card>
            <div className="pokt-card-header">
              <div className="pokt-group">
                {bannerType === "informational" && (
                  <IconInfo fill="var(--color-secondary-light)" />
                )}
                {bannerType === "error" && <IconErrorHex fill="var(--color-error)" />}
                {false && bannerType === "warning" && (
                  <IconWarning fill="var(--color-error)" />
                )}
                {bannerType === "success" && <IconCheck fill="var(--color-success)" />}
                <h3>{copy.title}</h3>
              </div>
              <Button variant="subtle" onClick={() => close()}>
                {t.common.close}
              </Button>
            </div>
            <div>
              <Text mb={8}>{copy.body}</Text>
              {copy.body2 && <Text mb={8}>{copy.body}</Text>}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
