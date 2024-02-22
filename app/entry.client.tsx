import { ClientProvider } from "@mantine/remix"
import { RemixBrowser } from "@remix-run/react"
import { hydrate } from "react-dom"
import { emotionCache } from "~/utils/mantineCache.js"

hydrate(
  <ClientProvider emotionCache={emotionCache}>
    <RemixBrowser />
  </ClientProvider>,
  document,
)
