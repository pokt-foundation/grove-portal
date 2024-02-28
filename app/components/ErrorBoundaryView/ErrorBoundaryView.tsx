import { EmptyState } from "~/components/EmptyState"
import { useHandleError } from "~/hooks/useHandleError"

export const ErrorBoundaryView = () => {
  const errorMessage = useHandleError()

  return (
    <EmptyState
      alt="Something went wrong"
      imgHeight={240}
      imgSrc="/portal-error.svg"
      imgWidth={240}
      subtitle={errorMessage}
      title="Something went wrong"
    />
  )
}

export default ErrorBoundaryView
