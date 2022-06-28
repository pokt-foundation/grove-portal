import styles from "./styles.css"
import { Form, Link } from "@remix-run/react"
import Button from "~/components/shared/Button"
import { Auth0Profile } from "remix-auth-auth0"
import { useViewportSize } from "@mantine/hooks"
import HamburgerMenu, { links as HamburgerMenuLinks } from "../HamburgerMenu"
import { useEffect, useMemo, useRef, useState } from "react"
import clsx from "clsx"
import { IconPerson } from "@pokt-foundation/ui"
import Dropdown, { links as DropdownLinks } from "../Dropdown"
import { Item, Separator } from "@radix-ui/react-dropdown-menu"

export const links = () => {
  return [
    ...DropdownLinks(),
    { rel: "stylesheet", href: styles },
    ...HamburgerMenuLinks(),
  ]
}

type Route = {
  id: string
  el: () => JSX.Element
}

type HeaderProps = {
  nav?: "left" | "right"
  user?: Auth0Profile
}

export const Header: React.FC<HeaderProps> = ({ user, nav = "left", children }) => {
  const [isActive, setIsActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const logoutFormRef = useRef<HTMLFormElement>(null)
  const { width } = useViewportSize()

  useEffect(() => {
    if (width >= 640) {
      setIsMobile(false)
      setIsActive(false)
    } else {
      setIsMobile(true)
    }
  }, [width])

  const routes: Route[] = useMemo(() => {
    const userRoutes = [
      {
        id: "account",
        el: () => <h5>Account</h5>,
      },
      {
        id: "user",
        el: () => <Link to="/dashboard/profile">User Profile</Link>,
      },
      {
        id: "logout",
        el: () => (
          <Button
            variant="outline"
            leftIcon={<img src="/logout.svg" alt="logout" />}
            onClick={() => {
              if (logoutFormRef.current) {
                logoutFormRef.current.dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true }),
                )
              }
            }}
          >
            Logout
          </Button>
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
          <Form action="/api/auth/auth0" method="post" ref={logoutFormRef}>
            <input type="hidden" readOnly name="logout" value="true" aria-label="hidden"/>
          </Form>

          <UserMenuDropdown user={user} routes={routes} />
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

type UserMenuDropdownProps = {
  user?: Auth0Profile
  routes: Route[]
}

function UserMenuDropdown({ user, routes }: UserMenuDropdownProps) {
  return (
    <>
      {user && (
        <Dropdown label={<IconPerson />}>
          {routes.map(({ el, id: routeID }, index) => {
            const El = el
            return (
              <>
                <Item key={routeID}>
                  <El />
                </Item>
                {index < routes.length - 1 && <Separator />}
              </>
            )
          })}
        </Dropdown>
      )}
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
