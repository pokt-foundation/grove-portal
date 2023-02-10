import clsx from "clsx"

import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type StatusTagProps = {
  status: "ACCEPTED" | "PENDING" | "EXPIRED"
}

function StatusTag({ status }: StatusTagProps) {
  return (
    <div
      className={clsx({
        "status-tag": true,
        "status-tag--accepted": status === "ACCEPTED",
        "status-tag--pending": status === "PENDING",
        "status-tag--expired": status === "EXPIRED",
      })}
    >
      <span className="status-tag__label">{status}</span>
    </div>
  )
}

export default StatusTag
