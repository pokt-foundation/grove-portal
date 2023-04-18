import {
  Button,
  IconCaretDown,
  IconCaretUp,
  Collapse,
  Divider,
  Text,
} from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import { useState } from "react"
import styles from "./styles.css"
import { Card, links as CardLinks } from "~/components/Card"
import TextInput, { links as TextInputLinks } from "~/components/TextInput"
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

export default function AddressCard({ apps }: AppAddressCardProps) {
  const {
    t: { appAddressCard },
  } = useTranslate()
  const [showAllApps, setShowAllApps] = useState(false)
  const [hiddenIds, setHiddenIds] = useState<string[]>(() => {
    // all ids are hidden by default
    return apps?.length ? apps?.map(({ appId }) => appId) : []
  })
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
        <div className="pokt-card-header">
          <h3>{appAddressCard.heading}</h3>
          {apps && apps.length > 0 && <Text m="0">{apps.length}</Text>}
        </div>
        {visibleApps && visibleApps.length > 0 ? (
          visibleApps.map(({ appId }) =>
            appId ? (
              <TextInput
                key={appId}
                copy
                readOnly
                revealed={hiddenIds.includes(appId)}
                setRevealed={() =>
                  setHiddenIds(
                    hiddenIds.includes(appId)
                      ? hiddenIds.filter((app) => app !== appId)
                      : [...hiddenIds, appId],
                  )
                }
                // Check either if the appId is or isn't included in the hiddenIds array,
                // if it is, remove it
                // if it's not, add it
                type={hiddenIds.includes(appId) ? "password" : "text"}
                value={appId}
              />
            ) : null,
          )
        ) : (
          <p>{appAddressCard.error}</p>
        )}
        {hiddenApps && hiddenApps.length > 0 && (
          <>
            <Collapse in={showAllApps}>
              {hiddenApps.map(({ appId }) =>
                appId ? (
                  <TextInput
                    key={appId}
                    copy
                    readOnly
                    revealed={hiddenIds.includes(appId)}
                    setRevealed={() =>
                      setHiddenIds(
                        hiddenIds.includes(appId)
                          ? hiddenIds.filter((app) => app !== appId)
                          : [...hiddenIds, appId],
                      )
                    }
                    // Check either if the appId is or isn't included in the hiddenIds array,
                    // if it is, remove it
                    // if it's not, add it
                    type={hiddenIds.includes(appId) ? "password" : "text"}
                    value={appId}
                  />
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
                    <IconCaretUp className="pokt-icon" />
                  ) : (
                    <IconCaretDown className="pokt-icon" />
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
