import {
  useMantineColorScheme,
  AppShell,
  Navbar,
  NavLink,
  Header,
  Group,
  ActionIcon,
  IconSun,
  IconMoon,
  IconArrowUpRight,
  Text,
  Burger,
  MediaQuery,
} from "@pokt-foundation/pocket-blocks"
import { NavLink as RemixNavLink, Link } from "@remix-run/react"
import clsx from "clsx"
import React, { useState } from "react"
import { Route } from "../../route"

type ShellProps = {
  routes: Route[]
  externalRoutes: Route[]
  children: React.ReactNode
}

export default function Shell({ routes, externalRoutes, children }: ShellProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const [opened, setOpened] = useState(false)

  return (
    <AppShell
      header={
        <Header height={80}>
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
        <Navbar hidden={!opened} hiddenBreakpoint="md" width={{ base: 280 }}>
          <Navbar.Section grow mt="xs">
            {/* <Link to="">Back</Link> */}
            <ul className="admin-nav">
              {routes.map((route) => (
                <li key={route.to}>
                  <RemixNavLink end={route.to === ""} to={route.to}>
                    {({ isActive }) => (
                      <NavLink
                        active={isActive}
                        label={route.label}
                        p={16}
                        sx={(theme) => ({
                          '&[data-active="true"]': {
                            borderRight: `2px solid ${theme.primaryColor}`,
                          },
                        })}
                        variant="filled"
                      />
                    )}
                  </RemixNavLink>
                </li>
              ))}
            </ul>
          </Navbar.Section>
          <Navbar.Section>
            <ul className="admin-nav">
              {externalRoutes.map((route) => (
                <li key={route.to}>
                  <a href={route.to}>
                    <NavLink
                      label={route.label}
                      p={16}
                      rightSection={<IconArrowUpRight height={18} width={18} />}
                      sx={(theme) => ({
                        '&[data-active="true"]': {
                          borderRight: `2px solid ${theme.primaryColor}`,
                        },
                      })}
                      variant="filled"
                    />
                  </a>
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
            theme.colorScheme === "dark" ? theme.colors.navy[7] : theme.colors.gray[2],
        },
        root: {
          header: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.navy[6] : theme.colors.gray[3],
            border: "none",
          },
          nav: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.navy[8] : theme.colors.gray[1],
            border: "none",
          },
        },
      })}
    >
      {children}
    </AppShell>
  )
}
