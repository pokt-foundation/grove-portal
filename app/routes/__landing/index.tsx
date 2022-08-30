import { Grid } from "@pokt-foundation/pocket-blocks"
import { LinksFunction } from "@remix-run/node"
import { Form, useLocation, useSearchParams } from "@remix-run/react"
import { useEffect, useState } from "react"
import { CallOutBox, links as CallOutBoxLinks } from "../../components/shared/CallOutBox"
import { Container } from "~/components/shared/Container"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import { useTranslate } from "~/context/TranslateContext"
import styles from "~/styles/landing.css"

export const links: LinksFunction = () => {
  return [...CallOutBoxLinks(), ...ModalLinks(), { rel: "stylesheet", href: styles }]
}

export default function Index() {
  const {
    t: { landing },
  } = useTranslate()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [showExpiredModal, setShowExpiredModal] = useState(false)

  useEffect(() => {
    const expired = searchParams.get("expired")
    setShowExpiredModal(expired === "true")
  }, [searchParams])

  return (
    <>
      <Container>
        <Grid grow>
          <Grid.Col sm={5}>
            <h2>{landing.title}</h2>
            <p className="text">{landing.subtitle}</p>
            <p className="text"></p>
            <Form action="/api/auth/auth0" method="post">
              <button className="button" name="login" type="submit" value="true">
                {landing.getStarted}
              </button>
            </Form>
          </Grid.Col>

          <Grid.Col offset={2} sm={5}>
            {landing.callOutBoxText.map((item) => {
              return (
                <CallOutBox
                  key={item.title}
                  blueText={item.blueText}
                  description={item.description}
                  smallText={item.smallText}
                  title={item.title}
                />
              )
            })}
          </Grid.Col>
          <Grid.Col>
            <p className="text">
              {landing.connect}{" "}
              <Form action="/api/auth/auth0" className="inline-form" method="post">
                <button className="link" name="signup" type="submit" value="true">
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
      <img alt="Subdued Pokt Logo" className="pokt-image" src="/landing-background.png" />
      <Modal
        opened={showExpiredModal}
        title="User Session Expired"
        onClose={() => setShowExpiredModal(false)}
      >
        <div>
          <p>Your user session has expired, please try logging in again.</p>
        </div>
      </Modal>
    </>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <dialog color="red" title="Index Error">
        {error.message}
      </dialog>
    </div>
  )
}
