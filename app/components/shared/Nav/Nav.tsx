import { NavLink } from "@remix-run/react"
import React from "react"
// import { useTranslate } from "~/context/TranslateContext"
// import { IconApp, IconNetwork } from "~/components/shared/Icons"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type NavProps = {
  routes: Route[]
}

type Route = {
  to: string
  label?: string
  icon?: React.ReactNode
  end?: boolean
  external?: boolean
}

export const Nav = ({ routes }: NavProps) => {
  return (
    <nav className="pokt-nav">
      <ul>
        {routes.map((route) => {
          const Icon = route.icon
          return (
            <li key={route.to}>
              {route.external ? (
                <a className="nav-link" href={route.to}>
                  {route.label}
                </a>
              ) : (
                <NavLink
                  to={route.to}
                  end={route.end}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }
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
    </nav>
  )
}

export default Nav
