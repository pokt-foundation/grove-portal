import { useLocation, useParams } from "@remix-run/react"
import { useEffect, useMemo } from "react"
import { User } from "~/models/portal/sdk"
import { trackPage } from "~/utils/analytics"

type useRootProps = { user: Awaited<User | undefined> }

export const useRoot = ({ user }: useRootProps) => {
  const { pathname } = useLocation()
  const { accountId } = useParams()

  const isLanding = useMemo(() => pathname === "/", [pathname])
  const hideSidebar = useMemo(
    () =>
      pathname === `/org/${accountId}/create` ||
      pathname === `/org/${accountId}/app-limit-exceeded` ||
      pathname === `/user/profile` ||
      pathname === `/user/organizations` ||
      pathname === `/user/invites`,
    [accountId, pathname],
  )

  useEffect(() => {
    trackPage(pathname, document.title)
  }, [pathname])

  return { isLanding, hideSidebar }
}
