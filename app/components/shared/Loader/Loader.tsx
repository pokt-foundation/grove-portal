import styles from "./styles.css"
import AnimatedLogo, {
  links as AnimatedLogoLinks,
} from "~/components/shared/AnimatedLogo"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }, ...AnimatedLogoLinks()]
}
/* c8 ignore stop */

type LoaderProps = {
  label?: string
}

export const Loader: React.FC<LoaderProps> = ({ label = "Loading..." }) => {
  return (
    <div className="pokt-loader-wrapper">
      <div className="pokt-loader">
        <AnimatedLogo />
        <p>{label}</p>
      </div>
      <div className="pokt-loader-bg"></div>
    </div>
  )
}

export default Loader
