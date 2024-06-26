import {
  Divider,
  Drawer,
  Group,
  NavLink,
  NavLinkProps,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core"
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
import classes from "./AccountDrawer.module.css"
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
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <NavLink
      aria-label={String(props.label)}
      component={Link}
      label={props.label}
      p={8}
      prefetch="intent"
      {...props}
      {...externalProps}
      className={classes.drawerLink}
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
        padding="sm"
        position="right"
        title={
          <Group pt={4} w={252} wrap="nowrap">
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
        <Stack gap={0}>
          <DrawerLink
            label="My Profile"
            leftSection={<LuUser2 size={18} />}
            setIsDrawerOpen={setIsDrawerOpen}
            to="/user"
          />
          <DrawerLink
            label="My Accounts"
            leftSection={<LuTowerControl size={18} />}
            setIsDrawerOpen={setIsDrawerOpen}
            to={`/user/accounts`}
          />
          <Divider my={8} />
          {drawerExternalLinks.map(({ label, to, icon, withDivider }, index) => (
            <React.Fragment key={`${label}-${index}`}>
              <DrawerLink
                external
                label={label}
                leftSection={icon}
                setIsDrawerOpen={setIsDrawerOpen}
                to={to}
              />
              {withDivider && <Divider my={8} />}
            </React.Fragment>
          ))}
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <NavLink
            aria-label="Sign out"
            className={classes.drawerLink}
            label="Sign out"
            p={8}
            onClick={logout}
          />
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
