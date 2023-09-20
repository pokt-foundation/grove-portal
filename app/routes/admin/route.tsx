import { Grid, Space, Container } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json, LinksFunction } from "@remix-run/node"
import { NavLink, Outlet } from "@remix-run/react"
import clsx from "clsx"
import styles from "./styles.css"
import Card, { links as CardLinks } from "~/components/Card"
import { User } from "~/models/portal/sdk"
import { requireAdmin } from "~/utils/user.server"

export const links: LinksFunction = () => [
  ...CardLinks(),
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
    <Container fluid className="container">
      <Space h={60} />
      <Grid>
        <Grid.Col sm={3}>
          <Card>
            <div className="pokt-card-header">
              <h3>Admin Nav</h3>
            </div>
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
          </Card>
        </Grid.Col>
        <Grid.Col sm={9}>
          <Outlet />
        </Grid.Col>
      </Grid>
      <Space h={60} />
    </Container>
  )
}
