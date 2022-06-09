import { Container } from "~/components/shared/Container"
import { Form } from "@remix-run/react"
import { Grid } from "~/components/shared/Grid"
import { LinksFunction } from "@remix-run/node"
import { CallOutBox, links as CallOutBoxLinks } from "../../components/shared/CallOutBox"
import { useTranslate } from "~/context/TranslateContext"
import styles from "~/styles/landing.css"

export const links: LinksFunction = () => {
  return [...CallOutBoxLinks(), { rel: "stylesheet", href: styles }]
}

export default function Index() {
  const {
    t: { landing },
  } = useTranslate()

  return (
    <>
      <Container>
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
