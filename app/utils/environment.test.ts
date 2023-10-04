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
    expect(() => getRequiredClientEnvVar("BUILD_ID")).toThrowError("BUILD_ID")
    expect(() => getRequiredClientEnvVar("DOCS_STATUS")).toThrowError("DOCS_STATUS")
  })
  test("returns value if it exists", () => {
    ENV.BUILD_ID = "BUILD_ID"
    ENV.DOCS_STATUS = "DOCS_STATUS"
    ENV.FLAG_ENTERPRISE = "FLAG_ENTERPRISE"
    ENV.FLAG_INFLUX_RELAY_ERROR = "FLAG_INFLUX_RELAY_ERROR"
    ENV.FLAG_LEGACY_MESSAGING = "FLAG_LEGACY_MESSAGING"
    ENV.FLAG_MAINTENANCE_MODE = "FLAG_MAINTENANCE_MODE"
    ENV.FLAG_MAINTENANCE_MODE_DASHBOARD = "FLAG_MAINTENANCE_MODE_DASHBOARD"
    ENV.FLAG_MULTI_LANGUAGE = "FLAG_MULTI_LANGUAGE"
    ENV.FLAG_STRIPE_PAYMENT = "FLAG_STRIPE_PAYMENT"
    ENV.GODMODE_ACCOUNTS = "GODMODE_ACCOUNTS"
    ENV.GOOGLE_ANALYTICS_ID = "GOOGLE_ANALYTICS_ID"
    ENV.NODE_ENV = "test"
    ENV.PORTAL_API_URL = "PORTAL_API_URL"
    ENV.RELAY_METER_API_URL = "RELAY_METER_API_URL"

    expect(getRequiredClientEnvVar("BUILD_ID")).toBe("BUILD_ID")
    expect(getRequiredClientEnvVar("DOCS_STATUS")).toBe("DOCS_STATUS")
    expect(getRequiredClientEnvVar("FLAG_ENTERPRISE")).toBe("FLAG_ENTERPRISE")
    expect(getRequiredClientEnvVar("FLAG_INFLUX_RELAY_ERROR")).toBe(
      "FLAG_INFLUX_RELAY_ERROR",
    )
    expect(getRequiredClientEnvVar("FLAG_LEGACY_MESSAGING")).toBe("FLAG_LEGACY_MESSAGING")
    expect(getRequiredClientEnvVar("FLAG_MAINTENANCE_MODE")).toBe("FLAG_MAINTENANCE_MODE")
    expect(getRequiredClientEnvVar("FLAG_MAINTENANCE_MODE_DASHBOARD")).toBe(
      "FLAG_MAINTENANCE_MODE_DASHBOARD",
    )
    expect(getRequiredClientEnvVar("FLAG_MULTI_LANGUAGE")).toBe("FLAG_MULTI_LANGUAGE")
    expect(getRequiredClientEnvVar("FLAG_STRIPE_PAYMENT")).toBe("FLAG_STRIPE_PAYMENT")
    expect(getRequiredClientEnvVar("GODMODE_ACCOUNTS")).toBe("GODMODE_ACCOUNTS")
    expect(getRequiredClientEnvVar("GOOGLE_ANALYTICS_ID")).toBe("GOOGLE_ANALYTICS_ID")
    expect(getRequiredClientEnvVar("PORTAL_API_URL")).toBe("PORTAL_API_URL")
    expect(getRequiredClientEnvVar("RELAY_METER_API_URL")).toBe("RELAY_METER_API_URL")
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
