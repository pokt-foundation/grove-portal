import "@testing-library/jest-dom"
import { installGlobals } from "@remix-run/node"
import matchers from "@testing-library/jest-dom/matchers"
import { toHaveNoViolations } from "jest-axe"
import { expect } from "vitest"
import { getClientEnv } from "~/utils/environment.server"
import "vitest-canvas-mock"

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

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  })),
})

Object.defineProperty(window, "gtag", {
  writable: true,
  value: vi.fn().mockImplementation(() => vi.fn()),
})
