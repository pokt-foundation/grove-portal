import { Grid, Space, Container } from "@pokt-foundation/pocket-blocks"
import { LoaderFunction, json, LinksFunction } from "@remix-run/node"
import { NavLink, Outlet } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import Card, { links as CardLinks } from "~/components/shared/Card"
import styles from "~/styles/admin.css"
import { requireAdmin } from "~/utils/session.server"

export const links: LinksFunction = () => [
  ...CardLinks(),
  {
    rel: "stylesheet",
    href: styles,
  },
]

type LoaderData = {
  admin: Awaited<Auth0Profile>
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
  const routes = [
    {
      to: "customPayPlan",
      label: "Pay Plan",
    },
    {
      to: "featureflags",
      label: "Feature Flags",
    },
  ]

  return (
    <Container size="lg">
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
                      `nav-link ${isActive ? "nav-link-active" : ""}`
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
