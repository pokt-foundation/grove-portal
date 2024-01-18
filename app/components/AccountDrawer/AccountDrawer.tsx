import { Divider, NavLinkProps } from "@mantine/core"
import {
  Drawer,
  Stack,
  Text,
  UnstyledButton,
  NavLink,
  Group,
  MantineTheme,
} from "@pokt-foundation/pocket-blocks"
import { Link, LinkProps, useFetcher } from "@remix-run/react"
import React, { useState } from "react"
import {
  LuBookOpen,
  LuLeaf,
  LuLifeBuoy,
  LuSmile,
  LuTowerControl,
  LuUser2,
} from "react-icons/lu"
import { RiDiscordLine } from "react-icons/ri"
import Identicon from "~/components/Identicon"
import { User } from "~/models/portal/sdk"
import { DISCORD_PATH, DOCS_PATH } from "~/utils/utils"

type AccountDrawerProps = {
  user?: User
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
      label={props.label}
      p={8}
      prefetch="intent"
      {...props}
      {...externalProps}
      sx={(theme: MantineTheme) => ({
        borderRadius: theme.radius.sm,
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? "rgba(37,38,43,0.50)"
              : "rgba(250,250,250,0.50)",
          textDecoration: "none",
        },

        "&.active": {
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
        },
      })}
      onClick={() => setIsDrawerOpen(false)}
    />
  )
}

const drawerExternalLinks = [
  {
    label: "Documentation",
    to: DOCS_PATH,
    icon: <LuBookOpen size={18} />,
  },
  {
    label: "Support",
    to: DISCORD_PATH,
    icon: <LuLifeBuoy size={18} />,
  },
  {
    label: "Feedback",
    to: DISCORD_PATH,
    icon: <LuSmile size={18} />,
    withDivider: true,
  },
  { label: "About Grove", to: "https://grove.city/", icon: <LuLeaf size={18} /> },
  {
    label: "Join the conversation",
    to: DISCORD_PATH,
    icon: <RiDiscordLine size={18} />,
    withDivider: true,
  },
]

const AccountDrawer = ({ user }: AccountDrawerProps) => {
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
            to="/user"
          />
          <DrawerLink
            icon={<LuTowerControl size={18} />}
            label="My Accounts"
            setIsDrawerOpen={setIsDrawerOpen}
            to={`/user/accounts`}
          />
          <Divider my={8} />
          {drawerExternalLinks.map(({ label, to, icon, withDivider }, index) => (
            <React.Fragment key={`${label}-${index}`}>
              <DrawerLink
                external
                icon={icon}
                label={label}
                setIsDrawerOpen={setIsDrawerOpen}
                to={to}
              />
              {withDivider && <Divider my={8} />}
            </React.Fragment>
          ))}
          <NavLink label="Sign out" p={8} onClick={logout} />
        </Stack>
      </Drawer>
      <UnstyledButton onClick={() => setIsDrawerOpen(true)}>
        <Identicon
          avatar
          alt={`${user.portalUserID ?? "user"} profile picture`}
          seed={user.portalUserID ?? "user default"}
          type="user"
        />
      </UnstyledButton>
    </>
  ) : null
}

export default AccountDrawer
