import {
  Avatar,
  Burger,
  Flex,
  MediaQuery,
  Menu,
  UnstyledButton,
} from "@pokt-foundation/pocket-blocks"
import { Form, Link, NavLink } from "@remix-run/react"
import React, { useRef } from "react"
import { RiAccountCircleLine, RiLogoutBoxRLine, RiUser3Line } from "react-icons/ri"
import { Auth0Profile } from "remix-auth-auth0"

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
  return (
    <>
      <Form ref={logoutFormRef} action="/api/auth/auth0" method="post">
        <input readOnly aria-label="hidden" name="logout" type="hidden" value="true" />
      </Form>

      {user && (
        <Menu
          styles={{
            item: {
              padding: 16,
            },
          }}
        >
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
            <Menu.Item icon={<RiAccountCircleLine size={16} />}>
              <NavLink to={`/user/profile`}>User Profile </NavLink>
            </Menu.Item>
            <Menu.Item icon={<RiLogoutBoxRLine size={16} />}>
              <UnstyledButton
                component="span"
                fz="sm"
                onClick={() => {
                  if (logoutFormRef.current) {
                    logoutFormRef.current.dispatchEvent(
                      new Event("submit", { cancelable: true, bubbles: true }),
                    )
                  }
                }}
              >
                Logout
              </UnstyledButton>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  )
}

export default AppHeader