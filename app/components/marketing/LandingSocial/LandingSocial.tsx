import Text, { links as TextLinks } from "~/components/shared/Text"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"
import Group from "~/components/shared/Group"
import { IconCog } from "@pokt-foundation/ui"

export const links = () => {
  return [...TextLinks(), { rel: "stylesheet", href: styles }]
}

export default function LandingSocial() {
  const { t } = useTranslate()

  const socialList = [
    {
      brand: "Twitter",
      icon: <IconCog />,
      handle: "@pocket",
      link: "#",
    },
    {
      brand: "Telegram",
      icon: <IconCog />,
      handle: "@pocket",
      link: "#",
    },
    {
      brand: "Linkedin",
      icon: <IconCog />,
      handle: "@pocket",
      link: "#",
    },
    {
      brand: "Github",
      icon: <IconCog />,
      handle: "@pocket",
      link: "#",
    },
    {
      brand: "Chat",
      icon: <IconCog />,
      handle: "@pocket",
      link: "#",
    },
    {
      brand: "Discord",
      icon: <IconCog />,
      handle: "@pocket",
      link: "#",
    },
  ]

  return (
    <div className="pokt-landing-social">
      <Text>
        Learn more about Pocket, chat with the team, others in the community, and have
        your say in shaping the future of blockchain.
      </Text>
      <ul className="social-list">
        {socialList.map((social) => (
          <li key={social.brand}>
            <a href={social.link} className="social-link">
              <Group position="apart">
                <Group spacing="xs">
                  <div className="social-icon">{social.icon}</div>
                  <div className="social-brand">{social.brand}</div>
                </Group>
                <div className="social-handle">{social.handle}</div>
              </Group>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
