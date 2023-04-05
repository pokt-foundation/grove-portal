import { Anchor, Group, IconTwitter, Text } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import IconDiscord from "../Icons/IconDiscord"
import styles from "./styles.css"
import { useTranslate } from "~/context/TranslateContext"
import dayjs from "dayjs"

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
              &copy; {dayjs().format("YYYY")} Pocket Network Inc.{" "}
              <Anchor component={Link} to="/terms-and-conditions">
                {footer.termsOfUse}
              </Anchor>{" "}
              |{" "}
              <Anchor
                href="https://www.pokt.network/privacy-policy"
                rel="noreferrer"
                target="_blank"
              >
                {footer.privacyPolicy}
              </Anchor>
            </Text>
          </div>
          <Group>
            <a href="https://www.pokt.network/" rel="noreferrer" target="_blank">
              About POKT
            </a>
            <Link to="/contact-sales">Contact</Link>
            <span aria-hidden className="vertical-split"></span>
            <Anchor
              aria-label="Twitter"
              className="discord-icon"
              href="https://twitter.com/POKTnetwork"
              rel="noreferrer"
              target="_blank"
            >
              <IconTwitter fill={"var(--mantine-color-white)"} />
            </Anchor>
            <Anchor
              aria-label="Discord"
              href="https://discord.gg/pokt"
              rel="noreferrer"
              target="_blank"
            >
              <IconDiscord height={24} width={34} />
            </Anchor>
          </Group>
        </Group>
      </nav>
    </footer>
  )
}

export default Footer
