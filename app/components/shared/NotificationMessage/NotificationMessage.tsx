import clsx from "clsx"
import { Dispatch, SetStateAction } from "react"
import ErrorIcon from "../Icons/ErrorIcon"
import CloseIcon from "../Icons/CloseIcon"
import SuccessIcon from "../Icons/SuccessIcon"
import styles from "./styles.css"
import InfoIcon from "../Icons/InfoIcon"
import WarningIcon from "../Icons/WarningIcon"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export interface NotificationMessageType {
  type: "success" | "info" | "warning" | "error"
  userEmail: string
  isActive: boolean
  title: string
  description: string
}

export interface NotificationMessageProps {
  notificationMessage: NotificationMessageType
  setNotificationMessage: Dispatch<SetStateAction<NotificationMessageType>>
}

const NotificationMessageIcon = ({ type }: { type: NotificationMessageType["type"] }) => {
  switch (type) {
    case "success":
      return <SuccessIcon />
    case "info":
      return <InfoIcon />
    case "warning":
      return <WarningIcon />
    case "error":
      return <ErrorIcon />
  }
}

const NotificationMessage = ({
  notificationMessage: { isActive, type, userEmail, title, description },
  setNotificationMessage,
}: NotificationMessageProps) => {
  return (
    <div
      className={clsx({
        "notification-message": true,
        active: isActive,
      })}
    >
      <span
        className="close"
        onClick={() =>
          setNotificationMessage({
            type: "success",
            userEmail: "",
            isActive: false,
            title: "",
            description: "",
          })
        }
      >
        <CloseIcon />
      </span>
      <NotificationMessageIcon type={type} />
      <div className="notification-message-text">
        <div className="notification-message-title">{title}</div>
        <div className="notification-message-description">{description}</div>
      </div>
    </div>
  )
}

export default NotificationMessage
