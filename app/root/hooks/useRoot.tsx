import { IconBookOpen, IconMail } from "@pokt-foundation/pocket-blocks"
import { useLocation } from "@remix-run/react"
import { useEffect, useMemo } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import { IconApp } from "~/components/Icons"
import { useTranslate } from "~/context/TranslateContext"
import analyticsInit from "~/utils/analytics"

type useRootProps = { user: Awaited<Auth0Profile | undefined> }

export const useRoot = ({ user }: useRootProps) => {
  const { t } = useTranslate()
  const { pathname } = useLocation()
  const isDashboard = useMemo(() => pathname.includes("/dashboard/"), [pathname])
  useEffect(() => {
    analyticsInit({ id: user?.id ?? "" })
  }, [user])

  const routes = useMemo(() => {
    enum Protected {
      Public = 0,
      Private = 1,
      PrivateAdmin = 2,
      Admin = 3,
    }

    const allRoutes = [
      {
        to: "/dashboard/apps",
        label: t.dashboard.routes.apps,
        icon: IconApp,
        protected: Protected.Public, // show this link to all. dashboard layout handles redirect to login.
      },
      {
        to: "https://docs.portal.pokt.network/",
        external: true,
        label: t.dashboard.routes.docs,
        icon: IconBookOpen,
        protected: Protected.Public,
      },
      {
        to: "https://support.pokt.network",
        external: true,
        label: "Support",
        icon: IconMail,
        protected: Protected.Public,
      },
    ]

    let protectedLevel = Protected.Public

    if (user) {
      protectedLevel = Protected.Private
    }

    return allRoutes.filter((r) => r.protected <= protectedLevel)
  }, [t, user])

  return { isDashboard, routes }
}
