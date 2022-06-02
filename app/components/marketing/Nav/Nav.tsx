import { NavLink } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const Nav = () => {
  const { t } = useTranslate()

  const routes = [
    {
      to: "/faq",
      label: "FAQs",
    },
    {
      to: "https://www.pokt.network/",
      label: "About Pocket",
    },
    {
      to: "https://docs.pokt.network/home/paths/app-developer",
      label: "Docs",
    },
  ]

  return (
    <nav>
      <ul>
        {routes.map((route) => (
          <li key={route.to}>
            <NavLink
              to={route.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              {route.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
