import Container from "~/components/shared/Container"
import Section, { links as SectionLinks } from "~/components/shared/Section"
import Title, { links as TitleLinks } from "~/components/shared/Title"
import Text, { links as TextLinks } from "~/components/shared/Text"
import Button from "~/components/shared/Button"
import { Link } from "@remix-run/react"
import styles from "./styles.css"

export const links = () => {
  return [
    ...SectionLinks(),
    ...TitleLinks(),
    ...TextLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function LandingHero() {
  return (
    <Section px={256} backgroundImage="/pocket-header-bg-animated.gif">
      <Container size="sm">
        <Title order={1}>
          Get an endpoint for your blockchain, and{" "}
          <Text component="span" weight={900}>
            start building
          </Text>
        </Title>
        <Text>
          Deploy within minutes to decentralized infrastructure that can service dozens of
          chains.
        </Text>
        <Button component={Link} to="#" variant="filled">
          Try it for free
        </Button>
      </Container>
    </Section>
  )
}
