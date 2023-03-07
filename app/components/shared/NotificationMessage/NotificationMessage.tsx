import { Button, Text } from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import { Dispatch, SetStateAction } from "react"
import CloseIcon from "../Icons/CloseIcon"
import ErrorIcon from "../Icons/ErrorIcon"
import InfoIcon from "../Icons/InfoIcon"
import SuccessIcon from "../Icons/SuccessIcon"
import WarningIcon from "../Icons/WarningIcon"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export interface NotificationMessageType {
  type: "success" | "info" | "warning" | "error" | "options"
  isActive: boolean
  title: string
  description: string
}

type NotificationMessageProps = {
  notificationMessage: NotificationMessageType
  setNotificationMessageIsActive: Dispatch<
    SetStateAction<NotificationMessageType["isActive"]>
  >
  handleAccept?: () => void
  handleDecline?: () => void
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
    default:
      return <InfoIcon />
  }
}

const NotificationMessage = ({
  notificationMessage: { type, title, description, isActive },
  setNotificationMessageIsActive,
  handleAccept,
  handleDecline,
}: NotificationMessageProps) => {
  return (
    <div
      className={clsx({
        "notification-message": true,
        active: isActive,
        [type]: true,
      })}
    >
      <span className="close" onClick={() => setNotificationMessageIsActive(false)}>
        <CloseIcon />
      </span>
      {type !== "options" ? (
        <div className="notification-message-content">
          <NotificationMessageIcon type={type} />
          <div className="notification-message-text">
            <div className="notification-message-title">{title}</div>
            <div className="notification-message-description">{description}</div>
          </div>
        </div>
      ) : (
        <div className="notification-message-content">
          <InfoIcon />
          <Text id="title">{title}</Text>
          <Button id="accept" variant="filled" onClick={handleAccept}>
            Accept
          </Button>
          <Button id="decline" variant="outline" onClick={handleDecline}>
            Decline
          </Button>
        </div>
      )}
    </div>
  )
}

export default NotificationMessage
