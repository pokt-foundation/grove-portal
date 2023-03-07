import clsx from "clsx"

import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type StatusTagProps = {
  accepted: boolean
}

function StatusTag({ accepted }: StatusTagProps) {
  return (
    <div
      className={clsx({
        "status-tag": true,
        "status-tag--accepted": accepted,
        "status-tag--pending": !accepted,
      })}
    >
      <span className="status-tag__label">{accepted ? "ACCEPTED" : "PENDING"}</span>
    </div>
  )
}

export default StatusTag
