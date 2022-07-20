import Container from "~/components/shared/Container"
import Section, { links as SectionLinks } from "~/components/shared/Section"
import Title, { links as TitleLinks } from "~/components/shared/Title"
import Text, { links as TextLinks } from "~/components/shared/Text"
import Button from "~/components/shared/Button"
import { Link } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"
import Group from "~/components/shared/Group"
import Grid from "~/components/shared/Grid"
import { Stack } from "@mantine/core"

export const links = () => {
  return [
    ...SectionLinks(),
    ...TitleLinks(),
    ...TextLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function LandingSocial() {
  const { t } = useTranslate()

  const socialList = [
    {
      brand: "Twitter",
      handle: "#pokt",
      link: "#",
    },
    {
      brand: "Twitter",
      handle: "#pokt",
      link: "#",
    },
  ]

  return (
    <div>
      <Text>
        Learn more about Pocket, chat with the team, others in the community, and have
        your say in shaping the future of blockchain.
      </Text>
      <Stack>
        {socialList.map((social) => (
          <div key={social.brand}>
            <a href={social.link}>
              {social.brand}: {social.handle}
            </a>
          </div>
        ))}
      </Stack>
    </div>
  )
}
