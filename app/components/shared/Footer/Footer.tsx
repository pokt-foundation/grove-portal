import { Group, IconTwitter } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import styles from "./styles.css"
import { useTranslate } from "~/context/TranslateContext"
import IconDiscord from "../Icons/IconDiscord"

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
      <Group position="apart">
        <div>
          &copy; 2022 Pocket Network Inc.{" "}
          <Link className="greenLink" to="/terms-and-conditions">
            {footer.termsOfUse}
          </Link>{" "}
          |{" "}
          <a
            className="greenLink"
            href="//www.pokt.network/privacy-policy"
            rel="noreferrer"
            target="_blank"
          >
            {footer.privacyPolicy}
          </a>
        </div>
        <Group>
          <a href="//www.pokt.network/" rel="noreferrer" target="_blank">
            About POKT
          </a>
          <Link to="/contact-sales">Contact</Link>
          <span aria-hidden className="vertical-split"></span>
          <a
            aria-label="Connect with the Pokt Team on Twitter"
            className="discord-icon"
            href="//twitter.com/POKTnetwork"
            rel="noreferrer"
            target="_blank"
          >
            <IconTwitter fill={"var(--color-white-main)"} />
          </a>
          <a
            aria-label="Connect with the Pokt Team on Discord"
            href="//discord.gg/pokt"
            rel="noreferrer"
            target="_blank"
          >
            <IconDiscord height={24} width={34} />
          </a>
        </Group>
      </Group>
    </footer>
  )
}

export default Footer
