import {
  Button,
  CaretDown,
  CaretUp,
  Collapse,
  Divider,
} from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import { useState } from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/shared/Card"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useTranslate } from "~/context/TranslateContext"
import { ProcessedEndpoint } from "~/models/portal/sdk"

/* c8 ignore start */
export const links = () => {
  return [...CardLinks(), ...TextInputLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

interface AppAddressCardProps {
  apps: ProcessedEndpoint["apps"]
}

export default function AppAddressCard({ apps }: AppAddressCardProps) {
  const {
    t: { appAddressCard },
  } = useTranslate()
  const [showAllApps, setShowAllApps] = useState(false)
  const visibleApps = apps ? apps.slice(0, 3) : apps
  const hiddenApps = apps ? apps.slice(3) : undefined

  return (
    <div
      className={clsx([
        "pokt-app-addresses",
        { "no-hidden-apps": !hiddenApps || hiddenApps?.length === 0 },
      ])}
    >
      <Card>
        <div className="flexContainer">
          <h3>{appAddressCard.heading}</h3>
          {apps && apps.length > 0 && <p>{apps.length}</p>}
        </div>
        {visibleApps && visibleApps.length > 0 ? (
          visibleApps.map((item) =>
            item ? <TextInput key={item.appId} copy readOnly value={item.appId} /> : null,
          )
        ) : (
          <p>{appAddressCard.error}</p>
        )}
        {hiddenApps && hiddenApps.length > 0 && (
          <>
            <Collapse in={showAllApps}>
              {hiddenApps.map((item) =>
                item ? (
                  <TextInput key={item.appId} copy readOnly value={item.appId} />
                ) : null,
              )}
            </Collapse>
            <Divider
              label={
                <Button
                  aria-label={
                    showAllApps ? "Collapse Applications" : "Expand Applications"
                  }
                  className="pokt-button"
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAllApps((c) => !c)}
                >
                  {showAllApps ? (
                    <CaretUp className="pokt-icon" />
                  ) : (
                    <CaretDown className="pokt-icon" />
                  )}
                </Button>
              }
              labelPosition="center"
            />
          </>
        )}
      </Card>
    </div>
  )
}
