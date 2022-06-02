import { Container } from "~/components/shared/Container"
import { Grid } from "~/components/shared/Grid"

export default function Index() {
  return (
    <>
      <Container>
        <Grid>
          <Grid.Col sm={4}>Landing Home</Grid.Col>
        </Grid>
      </Container>
    </>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  console.log(error)
  return (
    <div className="error-container">
      <dialog title="Index Error" color="red">
        {error.message}
      </dialog>
    </div>
  )
}
