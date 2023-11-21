import { StylesPlaceholder } from "@mantine/remix"
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useSearchParams,
} from "@remix-run/react"
import React, { useEffect } from "react"
import RootProviders from "../RootProviders"

const Document = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  const [params] = useSearchParams()

  useEffect(() => {
    const referral = params.get("rid")
    if (referral) {
      window.localStorage.setItem("rid", referral)
    }
  }, [params])

  return (
    <html>
      <head>
        {title && <title>{title}</title>}
        <StylesPlaceholder />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9764LFJST6"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9764LFJST6');
        `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <RootProviders>{children}</RootProviders>
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  )
}

export default Document
