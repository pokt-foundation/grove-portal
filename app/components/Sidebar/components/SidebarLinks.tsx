import { CSSObject } from "@mantine/core"
import { Anchor, Group, MantineTheme, Text } from "@pokt-foundation/pocket-blocks"
import { NavLink } from "@remix-run/react"
import React from "react"
import { SidebarRoute } from "~/components/Sidebar"

export type LinkLabelProps = Pick<SidebarRoute, "icon" | "label">

const commonLinkStyles = (theme: MantineTheme): CSSObject => ({
  display: "block",
  width: "100%",
  padding: theme.spacing.xs,
  borderRadius: theme.radius.sm,
  color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

  "&:hover": {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    textDecoration: "none",
  },

  "&.active": {
    color: theme.colors[theme.primaryColor][6],
    fontWeight: 600,
  },
})

const LinkLabel = ({ icon: Icon, label }: LinkLabelProps) => {
  const isEmoji = typeof Icon === "string"
  return (
    <Group>
      {/* @ts-ignore eslint-disable-next-line */}
      {isEmoji ? <span> {Icon} </span> : <Icon width={22} />}
      <span>{label}</span>
    </Group>
  )
}

export const ExternalLink = ({ route }: { route: SidebarRoute }) => (
  <Anchor
    href={route.to}
    rel="noreferrer"
    sx={commonLinkStyles}
    target="_blank"
    variant="text"
  >
    <LinkLabel icon={route.icon} label={route.label} />
  </Anchor>
)

export const AppLink = ({ route }: { route: SidebarRoute }) => (
  <Anchor
    component={NavLink}
    end={route.end}
    prefetch="intent"
    sx={commonLinkStyles}
    to={route.to}
  >
    <LinkLabel icon={route.icon} label={route.label} />
  </Anchor>
)
