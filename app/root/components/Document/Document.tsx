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
import { useTranslate } from "~/context/TranslateContext"

const Document = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  const { language } = useTranslate()
  const [params] = useSearchParams()

  useEffect(() => {
    const referral = params.get("rid")
    if (referral) {
      window.localStorage.setItem("rid", referral)
    }
  }, [params])

  return (
    <html lang={language}>
      <head>
        {title && <title>{title}</title>}
        <StylesPlaceholder />
        <Global
          styles={(theme) => ({
            body: {
              ...theme.fn.fontStyles(),
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.navy[7]
                  : theme.colors.gray[2],
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[0]
                  : theme.colors.navy[9],
              lineHeight: theme.lineHeight,
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
