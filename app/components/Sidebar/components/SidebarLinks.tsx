import { CSSObject } from "@mantine/core"
import {
  Anchor,
  Group,
  MantineTheme,
  Text,
  Tooltip,
  UnstyledButton,
} from "@pokt-foundation/pocket-blocks"
import { IconProps } from "@pokt-foundation/pocket-blocks/dist/src/package/icon/types"
import { NavLink } from "@remix-run/react"
import React, { FC } from "react"

export type SidebarRoute = {
  to: string
  label: string
  icon: FC<IconProps> | string
  end?: boolean
  badge?: string
}

export type LinkLabelProps = Pick<SidebarRoute, "icon" | "label"> & { iconOnly?: boolean }

type SidebarButtonProps = LinkLabelProps & { onClick?: () => void }

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
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    fontWeight: 600,
  },
})

const LinkLabel = ({ icon: Icon, label, iconOnly }: LinkLabelProps) => {
  const isEmoji = typeof Icon === "string"
  return (
    <Tooltip withinPortal disabled={!iconOnly} label={label} position="right">
      <Group>
        {/* @ts-ignore eslint-disable-next-line */}
        {isEmoji ? (
          <Text span fz="20px" m={0} ta="center">
            {Icon}
          </Text>
        ) : (
          <Icon width={22} />
        )}
        {!iconOnly && <span>{label}</span>}
      </Group>
    </Tooltip>
  )
}

export const ExternalLink = ({
  route,
  iconOnly,
}: {
  route: SidebarRoute
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
  route: SidebarRoute
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

export const SidebarButton = ({ icon, label, iconOnly, ...rest }: SidebarButtonProps) => (
  <UnstyledButton sx={commonLinkStyles} {...rest}>
    <LinkLabel icon={icon} iconOnly={iconOnly} label={label} />
  </UnstyledButton>
)
