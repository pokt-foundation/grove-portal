import { Group, Menu, Text, UnstyledButton } from "@pokt-foundation/pocket-blocks"
import React, { forwardRef } from "react"
import { LuChevronsUpDown } from "react-icons/lu"
import { Auth0Profile } from "remix-auth-auth0"
import Identicon from "~/components/Identicon"

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  user: Auth0Profile
  withIcon?: boolean
}

type OrganizationSelectProps = {
  user: Auth0Profile
}

const OrganizationButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ user, withIcon, ...rest }: UserButtonProps, ref) => (
    <UnstyledButton ref={ref} py={5} {...rest}>
      <Group>
        <Identicon
          alt={`${user.displayName ?? "user"} profile picture`}
          username={user.id ?? "user default"}
        />

        <Text size="sm" weight={500}>
          {user.displayName}
        </Text>

        {withIcon && (
          <LuChevronsUpDown size={18} style={{ marginLeft: "auto", marginRight: 7 }} />
        )}
      </Group>
    </UnstyledButton>
  ),
)

const OrganizationSelect = ({ user }: OrganizationSelectProps) => {
  return (
    <Menu>
      <Menu.Target>
        <OrganizationButton withIcon user={user} />
      </Menu.Target>
      {/* TODO: Add organizations */}
      {/*{organizations.length > 1 && (*/}
      {/*  <Menu.Dropdown>*/}
      {/*    {organizations.map((organization) => (*/}
      {/*      <Menu.Item key={organization.someId}>*/}
      {/*        <OrganizationButton user={organization.user} />*/}
      {/*      </Menu.Item>*/}
      {/*    ))}*/}
      {/*  </Menu.Dropdown>*/}
      {/*)}*/}
    </Menu>
  )
}

export default OrganizationSelect
