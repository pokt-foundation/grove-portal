import { Group, IconTwitter, Text } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import IconDiscord from "../Icons/IconDiscord"
import styles from "./styles.css"
import { useTranslate } from "~/context/TranslateContext"
import { CustomEvents, trackEvent } from "~/utils/analytics"

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
      <nav aria-label="Footer" id="footer-nav">
        <Group position="apart">
          <div>
            <Text>
              &copy; 2022 Pocket Network Inc.{" "}
              <Link
                className="greenLink"
                to="/terms-and-conditions"
                onClick={() => trackEvent(CustomEvents.TermsOfUse)}
              >
                {footer.termsOfUse}
              </Link>{" "}
              |{" "}
              <a
                className="greenLink"
                href="https://www.pokt.network/privacy-policy"
                rel="noreferrer"
                target="_blank"
                onClick={() => trackEvent(CustomEvents.PrivacyPolicy)}
              >
                {footer.privacyPolicy}
              </a>
            </Text>
          </div>
          <Group>
            <a
              href="https://www.pokt.network/"
              rel="noreferrer"
              target="_blank"
              onClick={() => trackEvent(CustomEvents.AboutPokt)}
            >
              About POKT
            </a>
            <Link to="/contact-sales" onClick={() => trackEvent(CustomEvents.Contact)}>
              Contact
            </Link>
            <span aria-hidden className="vertical-split"></span>
            <a
              aria-label="Twitter"
              className="discord-icon"
              href="https://twitter.com/POKTnetwork"
              rel="noreferrer"
              target="_blank"
              onClick={() => trackEvent(CustomEvents.SocialTwitter)}
            >
              <IconTwitter fill={"var(--color-white-main)"} />
            </a>
            <a
              aria-label="Discord"
              href="https://discord.gg/pokt"
              rel="noreferrer"
              target="_blank"
              onClick={() => trackEvent(CustomEvents.SocialDiscord)}
            >
              <IconDiscord height={24} width={34} />
            </a>
          </Group>
        </Group>
      </nav>
    </footer>
  )
}

export default Footer
