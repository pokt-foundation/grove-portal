import { installGlobals } from "@remix-run/node/globals"
// import "@testing-library/jest-dom"
import { toHaveNoViolations } from "jest-axe"
import matchers, { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers"
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

process.env.SESSION_SECRET = "mock"
process.env.AUTH0_CLIENT_ID = "mock"
process.env.AUTH0_CLIENT_SECRET = "mock"
process.env.AUTH0_DOMAIN = "mock"
process.env.AUTH0_AUDIENCE = "mock"
process.env.AUTH0_SCOPE = "mock"

installGlobals()
global.ENV = getClientEnv()
