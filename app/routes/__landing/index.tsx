import { Container } from "~/components/shared/Container"
import { Form } from "@remix-run/react"
import { Grid } from "~/components/shared/Grid"
import { LinksFunction } from "@remix-run/node"
import styles from "~/styles/landing.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Index() {
  const chains = [
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
  ]

  return (
    <>
      <Container>
        <Grid grow>
          <Grid.Col sm={5}>
            <h2>Your gateway to Web3 done right.</h2>
            <p className="text">
              Deploy within minutes to decentralized infrastructure that can service
              dozens of chains. The Portal acts as your one-stop-shop to manage, make
              changes, and monitor your application's connection to blockchain data.
            </p>
            <p className="text">Welcome to Web3 done the right way.</p>
            <Form action="/api/auth/auth0" method="post">
              <button type="submit" name="login" className="button">
                Get Started
              </button>
            </Form>
          </Grid.Col>

          <Grid.Col sm={5} offset={2}>
            <div className="callOutBox">
              <div>
                <h3>One click Endpoints</h3>
                <p className="smallText">For any network with 1M daily relays free</p>
              </div>
              <div className="callOutGraphic">
                <p className="bigBlueText">10+</p>{" "}
                <p className="callOutGraphicDescription">Networks</p>
              </div>
            </div>
            <div className="callOutBox">
              <div>
                <h3>Thousands of nodes</h3>
                <p className="smallText">Serving any network at any given moment</p>
              </div>
              <div className="callOutGraphic">
                <p className="bigBlueText">47K+</p>{" "}
                <p className="callOutGraphicDescription">Nodes</p>
              </div>
            </div>
            <div className="callOutBox">
              <div>
                <h3>Monitor your Infra</h3>
                <p className="smallText">
                  Tracking and managing your app across any chain
                </p>
              </div>
              <div className="callOutGraphic">
                <p className="bigBlueText">6B+</p>{" "}
                <p className="callOutGraphicDescription">Weekly relays</p>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col>
            <p className="text">
              Connect to these networks.{" "}
              <Form className="inline-form" action="/api/auth/auth0" method="post">
                <button type="submit" name="signup" className="link">
                  See who's next.
                </button>
              </Form>
            </p>
          </Grid.Col>
          <div className="logo-box">
            {chains.map(function (name) {
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
