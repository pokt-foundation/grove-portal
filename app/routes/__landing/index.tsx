import { Container } from "~/components/shared/Container"
import { Form, Link } from "@remix-run/react"
import { Group } from "~/components/shared/Group"
import Text from "~/components/shared/Text"
import { LinksFunction } from "@remix-run/node"
import { CallOutBox, links as CallOutBoxLinks } from "../../components/shared/CallOutBox"
import { useTranslate } from "~/context/TranslateContext"
import styles from "~/styles/landing.css"
import { Skeleton, Title } from "@mantine/core"
import Button from "~/components/shared/Button"
import Grid from "~/components/shared/Grid"
import Card, { links as CardLinks } from "~/components/shared/Card"
import Section, { links as SectionLinks } from "~/components/shared/Section"

export const links: LinksFunction = () => {
  return [
    ...CallOutBoxLinks(),
    ...CardLinks(),
    ...SectionLinks(),
    { rel: "stylesheet", href: styles },
  ]
}

export default function Index() {
  const {
    t: { landing },
  } = useTranslate()

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

  const advantagesList = [
    {
      icon: "test",
      title: "Nodes",
      description:
        "Support your favorite applications and networks while earning from them.",
    },
    {
      icon: "test",
      title: "Community",
      description: "Contribute to the movement towards unstoppable infrastructure.",
    },
    {
      icon: "test",
      title: "Dapps",
      description: "Pocket provides RPC access to the long tail of blockchain networks.",
    },
  ]

  return (
    <>
      <Section p={256} backgroundImage="/pocket-header-bg-animated.gif">
        <Container size="xs">
          <Title order={1}>
            Get an endpoint for your blockchain, and{" "}
            <Text component="span" weight={900}>
              start building
            </Text>
          </Title>
          <Text>
            Deploy within minutes to decentralized infrastructure that can service dozens
            of chains.
          </Text>
          <Button component={Link} to="#">
            Try it for free
          </Button>
        </Container>
      </Section>
      <Section p={128}>
        <Container size="xl">
          <Title order={5}>ACCESS AND TRACK YOUR APP INFRASTRUCTURE</Title>
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
          <Grid>
            <Grid.Col lg={8} offsetLg={4}>
              <img src="/landing-background.png" alt="Subdued Pokt Logo" />
            </Grid.Col>
            <Grid.Col lg={4} offsetLg={-12}>
              <ul className="pokt-highlight-list">
                {highlightList.map((item) => (
                  <li key={item.title}>
                    <Title order={3}>{item.title}</Title>
                    <Text component="p" size="sm">
                      {item.description}
                    </Text>
                  </li>
                ))}
              </ul>
              <Button component={Link} to="#" color="white">
                Take a look at our Demo
              </Button>
            </Grid.Col>
          </Grid>
        </Container>
      </Section>
      <Section p={128}>
        <Container size="xl">
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
        </Container>
        <Group noWrap className="logos">
          {landing.chains.map((name) => {
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
      <hr />
      <Section p={128}>
        <Container size="xl">
          <Title order={2}>
            Advantages of the{" "}
            <Text component="span" weight={900} color="blue">
              Pocket Portal
            </Text>
          </Title>
          <Text size="sm">
            This application allows you to create an endpoint while deploying it on a
            decentralized infrastructure, making it less vulnerable to outages!
          </Text>

          <div>
            <Skeleton height={400} />
          </div>
          <Grid>
            {advantagesList.map((advantage) => (
              <Grid.Col key={advantage.title} span={12} sm={4}>
                <Card>
                  <div className="pokt-card-header">
                    <h3>{advantage.title}</h3>
                  </div>
                  <div>
                    <Text component="p" size="sm">
                      {advantage.description}
                    </Text>
                  </div>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Section>
      <hr />
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
