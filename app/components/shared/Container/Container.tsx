import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const Container: React.FC = ({ children }) => {
  return <div className="container">{children}</div>
}

export default Container
