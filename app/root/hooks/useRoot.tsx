import { IconBookOpen, IconMail } from "@pokt-foundation/pocket-blocks"
import { useLocation, useParams } from "@remix-run/react"
import { useEffect, useMemo } from "react"
import { IconApp } from "~/components/Icons"
import { User } from "~/models/portal/sdk"
import analyticsInit from "~/utils/analytics"

type useRootProps = { user: Awaited<User | undefined> }

export const useRoot = ({ user }: useRootProps) => {
  const { pathname } = useLocation()
  const { accountId } = useParams()

  const isLanding = useMemo(() => pathname === "/", [pathname])
  const hideSidebar = useMemo(
    () =>
      pathname === `/account/${accountId}/create` ||
      pathname === `/account/${accountId}/app-limit-exceeded` ||
      pathname === `/user/profile` ||
      pathname === `/user/organizations` ||
      pathname === `/user/invites`,
    [accountId, pathname],
  )

  useEffect(() => {
    analyticsInit({ id: user?.portalUserID ?? "" })
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
        to: "/account",
        label: "Account",
        icon: IconApp,
        protected: Protected.Public, // show this link to all. dashboard layout handles redirect to login.
      },
      {
        to: "https://docs.portal.pokt.network/",
        external: true,
        label: "Docs",
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
  }, [user])

  return { isLanding, hideSidebar, routes }
}
