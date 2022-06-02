import { getRequiredClientEnvVar, getRequiredServerEnvVar } from "./environment"

describe("getRequiredClientEnvVar", () => {
  afterEach(() => {
    // resest environment
    process.env = {
      NODE_ENV: process.env.NODE_ENV,
    }
  })
  test("throws error if environment variable does not exist on ENV", () => {
    process.env.RANDOM_KEY = "test"
    // @ts-ignore
    expect(() => getRequiredClientEnvVar("RANDOM_KEY")).toThrowError("RANDOM_KEY")
  })
  test("throws error if environment variable value is not set", () => {
    expect(() => getRequiredClientEnvVar("AMPLITUDE_API_KEY")).toThrowError(
      "AMPLITUDE_API_KEY",
    )
    expect(() => getRequiredClientEnvVar("BACKEND_URL")).toThrowError("BACKEND_URL")
    expect(() => getRequiredClientEnvVar("BUILD_ID")).toThrowError("BUILD_ID")
    expect(() => getRequiredClientEnvVar("MAINNET_RPC_URL")).toThrowError(
      "MAINNET_RPC_URL",
    )
    expect(() => getRequiredClientEnvVar("SENTRY_DSN")).toThrowError("SENTRY_DSN")
  })
  test("returns value if it exists", () => {
    ENV.AMPLITUDE_API_KEY = "AMPLITUDE_API_KEY"
    ENV.BACKEND_URL = "BACKEND_URL"
    ENV.BUILD_ID = "BUILD_ID"
    ENV.MAINNET_RPC_URL = "MAINNET_RPC_URL"
    ENV.SENTRY_DSN = "SENTRY_DSN"
    expect(getRequiredClientEnvVar("NODE_ENV")).toBe("test")
    expect(getRequiredClientEnvVar("AMPLITUDE_API_KEY")).toBe("AMPLITUDE_API_KEY")
    expect(getRequiredClientEnvVar("BACKEND_URL")).toBe("BACKEND_URL")
    expect(getRequiredClientEnvVar("BUILD_ID")).toBe("BUILD_ID")
    expect(getRequiredClientEnvVar("MAINNET_RPC_URL")).toBe("MAINNET_RPC_URL")
    expect(getRequiredClientEnvVar("SENTRY_DSN")).toBe("SENTRY_DSN")
  })
})

describe("getRequiredServerEnvVar", () => {
  afterEach(() => {
    // resest environment
    process.env = {
      NODE_ENV: process.env.NODE_ENV,
    }
  })
  test("throws error if environment variable does not exist on process.env", () => {
    expect(() => getRequiredServerEnvVar("RANDOM_KEY")).toThrowError("RANDOM_KEY")
    expect(() => getRequiredServerEnvVar("AMPLITUDE_API_KEY")).toThrowError(
      "AMPLITUDE_API_KEY",
    )
    expect(() => getRequiredServerEnvVar("BACKEND_URL")).toThrowError("BACKEND_URL")
    expect(() => getRequiredServerEnvVar("BUILD_ID")).toThrowError("BUILD_ID")
    expect(() => getRequiredServerEnvVar("MAINNET_RPC_URL")).toThrowError(
      "MAINNET_RPC_URL",
    )
    expect(() => getRequiredServerEnvVar("SENTRY_DSN")).toThrowError("SENTRY_DSN")
  })
  test("returns value if it exists", () => {
    process.env.AMPLITUDE_API_KEY = "AMPLITUDE_API_KEY"
    process.env.BACKEND_URL = "BACKEND_URL"
    process.env.BUILD_ID = "BUILD_ID"
    process.env.MAINNET_RPC_URL = "MAINNET_RPC_URL"
    process.env.SENTRY_DSN = "SENTRY_DSN"
    expect(getRequiredServerEnvVar("NODE_ENV")).toBe("test")
    expect(getRequiredServerEnvVar("AMPLITUDE_API_KEY")).toBe("AMPLITUDE_API_KEY")
    expect(getRequiredServerEnvVar("BACKEND_URL")).toBe("BACKEND_URL")
    expect(getRequiredServerEnvVar("BUILD_ID")).toBe("BUILD_ID")
    expect(getRequiredServerEnvVar("MAINNET_RPC_URL")).toBe("MAINNET_RPC_URL")
    expect(getRequiredServerEnvVar("SENTRY_DSN")).toBe("SENTRY_DSN")
  })
})
