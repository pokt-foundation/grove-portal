/// <reference types="vitest" />
/// <reference types="vite/client" />
import { installGlobals } from "@remix-run/node"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

installGlobals()

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup-test-env.ts"],
    coverage: {
      reporter: ["text", "html", "json-summary"],
      lines: 50,
      branches: 50,
      functions: 50,
      statements: 50,
    },
  },
})
