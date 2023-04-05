import {
  Avatar,
  Button,
  IconLogOut,
  IconUser,
  Menu,
} from "@pokt-foundation/pocket-blocks"
import { Form, Link, useLocation } from "@remix-run/react"
import clsx from "clsx"
import { useEffect, useMemo, useRef, useState } from "react"
import React from "react"
import { Auth0Profile } from "remix-auth-auth0"
import HamburgerMenu, { links as HamburgerMenuLinks } from "../HamburgerMenu"
import styles from "./styles.css"

/* c8 ignore start */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }, ...HamburgerMenuLinks()]
}
/* c8 ignore stop */

type Route = {
  id: string
  el: () => JSX.Element
}

type HeaderProps = {
  nav?: "left" | "right"
  user?: Auth0Profile
  children: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ user, nav = "left", children }) => {
  const [isActive, setIsActive] = useState(false)
  const logoutFormRef = useRef<HTMLFormElement>(null)
  const location = useLocation()

  const routes: Route[] = useMemo(() => {
    const userRoutes = [
      {
        id: "account",
        el: () => <Menu.Label>Account</Menu.Label>,
      },
      {
        id: "user",
        el: () => (
          <Menu.Item component={Link} to="/dashboard/profile">
            User Profile
          </Menu.Item>
        ),
      },
      {
        id: "support",
        el: () => (
          <Menu.Item
            component={"a"}
            href="https://pokt.height.app/inbox?taskForm=Pokt-Technical-Support-k1jo7CqGZMvI"
            rel="noreferrer"
            target="_blank"
          >
            Support
          </Menu.Item>
        ),
      },
      {
        id: "logout",
        el: () => (
          <Menu.Item>
            <Button
              leftIcon={<IconLogOut height={18} width={18} />}
              size="sm"
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
          </Menu.Item>
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

  useEffect(() => {
    setIsActive(false)
  }, [location.pathname])

  return (
    <>
      <header className="pokt-header">
        <div className="pokt-header-branding pokt-header-flex">
          <Link to="/">
            <img
              alt="pocket network"
              className="pokt-header-brand"
              loading="lazy"
              src="/pni_portal_logo_blue.svg"
            ></img>
          </Link>
        </div>
        <HamburgerMenu isActive={isActive} onClick={() => setIsActive(!isActive)} />
        <div
          className={clsx({
            "pokt-header-actions": true,
            "pokt-header-flex": true,
            mobile: true,
            open: isActive,
          })}
        >
          <div className={`pokt-header-nav nav-${nav} pokt-header-flex`}>{children}</div>
          {user && (
            <Form ref={logoutFormRef} action="/api/auth/auth0" method="post">
              <input
                readOnly
                aria-label="hidden"
                name="logout"
                type="hidden"
                value="true"
              />
            </Form>
          )}

          <UserMenuDropdown routes={routes} user={user} />
          {!user && (
            <>
              <Form action="/api/auth/auth0" method="post">
                <Button color="gray" size="sm" type="submit" variant="subtle">
                  Login
                </Button>
              </Form>
              <Form action="/api/auth/auth0" method="post">
                <Button
                  name="signup"
                  size="sm"
                  type="submit"
                  value="true"
                  variant="outline"
                >
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
        <Menu>
          <Menu.Target>
            <Avatar
              sx={{
                cursor: "pointer",
              }}
              variant="outline"
            >
              <IconUser fill="var(--mantine-color-gray-0)" />
            </Avatar>
          </Menu.Target>
          <Menu.Dropdown>
            {routes.map(({ el, id: routeID }, index) => {
              const El = el
              return <El key={routeID} />
            })}
          </Menu.Dropdown>
        </Menu>
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
