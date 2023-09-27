import { CSSObject } from "@mantine/core"
import {
  Anchor,
  Box,
  Flex,
  Group,
  MantineTheme,
  Text,
  UnstyledButton,
  Tooltip,
} from "@pokt-foundation/pocket-blocks"
import { NavLink } from "@remix-run/react"
import { Emoji } from "emoji-picker-react"
import React from "react"
import { IconType } from "react-icons/lib/cjs/iconBase"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"

export type SidebarNavRoute = {
  to: string
  label: string
  icon?: IconType | string
  imgSrc?: string
  end?: boolean
  badge?: string
}

export type LinkLabelProps = Pick<SidebarNavRoute, "icon" | "label" | "imgSrc"> & {
  iconOnly?: boolean
}

type LabelIconProps = Pick<LinkLabelProps, "icon" | "imgSrc" | "label">

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
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
    fontWeight: 600,
  },
})

const LabelIcon = ({ icon: Icon, imgSrc, label }: LabelIconProps) => {
  const isEmoji = typeof Icon === "string"

  if (imgSrc) {
    return (
      <img
        alt={`icon for ${label}`}
        loading="lazy"
        src={imgSrc}
        style={{ height: "18px", objectFit: "contain" }}
      ></img>
    )
  }

  if (isEmoji) {
    return (
      <Box ml={2}>
        <Emoji size={14} unified={Icon !== "" ? Icon : DEFAULT_APPMOJI} />
      </Box>
    )
  }

  return Icon ? <Icon size={18} /> : null
}

const LinkLabel = ({ icon, label, iconOnly, imgSrc }: LinkLabelProps) => {
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
          <LabelIcon icon={icon} imgSrc={imgSrc} label={label} />
          {!iconOnly && <Text>{label}</Text>}
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
    <LinkLabel
      icon={route.icon}
      iconOnly={iconOnly}
      imgSrc={route.imgSrc}
      label={route.label}
    />
  </Anchor>
)

export const InternalLink = ({
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
    <LinkLabel
      icon={route.icon}
      iconOnly={iconOnly}
      imgSrc={route.imgSrc}
      label={route.label}
    />
  </Anchor>
)

export const NavButton = ({ icon, label, iconOnly, ...rest }: SidebarButtonProps) => (
  <UnstyledButton fz="sm" sx={commonLinkStyles} {...rest}>
    <LinkLabel icon={icon} iconOnly={iconOnly} label={label} />
  </UnstyledButton>
)
