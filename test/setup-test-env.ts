import { getClientEnv } from "~/utils/environment.server"
import { installGlobals } from "@remix-run/node/globals"
// import "@testing-library/jest-dom"
import { toHaveNoViolations } from "jest-axe"
import matchers, { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers"

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}

// expect.extend(matchers)
expect.extend({ ...toHaveNoViolations, ...matchers } as any)

installGlobals()
global.ENV = getClientEnv()
