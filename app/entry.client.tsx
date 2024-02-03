import { ClientProvider } from "@mantine/remix"
import { RemixBrowser } from "@remix-run/react"
import { startTransition, StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { emotionCache } from "~/utils/mantineCache"

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ClientProvider emotionCache={emotionCache}>
        <RemixBrowser />
      </ClientProvider>
    </StrictMode>,
  )
})
