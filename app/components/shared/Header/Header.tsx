import { useViewportSize } from "@mantine/hooks"
import { IconPerson } from "@pokt-foundation/ui"
import { Item, Separator } from "@radix-ui/react-dropdown-menu"
import { Form, Link } from "@remix-run/react"
import clsx from "clsx"
import { useEffect, useMemo, useRef, useState } from "react"
import { Auth0Profile } from "remix-auth-auth0"
import Dropdown, { links as DropdownLinks } from "../Dropdown"
import HamburgerMenu, { links as HamburgerMenuLinks } from "../HamburgerMenu"
import styles from "./styles.css"
import Button from "~/components/shared/Button"

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
            leftIcon={<img alt="logout" src="/logout.svg" />}
            variant="outline"
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
              alt="pocket network"
              className="pokt-header-brand"
              loading="lazy"
              src="/logo.svg"
            ></img>
          </Link>
        </div>
        <HamburgerMenu
          isActive={isActive}
          isVisible={isMobile}
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
          <Form ref={logoutFormRef} action="/api/auth/auth0" method="post">
            <input
              readOnly
              aria-label="hidden"
              name="logout"
              type="hidden"
              value="true"
            />
          </Form>

          <UserMenuDropdown routes={routes} user={user} />
          {!user && (
            <>
              <Form action="/api/auth/auth0" method="post">
                <Button type="submit" variant="outline">
                  Login
                </Button>
              </Form>
              <Form action="/api/auth/auth0" method="post">
                <Button name="signup" type="submit" value="true" variant="outline">
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
        <HeaderChildren nav={nav} slot={children} user={user} />
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
          <Button name="logout" type="submit" value="true" variant="outline">
            Logout
          </Button>
        </Form>
      )}
    </>
  )
}

export default Header
