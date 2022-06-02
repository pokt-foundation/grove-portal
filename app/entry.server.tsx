import type { EntryContext } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import { renderToString } from "react-dom/server"
import { getClientEnv } from "~/utils/environment.server"
import { injectStylesIntoStaticMarkup } from "@mantine/ssr"

global.ENV = getClientEnv()

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const markup = renderToString(<RemixServer context={remixContext} url={request.url} />)
  const html = `<!DOCTYPE html>${injectStylesIntoStaticMarkup(markup)}`

  responseHeaders.set("Content-Type", "text/html")

  if (process.env.NODE_ENV !== "production") {
    responseHeaders.set("Cache-Control", "no-store")
  }

  responseHeaders.set("Content-Length", String(Buffer.byteLength(html)))

  return new Response(html, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
