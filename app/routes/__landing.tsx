import { Outlet, useLoaderData } from "@remix-run/react"
import { Header, links as HeaderLinks } from "~/components/shared/Header"
import { Footer, links as FooterLinks } from "~/components/shared/Footer"
import { Nav, links as NavLinks } from "~/components/marketing/Nav"
import { json, LinksFunction, LoaderFunction } from "@remix-run/node"
import { Auth0Profile } from "remix-auth-auth0"
import { getUserProfile } from "~/utils/session.server"

export const links: LinksFunction = () => {
  return [...HeaderLinks(), ...FooterLinks(), ...NavLinks()]
}

type LoaderData = {
  user: Awaited<Auth0Profile | undefined>
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUserProfile(request),
  })
}

export default function LandingLayout() {
  const data = useLoaderData() as LoaderData
  return (
    <>
      <Header nav="right" user={data.user}>
        <Nav user={data.user} />
      </Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
