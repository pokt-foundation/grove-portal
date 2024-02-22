import { EmptyState } from "~/components/EmptyState"
import { useHandleError } from "~/hooks/useHandleError"

export const ErrorBoundaryView = () => {
  const errorMessage = useHandleError()

  return (
    <EmptyState
      alt="Something went wrong"
      imgHeight={216}
      // TODO: Replace with Error asset
      imgSrc="/app-limit-exceeded.svg"
      imgWidth={270}
      subtitle={errorMessage}
      title="Something went wrong"
    />
  )
}

export default ErrorBoundaryView
