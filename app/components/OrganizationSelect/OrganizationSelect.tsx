import { Group, Menu, Text, UnstyledButton } from "@pokt-foundation/pocket-blocks"
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
    <Identicon alt={`${account.id} profile picture`} username={account.id} />
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
  return (
    <Menu width={300}>
      <Menu.Target>
        {activeAccount && (
          <UnstyledButton>
            <OrganizationItem withIcon account={activeAccount} />
          </UnstyledButton>
        )}
      </Menu.Target>
      {accounts.length > 1 && (
        <Menu.Dropdown>
          {accounts
            .filter(({ id }) => id !== accountId)
            .map((accounts) => (
              <Menu.Item key={accounts.id} p={2}>
                <NavLink to={`/account/${accounts.id}`} onClick={onOrgSelect}>
                  <OrganizationItem account={accounts} />
                </NavLink>
              </Menu.Item>
            ))}
        </Menu.Dropdown>
      )}
    </Menu>
  )
}

export default OrganizationSelect
