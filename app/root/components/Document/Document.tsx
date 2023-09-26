import { StylesPlaceholder } from "@mantine/remix"
import { Global } from "@pokt-foundation/pocket-blocks"
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useSearchParams,
} from "@remix-run/react"
import React, { useEffect } from "react"

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
        <Global
          styles={(theme) => ({
            body: {
              ...theme.fn.fontStyles(),
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[9]
                  : theme.colors.gray[2],
              lineHeight: theme.lineHeight,
              fontSize: "14px",
            },
          })}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default Document
