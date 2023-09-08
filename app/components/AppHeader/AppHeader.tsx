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
import { LuLogOut, LuUser } from "react-icons/lu"
import { Auth0Profile } from "remix-auth-auth0"
import Identicon from "../Identicon"

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
          <img alt="Grove logo" height={20} loading="lazy" src="/grove-logo.svg"></img>
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
              <Identicon username={user.id ?? "user default"} />
            </Avatar>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<LuUser size={16} />}>
              <NavLink to={`/user/profile`}>User Profile </NavLink>
            </Menu.Item>
            <Menu.Item icon={<LuLogOut size={16} />}>
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
