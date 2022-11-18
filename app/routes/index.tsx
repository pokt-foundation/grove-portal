import { Grid } from "@pokt-foundation/pocket-blocks"
import { LinksFunction, MetaFunction } from "@remix-run/node"
import { Form, useSearchParams } from "@remix-run/react"
import { useEffect, useState } from "react"
import { CallOutBox, links as CallOutBoxLinks } from "~/components/shared/CallOutBox"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import { useTranslate } from "~/context/TranslateContext"
import styles from "~/styles/landing.css"

export const meta: MetaFunction = () => {
  return {
    title: "Pocket Network Portal | POKT",
  }
}

export const links: LinksFunction = () => {
  return [...CallOutBoxLinks(), ...ModalLinks(), { rel: "stylesheet", href: styles }]
}

export default function Index() {
  const {
    t: { landing },
  } = useTranslate()
  const [searchParams] = useSearchParams()
  const [showExpiredModal, setShowExpiredModal] = useState(false)

  useEffect(() => {
    const expired = searchParams.get("expired")
    setShowExpiredModal(expired === "true")
  }, [searchParams])

  return (
    <>
      <Grid grow>
        <Grid.Col lg={5} sm={12}>
          <h2>{landing.title}</h2>
          <p className="text">{landing.subtitle}</p>
          <p className="text"></p>
          <Form action="/api/auth/auth0" method="post">
            <button className="button" name="login" type="submit" value="true">
              {landing.getStarted}
            </button>
          </Form>
        </Grid.Col>
        <Grid.Col lg={2} md={0} />

        <Grid.Col lg={5} sm={12}>
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
            <a
              className="link"
              href="https://app.dework.xyz/i/4Hc9nkCtWs5Vgbx6pddZNl"
              rel="noreferrer"
              target="_blank"
            >
              {landing.whosNext}
            </a>
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
      <img alt="Subdued Pokt Logo" className="pokt-image" src="/landing-background.png" />
      <Modal
        opened={showExpiredModal}
        title="User Session Expired"
        onClose={() => setShowExpiredModal(false)}
      >
        <div>
          <p>Your user session has expired. Please try logging in again.</p>
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
