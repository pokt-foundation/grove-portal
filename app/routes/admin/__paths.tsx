import { Grid, Space, Title } from "@mantine/core"
import { LoaderFunction, json } from "@remix-run/node"
import { Link, Outlet } from "@remix-run/react"
import { Auth0Profile } from "remix-auth-auth0"
import { requireAdmin } from "~/utils/session.server"
import Container from "~/components/shared/Container"

type LoaderData = {
  admin: Awaited<Auth0Profile>
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    admin: await requireAdmin(request),
  })
}

export default function Admin() {
  return (
    <Container>
      <Space h={60} />
      <Grid>
        <Grid.Col sm={4}>
          <Title order={1}>Admin</Title>
          <ul>
            <li>
              <Link to="featureflags">Feature Flags</Link>
            </li>
          </ul>
        </Grid.Col>
        <Grid.Col sm={8}>
          <Outlet />
        </Grid.Col>
      </Grid>
      <Space h={60} />
    </Container>
  )
}
