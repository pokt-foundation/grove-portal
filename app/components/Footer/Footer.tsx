import { Anchor, Group, IconTwitter, Text } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import dayjs from "dayjs"
import IconDiscord from "../Icons/IconDiscord"
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
      <nav aria-label="Footer" id="footer-nav">
        <Group position="apart">
          <div>
            <Text>
              &copy; {dayjs().format("YYYY")} Pocket Network Inc.{" "}
              <Anchor
                href="https://docs.grove.city/terms"
                rel="noopener noreferrer"
                target="_blank"
              >
                {footer.termsOfUse}
              </Anchor>{" "}
              |{" "}
              <Anchor
                href="https://docs.grove.city/privacy"
                rel="noopener noreferrer"
                target="_blank"
              >
                {footer.privacyPolicy}
              </Anchor>
            </Text>
          </div>
          <Group>
            <a href="https://grove.city" rel="noreferrer" target="_blank">
              About Grove
            </a>
            <span aria-hidden className="vertical-split"></span>
            <Anchor
              aria-label="Twitter"
              className="discord-icon"
              href="https://twitter.com/BuildwithGrove"
              rel="noreferrer"
              target="_blank"
            >
              <IconTwitter fill={"var(--mantine-color-white)"} />
            </Anchor>
            <Anchor
              aria-label="Discord"
              href="https://discord.gg/grove"
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
