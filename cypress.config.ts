import { defineConfig } from "cypress"

require("dotenv").config()

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    specPattern: "cypress/e2e/**/*.ts",
    supportFile: "cypress/support/index.ts",
  },
  env: {
    auth0_domain: process.env.AUTH0_DOMAIN,
    auth0_audience: process.env.AUTH0_AUDIENCE,
    auth0_scope: process.env.AUTH0_SCOPE,
    auth0_client_id: process.env.AUTH0_CLIENT_ID,
    auth0_client_secret: process.env.AUTH0_CLIENT_SECRET,
    auth0_user: process.env.AUTH0_USER,
    auth0_password: process.env.AUTH0_PASSWORD,
    relay_meter_api_token: process.env.RELAY_METER_API_TOKEN,
  },
})
