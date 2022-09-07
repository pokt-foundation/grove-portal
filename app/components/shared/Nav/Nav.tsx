import { Select } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import { redirect } from "@remix-run/node"
import { NavLink } from "@remix-run/react"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import styles from "./styles.css"
// import { useTranslate } from "~/context/TranslateContext"
// import { IconApp, IconNetwork } from "~/components/shared/Icons"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}
/* c8 ignore stop */

type NavProps = {
  routes: Route[]
  dropdown?: boolean
  appId?: string
}

type Route = {
  to: string
  label?: string
  icon?: React.ReactNode
  end?: boolean
  external?: boolean
}

export const Nav = ({ routes, dropdown = false, appId }: NavProps) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [mobilePageSelect, setMobilePageSelect] = useState<string | null>(null)
  const { width } = useViewportSize()

  const reformatRoute = (routes: Route[]) => {
    let routeTable = []
    for (let i = 0; i < routes.length; i += 1) {
      let label = routes[i].label !== undefined ? routes[i].label : "Back to all apps"
      routeTable.push({ value: routes[i].to, label: label })
    }
    return routeTable
  }

  useEffect(() => {
    if (width >= 640) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [width])

  useEffect(() => {
    if (mobilePageSelect !== null) {
      if (mobilePageSelect === "") {
        window.location.href = `/dashboard/apps/${appId}`
      } else if (mobilePageSelect === "/dashboard/apps") {
        window.location.href = mobilePageSelect
      } else {
        window.location.href = `/dashboard/apps/${appId}/${mobilePageSelect}`
      }
    }
  }, [mobilePageSelect])

  return (
    <nav className={clsx("pokt-nav", isMobile && dropdown && "mobile")}>
      {isMobile && (
        <div className="navigation-dropdown">
          <Select
            aria-label="Application navigation"
            className="pokt-nav-dropdown"
            data={reformatRoute(routes)}
            placeholder="Navigate to..."
            onChange={(value) => {
              setMobilePageSelect(value)
            }}
          />
        </div>
      )}
      {isMobile === false && (
        <ul>
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <li key={route.to}>
                {route.external ? (
                  <a
                    className="nav-link"
                    href={route.to}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {route.label}
                  </a>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "nav-link-active" : ""}`
                    }
                    end={route.end}
                    to={route.to}
                  >
                    {/* @ts-ignore eslint-disable-next-line */}
                    {route.icon && <Icon />}
                    {route.label && <span>{route.label}</span>}
                  </NavLink>
                )}
              </li>
            )
          })}
        </ul>
      )}
      {isMobile === null && <div className="nav-space"></div>}
    </nav>
  )
}

export default Nav
