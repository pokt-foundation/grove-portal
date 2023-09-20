import { Divider, Indicator, NavLinkProps } from "@mantine/core"
import {
  Drawer,
  Stack,
  Text,
  UnstyledButton,
  NavLink,
  Group,
} from "@pokt-foundation/pocket-blocks"
import { Link, LinkProps, useFetcher } from "@remix-run/react"
import React, { useState } from "react"
import {
  LuBook,
  LuDiamond,
  LuLeaf,
  LuLifeBuoy,
  LuSmile,
  LuTowerControl,
  LuUser2,
} from "react-icons/lu"
import { RiDiscordLine } from "react-icons/ri"
import Identicon from "~/components/Identicon"
import { User } from "~/models/portal/sdk"

type OrganizationDrawerProps = {
  user?: User
  hasNewInvites: boolean
}

type DrawerLinkProps = NavLinkProps &
  LinkProps & {
    external?: boolean
    setIsDrawerOpen: (isOpen: boolean) => void
  }

const DrawerLink = ({ setIsDrawerOpen, external, ...props }: DrawerLinkProps) => {
  const externalProps = external ? { rel: "noreferrer", target: "_blank" } : {}
  return (
    <NavLink
      component={Link}
      p={8}
      prefetch="intent"
      {...props}
      {...externalProps}
      onClick={() => setIsDrawerOpen(false)}
    />
  )
}

const drawerExternalLinks = [
  {
    label: "Documentation",
    to: "https://docs.portal.pokt.network/",
    icon: <LuBook size={18} />,
  },
  {
    label: "Support",
    to: "https://discord.gg/portal-rpc",
    icon: <LuLifeBuoy size={18} />,
  },
  {
    label: "Feedback",
    to: "https://discord.gg/portal-rpc",
    icon: <LuSmile size={18} />,
    withDivider: true,
  },
  { label: "About Grove", to: "https://grove.city/", icon: <LuLeaf size={18} /> },
  {
    label: "Join the conversation",
    to: "https://discord.gg/portal-rpc",
    icon: <RiDiscordLine size={18} />,
    withDivider: true,
  },
]

const OrganizationDrawer = ({ user, hasNewInvites }: OrganizationDrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const logoutFetcher = useFetcher()

  const logout = () => {
    setIsDrawerOpen(false)
    logoutFetcher.submit(
      {
        logout: "true",
      },
      {
        method: "post",
        action: "/api/auth/auth0",
      },
    )
  }

  return user ? (
    <>
      <Drawer
        opened={isDrawerOpen}
        overlayColor="#000000"
        overlayOpacity={0.5}
        padding="sm"
        position="right"
        sx={{
          ".mantine-Drawer-header": {
            display: "flex",
            alignItems: "center",
          },
        }}
        title={
          <Group noWrap pt={4} w={252}>
            <Identicon
              avatar
              alt={`${user.portalUserID ?? "user"} profile picture`}
              seed={user.portalUserID ?? "user default"}
              type="user"
            />
            <Text truncate fz={12}>
              {user?.email}
            </Text>
          </Group>
        }
        onClose={() => setIsDrawerOpen(false)}
      >
        <Stack spacing={0}>
          <DrawerLink
            icon={<LuUser2 size={18} />}
            label="My Profile"
            setIsDrawerOpen={setIsDrawerOpen}
            to="/user/profile"
          />
          <DrawerLink
            icon={<LuTowerControl size={18} />}
            label="My Organizations"
            setIsDrawerOpen={setIsDrawerOpen}
            to={`/user/organizations`}
          />
          <Indicator
            inline
            disabled={!hasNewInvites}
            label="New"
            offset={25}
            position="middle-end"
            processing={true}
            size={16}
          >
            <DrawerLink
              icon={<LuDiamond size={18} />}
              label="Invited Apps"
              setIsDrawerOpen={setIsDrawerOpen}
              to={`/user/invited-apps`}
            />
          </Indicator>
          <Divider my={8} />
          {drawerExternalLinks.map(({ label, to, icon, withDivider }, index) => (
            <>
              <DrawerLink
                key={`${label}-${index}`}
                external
                icon={icon}
                label={label}
                setIsDrawerOpen={setIsDrawerOpen}
                to={to}
              />
              {withDivider && <Divider my={8} />}
            </>
          ))}
          <NavLink label="Sign out" p={8} onClick={logout} />
        </Stack>
      </Drawer>
      <UnstyledButton onClick={() => setIsDrawerOpen(true)}>
        <Indicator
          dot
          inline
          processing
          color="red"
          disabled={!hasNewInvites}
          offset={6}
          size={8}
        >
          <Identicon
            avatar
            alt={`${user.portalUserID ?? "user"} profile picture`}
            seed={user.portalUserID ?? "user default"}
            type="user"
          />
        </Indicator>
      </UnstyledButton>
    </>
  ) : null
}

export default OrganizationDrawer