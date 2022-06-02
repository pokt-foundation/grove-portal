import { NavLink } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"
import { IconApp, IconNetwork } from "~/components/shared/Icons"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const Nav = () => {
  const { t } = useTranslate()
  const EmptyIcon = () => <></>

  const routes = [
    {
      to: "/dashboard",
      label: t.terms.network,
      icon: IconNetwork,
    },
    {
      to: "/dashboard/apps",
      label: t.terms.apps,
      icon: IconApp,
    },
    {
      to: "/dashboard/support",
      label: t.terms.support,
      icon: EmptyIcon,
    },
  ]

  return (
    <nav>
      <ul>
        {routes.map((route) => {
          const Icon = route.icon
          return (
            <li key={route.to}>
              <NavLink
                to={route.to}
                end={route.to === "/dashboard"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                <Icon />
                <span>{route.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav
