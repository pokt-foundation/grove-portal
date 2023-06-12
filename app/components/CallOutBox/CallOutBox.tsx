import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type CallOutBoxProps = {
  title: string
  smallText: string
  blueText: string
  description: string
}

export const CallOutBox = ({
  title,
  smallText,
  blueText,
  description,
}: CallOutBoxProps) => {
  return (
    <div className="callOutBox">
      <div>
        <h3>{title}</h3>
        <p className="smallText">{smallText}</p>
      </div>
      <div className="callOutGraphic">
        <p className="bigBlueText">{blueText}</p>{" "}
        <p className="callOutGraphicDescription">{description}</p>
      </div>
    </div>
  )
}

export default CallOutBox
