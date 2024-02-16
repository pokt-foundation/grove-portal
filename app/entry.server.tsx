import { CacheProvider } from "@emotion/react"
import { createStylesServer, injectStyles } from "@mantine/remix"
import type { EntryContext } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import { renderToString } from "react-dom/server"
import { getClientEnv } from "~/utils/environment.server"
import { emotionCache } from "~/utils/mantineCache"

global.ENV = getClientEnv()

const server = createStylesServer(emotionCache)

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  // Wrap the server in the cache provider and set the cache
  let markup = renderToString(
    <CacheProvider value={emotionCache}>
      <RemixServer context={remixContext} url={request.url} />
    </CacheProvider>,
  )
  if (process.env.NODE_ENV !== "production") {
    responseHeaders.set("Cache-Control", "no-store")
  }
  responseHeaders.set("Content-Type", "text/html")

  return new Response(`<!DOCTYPE html>${injectStyles(markup, server)}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
