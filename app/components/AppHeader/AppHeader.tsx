import { Avatar, Burger, Flex, MediaQuery, Menu } from "@pokt-foundation/pocket-blocks"
import { Form, Link } from "@remix-run/react"
import React, { useRef } from "react"
import { RiAccountCircleLine, RiLogoutBoxRLine, RiUser3Line } from "react-icons/ri"
import { Auth0Profile } from "remix-auth-auth0"
import { AppLink, NavButton } from "~/components/NavLinks/NavLinks"

type HeaderProps = {
  user?: Auth0Profile
  opened: boolean
  onOpen: (o: boolean) => void
}

export const AppHeader = ({ user, opened, onOpen }: HeaderProps) => {
  return (
    <>
      <Flex align="center" h="100%" justify="space-between">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger mr="xl" opened={opened} size="sm" onClick={() => onOpen(!opened)} />
        </MediaQuery>
        <Link to="/">
          <img
            alt="Pocket network portal logo"
            loading="lazy"
            src="/pni_portal_logo_blue.svg"
            style={{ height: "1.5rem", objectFit: "contain" }}
          ></img>
        </Link>
        <UserMenuDropdown user={user} />
      </Flex>
    </>
  )
}

type UserMenuDropdownProps = {
  user?: Auth0Profile
}

function UserMenuDropdown({ user }: UserMenuDropdownProps) {
  const logoutFormRef = useRef<HTMLFormElement>(null)

  const userProfileRoute = {
    to: "/dashboard/profile",
    icon: RiAccountCircleLine,
    label: "User Profile",
  }

  return (
    <>
      <Form ref={logoutFormRef} action="/api/auth/auth0" method="post">
        <input readOnly aria-label="hidden" name="logout" type="hidden" value="true" />
      </Form>

      {user && (
        <Menu>
          <Menu.Target>
            <Avatar
              radius="xl"
              sx={{
                cursor: "pointer",
              }}
              variant="outline"
            >
              <RiUser3Line size={22} />
            </Avatar>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>
              <AppLink route={userProfileRoute} />
            </Menu.Item>
            <Menu.Item>
              <NavButton
                icon={RiLogoutBoxRLine}
                label="Logout"
                onClick={() => {
                  if (logoutFormRef.current) {
                    logoutFormRef.current.dispatchEvent(
                      new Event("submit", { cancelable: true, bubbles: true }),
                    )
                  }
                }}
              />
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  )
}

export default AppHeader
