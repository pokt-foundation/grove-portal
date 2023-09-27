import { Grid, Space, Container, Group, Box, Title } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json, LinksFunction } from "@remix-run/node"
import { NavLink, Outlet } from "@remix-run/react"
import clsx from "clsx"
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

type Route = {
  to: string
  label?: string
  icon?: React.ReactNode
  end?: boolean
  external?: boolean
}

export default function Admin() {
  const routes: Route[] = [
    {
      to: "users/pay-plan",
      label: "Pay Plan",
    },
    {
      to: "settings/feature-flags",
      label: "Feature Flags",
    },
  ]

  return (
    <Container size="md">
      <Space h={60} />
      <Grid>
        <Grid.Col sm={3}>
          <Group>
            <Box>
              <Title order={3}>Admin Nav</Title>
            </Box>
            <ul className="admin-nav">
              {routes.map((route) => (
                <li key={route.to}>
                  <NavLink
                    className={({ isActive }) =>
                      clsx("nav-link", { "nav-link-active": isActive })
                    }
                    end={true}
                    to={route.to}
                  >
                    {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Group>
        </Grid.Col>
        <Grid.Col sm={9}>
          <Outlet />
        </Grid.Col>
      </Grid>
      <Space h={60} />
    </Container>
  )
}
