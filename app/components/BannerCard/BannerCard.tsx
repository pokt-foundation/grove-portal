import {
  Button,
  Text,
  IconInfo,
  IconWarning,
  IconCircleCheck,
  IconErrorHex,
  IconX,
} from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import { useState } from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/Card"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface BannerCardProps {
  copy: {
    title: string
    body: (string | JSX.Element)[]
    body2?: (string | JSX.Element)[]
  }
  bannerType: "error" | "informational" | "success" | "warning"
}

export default function BannerCard({ copy, bannerType }: BannerCardProps) {
  const [visible, setVisible] = useState(true)

  const close = () => {
    setVisible(false)
  }

  return (
    <>
      {visible && (
        <div className={clsx(["pokt-banner", bannerType])}>
          <Card>
            <div className="pokt-card-header">
              <div className="pokt-group">
                {bannerType === "informational" && (
                  <IconInfo fill="var(--mantine-color-blue-4)" />
                )}
                {bannerType === "error" && (
                  <IconErrorHex fill="var(--mantine-color-red-6)" />
                )}
                {bannerType === "warning" && (
                  <IconWarning fill="var(--mantine-color-orange-6)" />
                )}
                {bannerType === "success" && (
                  <IconCircleCheck fill="var(--mantine-color-yellow-6)" />
                )}
                <h3>{copy.title}</h3>
              </div>
              <Button
                aria-label="Close this notification"
                variant="subtle"
                onClick={() => close()}
              >
                <IconX fill="var(--mantine-color-gray-0)" />
              </Button>
            </div>
            <div>
              {copy.body.map((str, index) => (
                <Text key={index} mb={8}>
                  {str}
                </Text>
              ))}
              {copy.body2 &&
                copy.body2.length > 0 &&
                copy.body2.map((str, index) => (
                  <Text key={index} mb={8}>
                    {str}
                  </Text>
                ))}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
