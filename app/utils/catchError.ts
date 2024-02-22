export type ErrorWithMessage = {
  response?: { errors: { message: string }[] }
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  const errorObject = error as ErrorWithMessage
  const errors = errorObject?.response?.errors
  return (
    typeof error === "object" &&
    error !== null &&
    Array.isArray(errors) &&
    errors.length > 0 &&
    typeof errors[0].message === "string"
  )
}

function toErrorMessage(maybeError: unknown): string {
  if (isErrorWithMessage(maybeError)) {
    return maybeError.response?.errors[0].message || ""
  }

  try {
    return typeof maybeError === "string" ? maybeError : JSON.stringify(maybeError)
  } catch (error) {
    return String(maybeError)
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorMessage(error)
}
