import styles from "./styles.css"
import { Form, Link } from "@remix-run/react"
import Button from "~/components/shared/Button"
import { Auth0Profile } from "remix-auth-auth0"
import { useViewportSize } from "@mantine/hooks"
import HamburgerMenu, { links as HamburgerMenuLinks } from "../HamburgerMenu"
import { useEffect, useMemo, useState } from "react"
import clsx from "clsx"
import { Divider, Menu } from "@mantine/core"
import { IconPerson } from "@pokt-foundation/ui"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }, ...HamburgerMenuLinks()]
}

type HeaderProps = {
  nav?: "left" | "right"
  user?: Auth0Profile
}

export const Header: React.FC<HeaderProps> = ({ user, nav = "left", children }) => {
  const [isActive, setIsActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { width } = useViewportSize()

  useEffect(() => {
    if (width >= 640) {
      setIsMobile(false)
      setIsActive(false)
    } else {
      setIsMobile(true)
    }
  }, [width])

  const routes = useMemo(() => {
    const userRoutes = [
      {
        id: "account",
        el: () => <h5>Account</h5>,
      },
      {
        id: "divider1",
        el: () => <Divider />,
      },
      {
        id: "user",
        el: () => <p>{user?.displayName}</p>,
      },
      {
        id: "divider2",
        el: () => <Divider />,
      },
      {
        id: "logout",
        el: () => (
          <Form action="/api/auth/auth0" method="post">
            <Button type="submit" variant="outline" name="logout" value="true">
              Logout
            </Button>
          </Form>
        ),
      },
    ]

    const noUserRoutes = [
      {
        id: "login",
        el: () => (
          <Form action="/api/auth/auth0" method="post">
            <Button type="submit" variant="outline">
              Login
            </Button>
          </Form>
        ),
      },
    ]

    if (user) {
      return userRoutes
    }
    return noUserRoutes
  }, [user])

  return (
    <>
      <header className="pokt-header">
        <div className="pokt-header-branding pokt-header-flex">
          <Link to="/">
            <img
              src="/logo.svg"
              loading="lazy"
              alt="pocket network"
              className="pokt-header-brand"
            ></img>
          </Link>
        </div>
        <HamburgerMenu
          isVisible={isMobile}
          isActive={isActive}
          onClick={() => setIsActive(!isActive)}
        />
        <div
          className={clsx({
            "pokt-header-actions": true,
            "pokt-header-flex": true,
            mobile: isMobile,
            open: isActive,
          })}
        >
          <div className={`pokt-header-nav nav-${nav} pokt-header-flex`}>{children}</div>
          {user && (
            <Menu
              control={
                <div>
                  <IconPerson />
                </div>
              }
            >
              {routes.map((route) => {
                const El = route.el
                return <El key={route.id} />
              })}
            </Menu>
          )}
          {!user && (
            <>
              <Form action="/api/auth/auth0" method="post">
                <Button type="submit" variant="outline">
                  Login
                </Button>
              </Form>
              <Form action="/api/auth/auth0" method="post">
                <Button type="submit" variant="outline" name="signup" value="true">
                  Sign Up
                </Button>
              </Form>
            </>
          )}
          {/* <HeaderChildren user={user} nav={nav} slot={children} /> */}
        </div>
      </header>
      <aside
        className={clsx({
          "pokt-aside-menu": true,
          open: isActive,
        })}
      >
        <HeaderChildren user={user} nav={nav} slot={children} />
      </aside>
    </>
  )
}

type HeaderChildrenProps = {
  slot: React.ReactNode
  nav?: "left" | "right"
  user?: Auth0Profile
}
const HeaderChildren = ({ user, nav, slot }: HeaderChildrenProps) => {
  return (
    <>
      <div className={`pokt-header-nav nav-${nav} pokt-header-flex`}>{slot}</div>
      {!user && (
        <Form action="/api/auth/auth0" method="post">
          <Button type="submit" variant="outline">
            Login
          </Button>
        </Form>
      )}
      {user && (
        <Form action="/api/auth/auth0" method="post">
          <Button type="submit" variant="outline" name="logout" value="true">
            Logout
          </Button>
        </Form>
      )}
    </>
  )
}

export default Header
