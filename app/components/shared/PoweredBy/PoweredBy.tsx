import { Link } from "@remix-run/react"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

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
          <img src={image} alt={alt} />
        </a>
      ) : (
        <Link to={to} rel="noreferrer nofollow">
          <img src={image} alt={alt} />
        </Link>
      )}
    </div>
  )
}

export default PoweredBy
