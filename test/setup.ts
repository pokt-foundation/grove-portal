import "@testing-library/jest-dom"
import { installGlobals } from "@remix-run/node"
import matchers from "@testing-library/jest-dom/matchers"
import { toHaveNoViolations } from "jest-axe"
import { expect } from "vitest"
import { getClientEnv } from "~/utils/environment.server"

expect.extend({ ...toHaveNoViolations, ...matchers })

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
