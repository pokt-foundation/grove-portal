import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export const Container: React.FC = ({ children }) => {
  return <div className="container">{children}</div>
}

export default Container
