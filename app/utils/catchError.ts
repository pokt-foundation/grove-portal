export type ErrorWithMessages = {
  response?: { errors: { message: string }[] }
}

function isErrorWithMessages(error: unknown): error is ErrorWithMessages {
  const errorObject = error as ErrorWithMessages
  const errors = errorObject?.response?.errors
  return (
    typeof error === "object" &&
    error !== null &&
    Array.isArray(errors) &&
    errors.length > 0 &&
    typeof errors[0].message === "string"
  )
}

export type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

function toErrorMessage(maybeError: unknown): string {
  if (isErrorWithMessages(maybeError)) {
    return maybeError.response?.errors[0].message || ""
  }

  if (isErrorWithMessage(maybeError)) {
    return maybeError.message || ""
  }

  try {
    return typeof maybeError === "string" ? maybeError : JSON.stringify(maybeError)
  } catch (error) {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return String(maybeError)
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorMessage(error)
}
