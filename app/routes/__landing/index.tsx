import { Container } from "~/components/shared/Container"
import { Form, Link } from "@remix-run/react"
import { Group } from "~/components/shared/Group"
import Text from "~/components/shared/Text"
import { LinksFunction } from "@remix-run/node"
import { CallOutBox, links as CallOutBoxLinks } from "../../components/shared/CallOutBox"
import { useTranslate } from "~/context/TranslateContext"
import styles from "~/styles/landing.css"
import { Accordion, Skeleton, Title } from "@mantine/core"
import Button from "~/components/shared/Button"
import Grid from "~/components/shared/Grid"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Section, { links as SectionLinks } from "~/components/shared/Section"
import LandingHero, {
  links as LandingHeroLinks,
} from "~/components/marketing/LandingHero"
import LandingDiscover, {
  links as LandingDiscoverLinks,
} from "~/components/marketing/LandingDiscover"
import LandingBlockchains, {
  links as LandingBlockchainsLinks,
} from "~/components/marketing/LandingBlockchains"
import LandingAdvantages, {
  links as LandingAdvantagesLinks,
} from "~/components/marketing/LandingAdvantages"
import LandingFAQs, {
  links as LandingFAQsLinks,
} from "~/components/marketing/LandingFAQs"

export const links: LinksFunction = () => {
  return [
    ...CallOutBoxLinks(),
    ...CardLinks(),
    ...SectionLinks(),
    ...LandingHeroLinks(),
    ...LandingDiscoverLinks(),
    ...LandingBlockchainsLinks(),
    ...LandingAdvantagesLinks(),
    ...LandingFAQsLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function Index() {
  const { t } = useTranslate()

  return (
    <>
      <LandingHero />
      <LandingDiscover />
      <LandingBlockchains />
      <hr />
      <LandingAdvantages />
      <hr />
      <LandingFAQs />
      <Section px={128}>
        <Container size="xl">
          <Title order={2} align="center">
            The best choice for those{" "}
            <Text component="span" weight={900}>
              who want to get ahead!
            </Text>
          </Title>
          <Group noWrap>
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
          </Group>
        </Container>
      </Section>
      {/* <Container>
        <Grid grow>
          <Grid.Col sm={5}>
            <h2>{landing.title}</h2>
            <p className="text">{landing.subtitle}</p>
            <p className="text"></p>
            <Form action="/api/auth/auth0" method="post">
              <button type="submit" name="login" className="button" value="true">
                {landing.getStarted}
              </button>
            </Form>
          </Grid.Col>

          <Grid.Col sm={5} offset={2}>
            {landing.callOutBoxText.map((item) => {
              return (
                <CallOutBox
                  key={item.title}
                  title={item.title}
                  smallText={item.smallText}
                  blueText={item.blueText}
                  description={item.description}
                />
              )
            })}
          </Grid.Col>
          <Grid.Col>
            <p className="text">
              {landing.connect}{" "}
              <Form className="inline-form" action="/api/auth/auth0" method="post">
                <button type="submit" name="signup" className="link" value="true">
                  {landing.whosNext}
                </button>
              </Form>
            </p>
          </Grid.Col>
          <div className="logo-box">
            {landing.chains.map((name) => {
              return (
                <img
                  key={name}
                  alt={`${name} logo`}
                  className="landing-logos"
                  src={`/landing-logos/${name}_logo.png`}
                />
              )
            })}
          </div>
        </Grid>
      </Container>
      <img className="pokt-image" src="/landing-background.png" alt="Subdued Pokt Logo" /> */}
    </>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <dialog title="Index Error" color="red">
        {error.message}
      </dialog>
    </div>
  )
}
