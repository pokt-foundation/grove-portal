function getClientEnv() {
  return {
    PORTAL_API_URL: process.env.PORTAL_API_URL,
    INDEXER_API_URL: process.env.INDEXER_API_URL,
    RELAY_METER_API_URL: process.env.RELAY_METER_API_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    MAINNET_RPC_URL: process.env.MAINNET_RPC_URL,
    NODE_ENV: process.env.NODE_ENV,
    AMPLITUDE_API_KEY: process.env.AMPLITUDE_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    BUILD_ID: process.env.BUILD_ID,
    GODMODE_ACCOUNTS: process.env.GODMODE_ACCOUNTS,
    FLAG_MULTI_LANGUAGE: process.env.FLAG_MULTI_LANGUAGE,
    FLAG_STRIPE_PAYMENT: process.env.FLAG_STRIPE_PAYMENT,
    FLAG_ENTERPRISE: process.env.FLAG_ENTERPRISE,
    GOOGLE_SHEETS_CONTACT_SALES_API_URL: process.env.GOOGLE_SHEETS_CONTACT_SALES_API_URL,
    ERROR_METRICS_API_URL: process.env.ERROR_METRICS_API_URL,
  }
}

type ENV = ReturnType<typeof getClientEnv>

// entry.server sets this global value
// root.tsx injects it into the window
declare global {
  // eslint-disable-next-line
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}

export { getClientEnv }
