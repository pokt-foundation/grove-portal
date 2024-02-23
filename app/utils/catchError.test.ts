import { ErrorWithMessage, ErrorWithMessages, getErrorMessage } from "./catchError"

const sampleNestedError: ErrorWithMessages = {
  response: {
    errors: [
      {
        message: "Sample error message",
      },
    ],
  },
}

const sampleThrownError: ErrorWithMessage = {
  message: "Sample thrown error message",
}
describe("catchError", () => {
  test("returns message if string", () => {
    const message = "message"
    expect(getErrorMessage(message)).toBe(message)
  })
  test("returns string of message if number", () => {
    const message = 10
    expect(getErrorMessage(message)).toBe(`${message}`)
  })
  test("returns stringified message if object or array", () => {
    let message: any = { object: "message" }
    expect(getErrorMessage(message)).toBe(JSON.stringify(message))

    message = [{ object: "message" }]
    expect(getErrorMessage(message)).toBe(JSON.stringify(message))
  })
  test("returns error message for thrown errors", () => {
    expect(getErrorMessage(sampleThrownError)).toBe(sampleThrownError.message)
  })
  test("returns error message for nested graphql errors", () => {
    expect(getErrorMessage(sampleNestedError)).toBe(
      sampleNestedError.response?.errors[0].message,
    )
  })
})
