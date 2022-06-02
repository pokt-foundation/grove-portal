import { Outlet } from "@remix-run/react"
import { Header, links as HeaderLinks } from "~/components/shared/Header"
import { Footer, links as FooterLinks } from "~/components/shared/Footer"
import { Nav, links as NavLinks } from "~/components/marketing/Nav"
import { LinksFunction } from "@remix-run/node"

export const links: LinksFunction = () => {
  return [...HeaderLinks(), ...FooterLinks(), ...NavLinks()]
}

export default function LandingLayout() {
  return (
    <>
      <Header nav="right">
        <Nav />
      </Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
