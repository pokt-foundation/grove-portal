import { Group, Menu, Stack, Text, UnstyledButton } from "@pokt-foundation/pocket-blocks"
import { NavLink, useParams } from "@remix-run/react"
import React, { useMemo } from "react"
import { LuCheckCircle2, LuChevronsUpDown } from "react-icons/lu"
import Identicon from "~/components/Identicon"
import { Account } from "~/models/portal/sdk"
import { getPlanName } from "~/utils/planUtils"

type UserItemProps = {
  account: Account
  hasMultipleAccounts?: boolean
  iconOnly?: boolean
  selected?: boolean
}

type AccountSelectProps = {
  accounts: Account[]
  collapsed?: boolean
}

const AccountItem = ({
  account,
  hasMultipleAccounts,
  iconOnly,
  selected,
}: UserItemProps) => (
  <Group>
    <Identicon
      alt={`${account.id} profile picture`}
      seed={account.id}
      size={28}
      type="account"
    />
    {!iconOnly && (
      <>
        <Stack spacing={0}>
          <Text lh="17px" size={15} weight={500}>
            {account.name ? account.name : account.id}
          </Text>
          <Text size={11}>{`${getPlanName(account.planType)} · ${
            account?.accountUsers?.length ?? 1
          } member${account?.accountUsers?.length > 1 ? "s" : ""}`}</Text>
        </Stack>
        {hasMultipleAccounts && (
          <LuChevronsUpDown size={18} style={{ marginLeft: "auto", marginRight: 0 }} />
        )}
        {selected && (
          <LuCheckCircle2 size={18} style={{ marginLeft: "auto", marginRight: 0 }} />
        )}
      </>
    )}
  </Group>
)

const AccountSelect = ({ accounts, collapsed }: AccountSelectProps) => {
  const { accountId } = useParams()
  const hasMultipleAccounts = accounts.length > 1

  const activeAccount = useMemo(
    () => accounts.find(({ id }) => id === accountId),
    [accountId, accounts],
  )

  return (
    <Menu styles={{ dropdown: { minWidth: 300, marginLeft: 8 } }}>
      {activeAccount && (
        <Menu.Target>
          <UnstyledButton px={8} py={4} style={{ borderRadius: 4 }}>
            <AccountItem
              account={activeAccount}
              hasMultipleAccounts={hasMultipleAccounts}
              iconOnly={collapsed}
            />
          </UnstyledButton>
        </Menu.Target>
      )}
      {accounts && accounts?.length > 0 && (
        <Menu.Dropdown px={8} py="md">
          {accounts
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((account, index) => (
              <Menu.Item
                key={account.id}
                disabled={account.id === accountId}
                mb={index === accounts.length - 1 ? 0 : 8}
                p={2}
              >
                <NavLink to={`/account/${account.id}`}>
                  <AccountItem account={account} selected={account.id === accountId} />
                </NavLink>
              </Menu.Item>
            ))}
        </Menu.Dropdown>
      )}
    </Menu>
  )
}

export default AccountSelect
