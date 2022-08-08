import { captureMessage } from "@sentry/react"
import * as environment from "./environment"
import { log } from "./log"

const message = "Test Error"
const error = new Error(message)

const spyEnv = vi
  .spyOn(environment, "getRequiredClientEnvVar")
  .mockImplementation(() => "test")
vi.mock("@sentry/react", () => {
  return {
    captureMessage: vi.fn(),
  }
})
console.log = vi.fn()
console.info = vi.fn()
console.warn = vi.fn()
console.error = vi.fn()

describe("log", () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  test("defaults to consoles.log || when level = 'debug' && NODE_ENV !== production", () => {
    log(error)
    expect(console.log).toHaveBeenCalledWith(message)

    log(error, "debug")
    expect(console.log).toHaveBeenCalledWith(message)
  })
  test("consoles.info when level = 'info' && NODE_ENV !== production", () => {
    log(error, "info")
    expect(console.info).toHaveBeenCalledWith(message)
  })
  test("consoles.warn when level = 'warning' && NODE_ENV !== production", () => {
    log(error, "warning")
    expect(console.warn).toHaveBeenCalledWith(message)
  })
  test("consoles.error when level = 'error' || 'critical' || 'fatal' && NODE_ENV !== production", () => {
    log(error, "error")
    expect(console.error).toHaveBeenCalledWith(message)

    log(error, "critical")
    expect(console.error).toHaveBeenCalledWith(message)

    log(error, "fatal")
    expect(console.error).toHaveBeenCalledWith(message)
  })
  test("does not consoles output when NODE_ENV === production", () => {
    spyEnv.mockReturnValue("production")
    log(error)
    expect(console.log).not.toHaveBeenCalledWith(message)
  })
  test("calls sentry captureMessage when NODE_ENV === production", () => {
    spyEnv.mockReturnValue("production")
    log(error)
    expect(console.log).not.toHaveBeenCalledWith(message)
    expect(captureMessage).toHaveBeenCalledWith(message, "log")

    log(error, "debug")
    expect(captureMessage).toHaveBeenCalledWith(message, "debug")

    log(error, "info")
    expect(captureMessage).toHaveBeenCalledWith(message, "info")

    log(error, "warning")
    expect(captureMessage).toHaveBeenCalledWith(message, "warning")

    log(error, "error")
    expect(captureMessage).toHaveBeenCalledWith(message, "error")

    log(error, "critical")
    expect(captureMessage).toHaveBeenCalledWith(message, "critical")

    log(error, "fatal")
    expect(captureMessage).toHaveBeenCalledWith(message, "fatal")
  })
})
