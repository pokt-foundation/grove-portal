import {
  useMantineColorScheme,
  AppShell,
  Navbar,
  Header,
  Group,
  ActionIcon,
  IconSun,
  IconMoon,
  Text,
  Burger,
  MediaQuery,
  theme,
} from "@pokt-foundation/pocket-blocks"
import { NavLink, Link } from "@remix-run/react"
import clsx from "clsx"
import React, { useState } from "react"
import { Route } from "../../route"

type ShellProps = {
  routes: Route[]
  children: React.ReactNode
}

export default function Shell({ routes, children }: ShellProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const [prevRoutePath, setPrevRoutePath] = useState("")
  const [opened, setOpened] = useState(false)

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="md"
      navbar={
        <Navbar hiddenBreakpoint="md" hidden={!opened} width={{ base: 250 }} p="xs">
          <Navbar.Section grow mt="xs">
            {/* <Link to="">Back</Link> */}
            <ul className="admin-nav">
              {routes.map((route) => (
                <li key={route.to}>
                  <NavLink
                    className={({ isActive }) =>
                      clsx("nav-link", { "nav-link-active": isActive })
                    }
                    onClick={() => setPrevRoutePath(route.to)}
                    end={route.to === "" ? true : false}
                    to={route.to}
                  >
                    <Text m="0" color={colorScheme === "dark" ? "light" : "dark"}>
                      {route.label}
                    </Text>
                  </NavLink>
                </li>
              ))}
            </ul>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group sx={{ height: "100%" }} px={20} position="apart" align="center">
            <div>
              <MediaQuery largerThan="md" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={"gray"}
                  mr="xl"
                />
              </MediaQuery>
              <Link to="/">
                {colorScheme === "dark" ? (
                  <img
                    alt="pocket network"
                    className="pokt-header-brand"
                    loading="lazy"
                    src="/pni_portal_logo_blue.svg"
                    height="25"
                  />
                ) : (
                  <img
                    alt="pocket network"
                    className="pokt-header-brand"
                    loading="lazy"
                    src="/pni_portal_logo_dark.svg"
                    height="25"
                  />
                )}
              </Link>
            </div>
            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
              {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
            </ActionIcon>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.navy[6] : theme.colors.gray[0],
        },
        root: {
          header: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.navy[5] : theme.colors.gray[1],
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.navy[4] : theme.colors.gray[2],
          },
          nav: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.navy[5] : theme.colors.gray[1],
            borderColor:
              theme.colorScheme === "dark" ? theme.colors.navy[4] : theme.colors.gray[2],
          },
        },
      })}
    >
      {children}
    </AppShell>
  )
}
