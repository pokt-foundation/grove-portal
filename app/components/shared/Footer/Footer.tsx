import styles from "./styles.css"
import { Grid } from "~/components/shared/Grid"
import { useTranslate } from "~/context/TranslateContext"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const Footer = () => {
  const {
    t: { footer },
  } = useTranslate()

  return (
    <footer className="pokt-footer">
      <Grid align="center">
        <Grid.Col className="center" span={4} offset={4}>
          &copy; 2022 Pocket Network Inc
        </Grid.Col>
        <Grid.Col className="right" span={4}>
          <a href="https://www.pokt.network/site-terms-of-use">{footer.termsOfUse}</a> |{" "}
          <a href="https://www.pokt.network/privacy-policy">{footer.privacyPolicy}</a>
        </Grid.Col>
      </Grid>
    </footer>
  )
}

export default Footer
