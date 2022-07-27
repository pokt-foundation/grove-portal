function getClientEnv() {
  return {
    MAINNET_RPC_URL: process.env.MAINNET_RPC_URL,
    NODE_ENV: process.env.NODE_ENV,
    AMPLITUDE_API_KEY: process.env.AMPLITUDE_API_KEY,
    BACKEND_URL: process.env.BACKEND_URL,
    RELAY_METER_API_URL: process.env.RELAY_METER_API_URL,
    PORTAL_API_URL: process.env.PORTAL_API_URL,
    INDEXER_API_URL: process.env.INDEXER_API_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    BUILD_ID: process.env.BUILD_ID,
    FLAG_MULTI_LANGUAGE: process.env.FLAG_MULTI_LANGUAGE,
    GODMODE_ACCOUNTS: process.env.GODMODE_ACCOUNTS,
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
