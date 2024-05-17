import { ColorSchemeScript, MantineColorScheme } from "@mantine/core"
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useSearchParams,
} from "@remix-run/react"
import React, { useEffect } from "react"
import RootProviders from "~/root/components/RootProviders"

const Document = ({
  children,
  title,
  colorScheme,
}: {
  children: React.ReactNode
  title?: string
  colorScheme?: MantineColorScheme
}) => {
  const [params] = useSearchParams()

  useEffect(() => {
    const referral = params.get("rid")
    if (referral) {
      window.localStorage.setItem("rid", referral)
    }
  }, [params])

  return (
    <html data-mantine-color-scheme={colorScheme}>
      <head>
        {title && <title>{title}</title>}
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
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme={colorScheme} />
      </head>
      <body>
        <RootProviders colorScheme={colorScheme}>{children}</RootProviders>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default Document
