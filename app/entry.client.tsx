import { createEmotionCache } from "@mantine/core"
import { ClientProvider } from "@mantine/remix"
import { RemixBrowser } from "@remix-run/react"
import { startTransition, StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"

startTransition(() => {
  const emotionCache = createEmotionCache({ key: "mantine" })
  hydrateRoot(
    document,
    <StrictMode>
      <ClientProvider emotionCache={emotionCache}>
        <RemixBrowser />
      </ClientProvider>
    </StrictMode>,
  )
})
