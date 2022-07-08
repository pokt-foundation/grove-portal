import Container from "~/components/shared/Container"
import Section, { links as SectionLinks } from "~/components/shared/Section"
import Title, { links as TitleLinks } from "~/components/shared/Title"
import Text, { links as TextLinks } from "~/components/shared/Text"
import Button from "~/components/shared/Button"
import { Link } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"
import Group from "~/components/shared/Group"

export const links = () => {
  return [
    ...SectionLinks(),
    ...TitleLinks(),
    ...TextLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function LandingBlockchains() {
  const { t } = useTranslate()

  const chains = [
    ...t.landing.chains.slice(-3),
    ...t.landing.chains,
    ...t.landing.chains.slice(0, 3),
  ]

  return (
    <Section px={128}>
      <Container size="xl">
        <div className="pokt-landing-header">
          <Group position="apart">
            <Title order={3}>
              Supported{" "}
              <Text component="span" weight={900}>
                Blockchains
              </Text>
            </Title>
            <Button component={Link} to="#">
              Find the chain you are looking for
            </Button>
          </Group>
        </div>
      </Container>
      <Group noWrap className="pokt-landing-logos">
        {chains.map((name) => {
          return (
            <div key={name} className="logo-wrapper">
              <img
                alt={`${name} logo`}
                className="logo"
                src={`/landing-logos/${name}_logo.png`}
              />
            </div>
          )
        })}
      </Group>
    </Section>
  )
}
