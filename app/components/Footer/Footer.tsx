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
          <a href="https://grove.city" rel="noreferrer" target="_blank">
            <img
              alt="About Grove"
              className="pokt-header-brand"
              loading="lazy"
              src="/grove/Logo_Joined_4.svg"
              // src="/grove/Portal_Color_DT.png"
            ></img>
          </a>
          <div>
            <Text>
              &copy; {dayjs().format("YYYY")} Grove Infrastructure Inc.{" "}
              <Anchor
                href="https://grove.city/terms"
                rel="noopener noreferrer"
                target="_blank"
              >
                {footer.termsOfUse}
              </Anchor>{" "}
              |{" "}
              <Anchor
                href="https://grove.city/privacy"
                rel="noopener noreferrer"
                target="_blank"
              >
                {footer.privacyPolicy}
              </Anchor>
            </Text>
          </div>
          <Group>
            {/* <span aria-hidden className="vertical-split"></span> */}
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
              href="https://discord.gg/build-with-grove"
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
