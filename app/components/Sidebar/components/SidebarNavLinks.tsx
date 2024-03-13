import {
  CSSObject,
  Anchor,
  Box,
  Group,
  MantineTheme,
  Text,
  UnstyledButton,
} from "@mantine/core"
import { NavLink } from "@remix-run/react"
import { Emoji } from "emoji-picker-react"
import React from "react"
import { IconType } from "react-icons"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"

export type SidebarNavRoute = {
  to: string
  label: string
  icon?: IconType | string
  imgSrc?: string
  end?: boolean
  external?: boolean
}

export type LinkLabelProps = Pick<SidebarNavRoute, "icon" | "label" | "imgSrc">

type LabelIconProps = Pick<LinkLabelProps, "icon" | "imgSrc" | "label">

type SidebarButtonProps = LinkLabelProps & { onClick?: () => void }

const commonLinkStyles = (theme: MantineTheme): CSSObject => ({
  display: "block",
  width: "100%",
  padding: 8,
  borderRadius: theme.radius.sm,
  color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
  "&:hover": {
    backgroundColor:
      theme.colorScheme === "dark" ? "rgba(37,38,43,0.50)" : "rgba(250,250,250,0.50)",
    textDecoration: "none",
  },

  "&.active": {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
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
      <Box mx={1}>
        <Emoji size={16} unified={Icon !== "" ? Icon : DEFAULT_APPMOJI} />
      </Box>
    )
  }

  return Icon ? <Icon size={18} /> : null
}

const LinkLabel = ({ icon, label, imgSrc }: LinkLabelProps) => (
  <Group>
    <LabelIcon icon={icon} imgSrc={imgSrc} label={label} />
    <Text truncate w={190}>
      {label}
    </Text>
  </Group>
)

export const ExternalLink = ({ route }: { route: SidebarNavRoute }) => (
  <Anchor
    href={route.to}
    rel="noreferrer"
    sx={commonLinkStyles}
    target="_blank"
    variant="text"
  >
    <LinkLabel icon={route.icon} imgSrc={route.imgSrc} label={route.label} />
  </Anchor>
)

export const InternalLink = ({ route }: { route: SidebarNavRoute }) => (
  <Anchor
    component={NavLink}
    end={route.end}
    prefetch="intent"
    sx={commonLinkStyles}
    to={route.to}
  >
    <LinkLabel icon={route.icon} imgSrc={route.imgSrc} label={route.label} />
  </Anchor>
)

export const NavButton = ({ icon, label, ...rest }: SidebarButtonProps) => (
  <UnstyledButton fz="sm" sx={commonLinkStyles} {...rest}>
    <LinkLabel icon={icon} label={label} />
  </UnstyledButton>
)
