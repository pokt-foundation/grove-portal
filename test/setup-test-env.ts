import { installGlobals } from "@remix-run/node"
// import "@testing-library/jest-dom"
import matchers, { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers"
import { toHaveNoViolations } from "jest-axe"
import { getClientEnv } from "~/utils/environment.server"

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}

// expect.extend(matchers)
expect.extend({ ...toHaveNoViolations, ...matchers } as any)

// SERVER VARIABLE MOCKS
process.env.SESSION_SECRET = "mock"
process.env.AUTH0_CLIENT_ID = "mock"
process.env.AUTH0_CLIENT_SECRET = "mock"
process.env.AUTH0_DOMAIN = "mock"
process.env.AUTH0_AUDIENCE = "mock"
process.env.AUTH0_SCOPE = "mock"
process.env.VERCEL_URL = "localhost:3001"
process.env.GODMODE_ACCOUNTS = "god"

// CLIENT VARIABLE MOCKS:
// reference through ENV varibale not process.env
process.env.FLAG_LEGACY_MESSAGING = "true"

installGlobals()
global.ENV = getClientEnv()

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
