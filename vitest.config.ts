/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["dotenv/config", "./test/setup.ts"],
    coverage: {
      reporter: ["text", "html", "json-summary"],
      // lines: 50,
      // branches: 50,
      // functions: 50,
      // statements: 50,
    },
    watchExclude: [".*\\/node_modules\\/.*", ".*\\/build\\/.*"],
  },
})
