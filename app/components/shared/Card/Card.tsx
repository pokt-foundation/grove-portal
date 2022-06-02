import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const Card: React.FC = ({ children }) => {
  return <div className="pokt-card">{children}</div>
}

export default Card
