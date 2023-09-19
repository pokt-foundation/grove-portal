import {
  Group,
  MantineTheme,
  Menu,
  Text,
  UnstyledButton,
} from "@pokt-foundation/pocket-blocks"
import { NavLink, useParams } from "@remix-run/react"
import React from "react"
import { LuChevronsUpDown } from "react-icons/lu"
import Identicon from "~/components/Identicon"
import { Account } from "~/models/portal/sdk"

type UserItemProps = {
  account: Account
  withIcon?: boolean
}

type OrganizationSelectProps = {
  accounts: Account[]
  onOrgSelect: () => void
}

const OrganizationItem = ({ account, withIcon }: UserItemProps) => (
  <Group>
    <Identicon alt={`${account.id} profile picture`} seed={account.id} size="sm" type="account" />
    <Text size="sm" weight={500}>
      {account.id}
    </Text>
    {withIcon && (
      <LuChevronsUpDown size={18} style={{ marginLeft: "auto", marginRight: 7 }} />
    )}
  </Group>
)

const OrganizationSelect = ({ accounts, onOrgSelect }: OrganizationSelectProps) => {
  const { accountId } = useParams()
  const activeAccount = accounts.find(({ id }) => id === accountId)
  const hasMultipleAccounts = accounts.length > 1

  return (
    <Menu styles={{ dropdown: { minWidth: 165 } }}>
      <Menu.Target>
        {activeAccount && (
          <UnstyledButton
            mr="md"
            px={8}
            py={4}
            sx={(theme: MantineTheme) => ({
              borderRadius: 4,
              ...(hasMultipleAccounts && {
                border: `1px solid ${
                  theme.colorScheme === "dark"
                    ? theme.colors.gray[8]
                    : theme.colors.gray[3]
                }`,
              }),
            })}
          >
            <OrganizationItem account={activeAccount} withIcon={hasMultipleAccounts} />
          </UnstyledButton>
        )}
      </Menu.Target>
      {accounts.length > 1 && (
        <Menu.Dropdown>
          {accounts
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((account) => (
              <Menu.Item key={account.id} disabled={account.id === accountId} p={2}>
                <NavLink to={`/account/${account.id}`} onClick={onOrgSelect}>
                  <OrganizationItem account={account} />
                </NavLink>
              </Menu.Item>
            ))}
        </Menu.Dropdown>
      )}
    </Menu>
  )
}

export default OrganizationSelect
