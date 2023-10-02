import { Indicator } from "@mantine/core"
import { ActionIcon, Group, Menu, Text, Tooltip } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { useMemo } from "react"
import { LuMoreHorizontal, LuArrowUpRight, LuPencil, LuCrown } from "react-icons/lu"
import { DataTable } from "~/components/DataTable"
import Identicon from "~/components/Identicon"
import { Account, User } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"
import isUserAccountOwner from "~/utils/user"

type AccountsTableProps = { accounts: Account[]; user: User }

const AccountsTable = ({ accounts, user }: AccountsTableProps) => {
  const { classes: commonClasses } = useCommonStyles()

  const sortedAccounts = useMemo(() => {
    const ownedAccount = accounts.find((account) =>
      account.users.find((u) => u.userID === user.portalUserID && u.owner),
    )
    const filteredAccounts = accounts.filter(({ id }) => id !== ownedAccount?.id)
    return [
      ownedAccount,
      ...filteredAccounts.sort((a, b) => (a.id > b.id ? 1 : -1)),
    ] as Account[]
  }, [accounts, user.portalUserID])

  return sortedAccounts.length > 0 ? (
    <DataTable
      columns={["Account", "No. Members", "No. Applications", ""]}
      data={sortedAccounts.map((account) => {
        const isAccountOwner = isUserAccountOwner({
          accounts,
          accountId: account.id,
          user,
        })
        return {
          account: {
            element: (
              <Group>
                <Tooltip disabled={!isAccountOwner} label="You are the account owner">
                  <Indicator disabled={!isAccountOwner} label={<LuCrown />} size={16}>
                    <Identicon
                      alt={`${account.id} profile picture`}
                      seed={account.id}
                      type="account"
                    />
                  </Indicator>
                </Tooltip>
                <Text size="sm" weight={500}>
                  {account.name ? account.name : account.id}
                </Text>
              </Group>
            ),
          },
          members: {
            element: (
              <Text>
                {account?.users?.length} Member
                {account?.users?.length > 1 ? "s" : ""}
              </Text>
            ),
          },
          applications: {
            element: (
              <Text>
                {account?.portalApps?.length} Application
                {account?.portalApps && account?.portalApps?.length > 1 ? "s" : ""}
              </Text>
            ),
          },
          action: {
            element: (
              <Group position="right" spacing="md">
                <Menu>
                  <Menu.Target>
                    <ActionIcon
                      className={commonClasses.grayOutlinedButton}
                      radius="xl"
                      size={40}
                      variant="outline"
                    >
                      <LuMoreHorizontal />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {isAccountOwner && (
                      <Menu.Item icon={<LuPencil size={18} />}>
                        <Link to={`/account/${account.id}/update`}>
                          <Text tt="capitalize">Change name</Text>
                        </Link>
                      </Menu.Item>
                    )}
                    <Menu.Item icon={<LuArrowUpRight size={18} />}>
                      <Link to={`/account/${account.id}`}>
                        <Text tt="capitalize">Go to account</Text>
                      </Link>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            ),
          },
        }
      })}
      paginate={false}
    />
  ) : null
}

export default AccountsTable
