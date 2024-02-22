import { isRouteErrorResponse, useRouteError } from "@remix-run/react"

export const useHandleError = () => {
  const error = useRouteError()
  console.error(error)
  let errorMessage: string | undefined

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data
  } else if (error instanceof Error) {
    errorMessage = error.stack
  }

  return errorMessage
}
