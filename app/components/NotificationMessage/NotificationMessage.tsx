import { Alert, AlertProps } from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import React, { useMemo } from "react"
import ErrorIcon from "../Icons/ErrorIcon"
import InfoIcon from "../Icons/InfoIcon"
import SuccessIcon from "../Icons/SuccessIcon"
import WarningIcon from "../Icons/WarningIcon"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore end */

export interface NotificationType {
  type: NotificationMessageType
  title: string
  description: string
  isActive: boolean
}

type NotificationMessageProps = AlertProps & {
  type: NotificationMessageType
  isActive: boolean
  children: React.ReactNode | typeof React.Children
  css?: React.CSSProperties
}

export type NotificationMessageType = "success" | "info" | "warning" | "error" | "options"
export const notificationMessageTypes = ["success", "info", "warning", "error", "options"]

const NotificationMessageIcon = ({ type }: { type: NotificationMessageType }) => {
  switch (type) {
    case "success":
      return <SuccessIcon />
    case "info":
      return <InfoIcon />
    case "warning":
      return <WarningIcon />
    case "error":
      return <ErrorIcon />
    default:
      return <InfoIcon />
  }
}

const NotificationMessage = ({
  type,
  isActive,
  children,
  css,
  ...props
}: NotificationMessageProps) => {
  const color = useMemo(() => {
    switch (type) {
      case "success":
        return "green"
      case "warning":
        return "orange"
      case "error":
        return "red"
      case "info":
      default:
        return "blue"
    }
  }, [type])

  return (
    <div
      className={clsx({
        "notification-message": true,
        active: isActive,
        [type]: true,
      })}
      style={css}
    >
      <Alert
        className="pokt-alert"
        color={color}
        icon={<NotificationMessageIcon type={type} />}
        sx={{
          width: "100%",
          borderRadius: "8px",
        }}
        variant="outline"
        {...props}
      >
        {children}
      </Alert>
    </div>
  )
}

export default NotificationMessage
