import { Text } from "@pokt-foundation/pocket-blocks"
import { useEffect, useState } from "react"
import NotificationMessage, {
  links as NotificationMessageLinks,
} from "../NotificationMessage"

const MAINTENANCE_MODE_KEY = "MAINTENANCE_MODE"

export const links = () => {
  return [...NotificationMessageLinks()]
}

interface MaintenanceNotificationProps {
  maintenanceMode: boolean
  css?: React.CSSProperties
}

function MaintenanceNotification({ maintenanceMode, css }: MaintenanceNotificationProps) {
  const [isMaintenanceNotificationActive, setIsMaintenanceNotificationActive] =
    useState(true)

  const handleMaintenanceNotificationClose = () => {
    localStorage.setItem(MAINTENANCE_MODE_KEY, "true")
    setIsMaintenanceNotificationActive(false)
  }

  useEffect(() => {
    const hasSeenMaintenanceNotification = localStorage.getItem(MAINTENANCE_MODE_KEY)
    if (hasSeenMaintenanceNotification) {
      setIsMaintenanceNotificationActive(false)
    }
  }, [])

  if (!maintenanceMode) return null

  return (
    <NotificationMessage
      withCloseButton
      closeButtonLabel="maintenance notification close button"
      css={css}
      isActive={isMaintenanceNotificationActive}
      title="Scheduled Maintenance Notice"
      type="info"
      onClose={handleMaintenanceNotificationClose}
    >
      <Text color="white" size="sm">
        Our platform will be undergoing scheduled maintenance on 4/24/2023 at 12PM EST.
        During this time, the Portal UI will be temporarily unavailable, and users will
        not be able to create or edit applications, adjust security settings or pay plans.
        However, all relay requests will continue to be processed as usual.
      </Text>
    </NotificationMessage>
  )
}

export default MaintenanceNotification
