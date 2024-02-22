import { EmptyState } from "~/components/EmptyState"
import { useHandleError } from "~/hooks/useHandleError"

export const ErrorBoundaryView = () => {
  const errorMessage = useHandleError()

  return (
    <EmptyState
      alt="App limit exceeded"
      imgHeight={216}
      imgSrc="/app-limit-exceeded.svg"
      imgWidth={270}
      subtitle={errorMessage}
      title="Something went wrong"
    />
  )
}

export default ErrorBoundaryView
