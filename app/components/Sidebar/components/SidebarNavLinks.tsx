import { CSSObject } from "@mantine/core"
import {
  Anchor,
  Flex,
  Group,
  MantineTheme,
  Text,
  UnstyledButton,
} from "@pokt-foundation/pocket-blocks"
import { NavLink } from "@remix-run/react"
import React from "react"
import { IconType } from "react-icons/lib/cjs/iconBase"
import Tooltip from "~/components/Tooltip"

export type SidebarNavRoute = {
  to: string
  label: string
  icon: IconType | string
  end?: boolean
  badge?: string
}

export type LinkLabelProps = Pick<SidebarNavRoute, "icon" | "label"> & {
  iconOnly?: boolean
}

type SidebarButtonProps = LinkLabelProps & { onClick?: () => void }

const commonLinkStyles = (theme: MantineTheme): CSSObject => ({
  display: "block",
  width: "100%",
  padding: theme.spacing.xs,
  borderRadius: theme.radius.sm,
  color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
  fontSize: "14px",
  "&:hover": {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    textDecoration: "none",
  },

  "&.active": {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    fontWeight: 600,
  },
})

const LinkLabel = ({ icon: Icon, label, iconOnly }: LinkLabelProps) => {
  const isEmoji = typeof Icon === "string"
  return (
    <Flex sx={{ justifyContent: iconOnly ? "center" : "flex-start" }}>
      <Tooltip
        withArrow
        withinPortal
        disabled={!iconOnly}
        label={label}
        offset={35}
        position="right"
      >
        <Group>
          {isEmoji ? (
            <Text span fz="md" m={0} ta="center">
              {Icon}
            </Text>
          ) : (
            <Icon size={18} />
          )}
          {!iconOnly && <span>{label}</span>}
        </Group>
      </Tooltip>
    </Flex>
  )
}

export const ExternalLink = ({
  route,
  iconOnly,
}: {
  route: SidebarNavRoute
  iconOnly?: boolean
}) => (
  <Anchor
    href={route.to}
    rel="noreferrer"
    sx={commonLinkStyles}
    target="_blank"
    variant="text"
  >
    <LinkLabel icon={route.icon} iconOnly={iconOnly} label={route.label} />
  </Anchor>
)

export const AppLink = ({
  route,
  iconOnly,
}: {
  route: SidebarNavRoute
  iconOnly?: boolean
}) => (
  <Anchor
    component={NavLink}
    end={route.end}
    prefetch="intent"
    sx={commonLinkStyles}
    to={route.to}
  >
    <LinkLabel icon={route.icon} iconOnly={iconOnly} label={route.label} />
  </Anchor>
)

export const NavButton = ({ icon, label, iconOnly, ...rest }: SidebarButtonProps) => (
  <UnstyledButton sx={commonLinkStyles} {...rest}>
    <LinkLabel icon={icon} iconOnly={iconOnly} label={label} />
  </UnstyledButton>
)
