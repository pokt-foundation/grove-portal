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

export const links = () => {
  return [
    ...SectionLinks(),
    ...TitleLinks(),
    ...TextLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function LandingDiscover() {
  const { t } = useTranslate()

  const highlightList = [
    {
      title: "One endpoint and access to multiple chains",
      description:
        "The Portal lets you create an endpoint for all the chains you want you want in just a few clicks and provides you with the features you've come to expect in centralized API services, such as usage/uptime metrics and notifications/alerts.",
    },
    {
      title: "Up to a million relays per day",
      description:
        "The Portal lets you create an endpoint for all the chains you want you want in just a few clicks and provides you with the features you've come to expect in centralized API services, such as usage/uptime metrics and notifications/alerts.",
    },
    {
      title: "Track your app infrastructure",
      description:
        "The Portal lets you create an endpoint for all the chains you want you want in just a few clicks and provides you with the features you've come to expect in centralized API services, such as usage/uptime metrics and notifications/alerts.",
    },
  ]

  return (
    <Section className="pokt-highlights" px={128}>
      <Container size="xl">
        <div className="pokt-landing-header">
          <Title order={5} className="pokt-pre-title">
            ACCESS AND TRACK YOUR APP INFRASTRUCTURE
          </Title>
          <Group position="apart">
            <Title order={2}>
              Discover more about{" "}
              <Text component="span" weight={900} color="blue">
                Pocket Portal
              </Text>
            </Title>
            <Button component={Link} to="">
              Get started for free
            </Button>
          </Group>
        </div>
        <Grid>
          <Grid.Col md={8} offsetMd={4}>
            <img
              className="pokt-highlights-image"
              src="/landing-background.png"
              alt="Subdued Pokt Logo"
            />
          </Grid.Col>
          <Grid.Col md={4} offsetMd={-12}>
            <ul className="pokt-highlights-list">
              {highlightList.map((item) => (
                <li key={item.title}>
                  <Title order={3}>{item.title}</Title>
                  <Text component="p" size="sm">
                    {item.description}
                  </Text>
                </li>
              ))}
            </ul>
          </Grid.Col>
        </Grid>
      </Container>
    </Section>
  )
}
