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
  const [opened, setOpened] = useState(false)

  return (
    <AppShell
      header={
        <Header height={60}>
          <Group align="center" position="apart" px={20} sx={{ height: "100%" }}>
            <div>
              <MediaQuery largerThan="md" styles={{ display: "none" }}>
                <Burger
                  color={"gray"}
                  mr="xl"
                  opened={opened}
                  size="sm"
                  onClick={() => setOpened((o) => !o)}
                />
              </MediaQuery>
              <Link to="/">
                {colorScheme === "dark" ? (
                  <img
                    alt="pocket network"
                    className="pokt-header-brand"
                    height="25"
                    loading="lazy"
                    src="/pni_portal_logo_blue.svg"
                  />
                ) : (
                  <img
                    alt="pocket network"
                    className="pokt-header-brand"
                    height="25"
                    loading="lazy"
                    src="/pni_portal_logo_dark.svg"
                  />
                )}
              </Link>
            </div>
            <ActionIcon size={30} variant="default" onClick={() => toggleColorScheme()}>
              {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
            </ActionIcon>
          </Group>
        </Header>
      }
      navbar={
        <Navbar hidden={!opened} hiddenBreakpoint="md" p="xs" width={{ base: 250 }}>
          <Navbar.Section grow mt="xs">
            {/* <Link to="">Back</Link> */}
            <ul className="admin-nav">
              {routes.map((route) => (
                <li key={route.to}>
                  <NavLink
                    className={({ isActive }) =>
                      clsx("nav-link", { "nav-link-active": isActive })
                    }
                    end={route.to === ""}
                    to={route.to}
                  >
                    <Text color={colorScheme === "dark" ? "light" : "dark"} m="0">
                      {route.label}
                    </Text>
                  </NavLink>
                </li>
              ))}
            </ul>
          </Navbar.Section>
        </Navbar>
      }
      navbarOffsetBreakpoint="md"
      padding="md"
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
