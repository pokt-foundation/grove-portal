import "./styles.css"

import { Space, Container } from "@mantine/core"
import { cssBundleHref } from "@remix-run/css-bundle"
import { LoaderFunction, json, LinksFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { User } from "~/models/portal/sdk"
import { requireAdmin } from "~/utils/user.server"

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]

type LoaderData = {
  admin: Awaited<User>
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    admin: await requireAdmin(request),
  })
}

export default function Admin() {
  return (
    <Container size="md">
      <Space h={60} />
      <Outlet />
    </Container>
  )
}
