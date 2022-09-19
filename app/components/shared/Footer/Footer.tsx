import { Grid } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import styles from "./styles.css"
import { useTranslate } from "~/context/TranslateContext"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

export const Footer = () => {
  const {
    t: { footer },
  } = useTranslate()

  return (
    <footer className="pokt-footer">
      <Grid align="center">
        <Grid.Col className="center">
          &copy; 2022 Pocket Network Inc.{" "}
          <Link to="/terms-and-conditions">{footer.termsOfUse}</Link> |{" "}
          <a href="https://www.pokt.network/privacy-policy">{footer.privacyPolicy}</a>
        </Grid.Col>
      </Grid>
    </footer>
  )
}

export default Footer
