import {
  Container,
  IconBookOpen,
  IconCircleQuestion,
  IconMail,
} from "@pokt-foundation/pocket-blocks"
import { LinksFunction } from "@remix-run/node"
import { Outlet, useCatch } from "@remix-run/react"
import { useMemo } from "react"
import styles from "./styles.css"
import Footer, { links as FooterLinks } from "~/components/Footer"
import Header, { links as HeaderLinks } from "~/components/Header"
import IconApp from "~/components/Icons/IconApp"
import IconNetwork from "~/components/Icons/IconNetwork"
import Nav, { links as NavLinks } from "~/components/Nav"
import { useTranslate } from "~/context/TranslateContext"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    ...FooterLinks(),
    ...HeaderLinks(),
    ...NavLinks(),
  ]
}

export default function Landing() {
  const { t } = useTranslate()

  const routes = useMemo(() => {
    enum Protected {
      Public = 0,
      Private = 1,
      PrivateAdmin = 2,
      Admin = 3,
    }

    const allRoutes = [
      {
        to: "/network",
        label: "Network",
        icon: IconNetwork,
        end: true,
        protected: Protected.Public,
      },
      {
        to: "/dashboard/apps",
        label: t.dashboard.routes.apps,
        icon: IconApp,
        protected: Protected.Public, // show this link to all. dashboard layout handles redirect to login.
      },
      {
        to: "/docs",
        label: t.dashboard.routes.docs,
        icon: IconBookOpen,
        protected: Protected.Public,
      },
      {
        to: "/faq",
        label: "FAQs",
        icon: IconCircleQuestion,
        protected: Protected.Public,
      },
      {
        to: "https://support.pokt.network",
        external: true,
        label: "Support",
        icon: IconMail,
        protected: Protected.Public,
      },
    ]

    return allRoutes
  }, [t])

  return (
    <>
      <Header>
        <Nav ariaLabel="Main" routes={routes} />
      </Header>
      <main>
        <Container className="container" size="lg">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <h1>Dashboard Error</h1>
        <p>{caught.statusText}</p>
      </div>
    )
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h1>Dashboard Error</h1>
      <p>{error.message}</p>
    </div>
  )
}
