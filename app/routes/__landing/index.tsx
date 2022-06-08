import { Container } from "~/components/shared/Container"
import { Form } from "@remix-run/react"
import { Grid } from "~/components/shared/Grid"
import { LinksFunction } from "@remix-run/node"
import { CallOutBox, links as CallOutBoxLinks } from "../../components/shared/CallOutBox"
import styles from "~/styles/landing.css"

export const links: LinksFunction = () => {
  return [...CallOutBoxLinks(), { rel: "stylesheet", href: styles }]
}

export default function Index() {
  const text = {
    chains: [
      "avalanche",
      "solana",
      "algorand",
      "okx",
      "fuse",
      "pokt",
      "ethereum",
      "polygon",
      "gnosis",
      "harmony",
      "binance_smart_chain",
      "iotex",
      "boba",
      "evmos",
      "fantom",
    ],
    callOutBoxText: [
      {
        title: "One click Endpoints",
        smallText: "For any network with 1M daily relays free",
        blueText: "10+",
        description: "Networks",
      },
      {
        title: "Thousands of nodes",
        smallText: "Serving any network at any given moment",
        blueText: "47K+",
        description: "Nodes",
      },
      {
        title: "Monitor your Infra",
        smallText: "Tracking and managing your app across any chain",
        blueText: "6B+",
        description: "Weekly relays",
      },
    ],
    title: "Your gateway to Web3 done right.",
    subtitle: `Deploy within minutes to decentralized infrastructure that can service
    dozens of chains. The Portal acts as your one-stop-shop to manage, make
    changes, and monitor your application's connection to blockchain data.`,
    welcomeText: "Welcome to Web3 done the right way.",
    getStarted: "Get Started",
    connect: "Connect to these networks.",
    whosNext: `See who's next.`,
  }

  return (
    <>
      <Container>
        <Grid grow>
          <Grid.Col sm={5}>
            <h2>{text.title}</h2>
            <p className="text">{text.subtitle}</p>
            <p className="text"></p>
            <Form action="/api/auth/auth0" method="post">
              <button type="submit" name="login" className="button" value="true">
                {text.getStarted}
              </button>
            </Form>
          </Grid.Col>

          <Grid.Col sm={5} offset={2}>
            {text.callOutBoxText.map((item) => {
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
              {text.connect}{" "}
              <Form className="inline-form" action="/api/auth/auth0" method="post">
                <button type="submit" name="signup" className="link" value="true">
                  {text.whosNext}
                </button>
              </Form>
            </p>
          </Grid.Col>
          <div className="logo-box">
            {text.chains.map(function (name) {
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
      <img className="pokt-image" src="/landing-background.png" alt="Subdued Pokt Logo" />
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
