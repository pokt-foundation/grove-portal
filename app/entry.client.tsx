import { ClientProvider } from "@mantine/remix"
import { ModalsProvider } from "@mantine/modals"
import { RemixBrowser } from "@remix-run/react"
import { hydrate } from "react-dom"

hydrate(
  <ClientProvider>
    <ModalsProvider>
      <RemixBrowser />
    </ModalsProvider>
  </ClientProvider>,
  document,
)
