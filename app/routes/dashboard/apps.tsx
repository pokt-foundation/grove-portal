import { Grid } from "@mantine/core"
import { Link, Outlet, useLocation } from "@remix-run/react"
import AdEconomicsForDevs, {
  links as AdEconomicsForDevsLinks,
} from "~/components/application/AdEconomicsForDevs"
import FeedbackCard, {
  links as FeedbackCardLinks,
} from "~/components/application/FeedbackCard"
import Button from "~/components/shared/Button"

export const links = () => {
  return [...FeedbackCardLinks(), ...AdEconomicsForDevsLinks()]
}

export const Apps = () => {
  const location = useLocation()

  return (
    <Grid gutter={32}>
      <Grid.Col md={8}>
        <Outlet />
      </Grid.Col>
      <Grid.Col md={4}>
        {!location.pathname.includes("create") && (
          <Button component={Link} to="create" fullWidth mb={32}>
            Create New Application
          </Button>
        )}
        {location.pathname.includes("create") && (
          <Button component={Link} to="/dashboard/apps" fullWidth mb={32}>
            Back to Applications
          </Button>
        )}
        <section>
          <AdEconomicsForDevs />
        </section>
        <section>
          <FeedbackCard />
        </section>
      </Grid.Col>
    </Grid>
  )
}

export default Apps

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
    </div>
  )
}
