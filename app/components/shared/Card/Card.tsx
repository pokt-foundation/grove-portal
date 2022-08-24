import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export const Card: React.FC = ({ children }) => {
  return <div className="pokt-card">{children}</div>
}

export default Card
