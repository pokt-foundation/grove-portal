import { NavLink } from "@remix-run/react"
import { useMemo } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import styles from "./styles.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type NavProps = {
  user?: Auth0Profile
}

export const Nav = ({ user }: NavProps) => {
  const routes = useMemo(() => {
    const dashboardRoutes = [
      {
        to: "/dashboard",
        label: "Dashboard",
      },
    ]
    const marketingRoutes = [
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

    if (user) {
      return [...marketingRoutes, ...dashboardRoutes]
    }
    return marketingRoutes
  }, [user])

  return (
    <nav>
      <ul>
        {routes.map((route) => (
          <li key={route.to}>
            {/https?:\/\//.test(route.to) ? (
              <a className="nav-link" href={route.to}>
                {route.label}
              </a>
            ) : (
              <NavLink
                to={route.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                {route.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
