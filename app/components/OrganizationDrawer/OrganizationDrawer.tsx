import { Divider, NavLinkProps } from "@mantine/core"
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
import { LuBook, LuLeaf, LuLifeBuoy, LuSmile, LuUser2 } from "react-icons/lu"
import { RiDiscordLine } from "react-icons/ri"
import { Auth0Profile } from "remix-auth-auth0"
import Identicon from "~/components/Identicon"
import OrganizationSelect from "~/components/OrganizationSelect"
import { Account } from "~/models/portal/sdk"

type OrganizationDrawerProps = {
  user?: Auth0Profile
  accounts: Account[]
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

const OrganizationDrawer = ({ user, accounts }: OrganizationDrawerProps) => {
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
          <Group noWrap w={252}>
            <Identicon
              alt={`${user.displayName ?? "user"} profile picture`}
              username={user.id ?? "user default"}
            />
            <Text truncate fz={12} td="underline">
              {user?.displayName}
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
          <Divider my={8} />
          {user && (
            <>
              <OrganizationSelect
                accounts={accounts}
                onOrgSelect={() => setIsDrawerOpen(false)}
              />
              <Divider my={8} />
            </>
          )}
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
        <Identicon
          alt={`${user.name ?? "user"} profile picture`}
          username={user.id ?? "user default"}
        />
      </UnstyledButton>
    </>
  ) : null
}

export default OrganizationDrawer
