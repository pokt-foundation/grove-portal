import { Outlet } from "@remix-run/react"
import { Header, links as HeaderLinks } from "~/components/shared/Header"
import { Footer, links as FooterLinks } from "~/components/shared/Footer"
import { Nav, links as NavLinks } from "~/components/shared/Nav"
import { LinksFunction } from "@remix-run/node"

export const links: LinksFunction = () => {
  return [...HeaderLinks(), ...FooterLinks(), ...NavLinks()]
}

export default function LandingLayout() {
  const routes = [
    {
      to: "/faq",
      label: "FAQs",
    },
    {
      to: "https://www.pokt.network/",
      label: "About Pocket",
    },
    {
      to: "https://docs.pokt.network/home/paths/app-developer",
      label: "Docs",
    },
  ]
  return (
    <>
      <Header nav="right">
        <Nav routes={routes} />
      </Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
