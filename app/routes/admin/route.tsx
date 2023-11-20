import { Space, Container } from "@mantine/core"
import { LoaderFunction, json, LinksFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import styles from "./styles.css"
import { User } from "~/models/portal/sdk"
import { requireAdmin } from "~/utils/user.server"

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
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
