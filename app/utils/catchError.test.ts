import { getErrorMessage } from "./catchError"

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
  test("returns error.message if error", () => {
    const error: any = new Error("message")
    expect(getErrorMessage(error)).toBe(error.message)
  })
})
