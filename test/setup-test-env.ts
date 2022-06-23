import { vi } from "vitest"
import { getClientEnv } from "~/utils/environment.server"
import { installGlobals } from "@remix-run/node/globals"
// import "@testing-library/jest-dom"
import matchers, { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers"

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}

expect.extend(matchers)

installGlobals()
global.ENV = getClientEnv()
