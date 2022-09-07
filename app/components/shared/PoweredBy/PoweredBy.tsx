import { Link } from "@remix-run/react"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type PoweredByProps = {
  to: string
  image: string
  alt: string
}

export const PoweredBy = ({ to, image, alt }: PoweredByProps) => {
  return (
    <div className="pokt-powered-by">
      <p>POWERED BY</p>
      {/https?:\/\//.test(to) ? (
        <a href={to} rel="noreferrer nofollow">
          <img alt={alt} src={image} />
        </a>
      ) : (
        <Link to={to}>
          <img alt={alt} src={image} />
        </Link>
      )}
    </div>
  )
}

export default PoweredBy
