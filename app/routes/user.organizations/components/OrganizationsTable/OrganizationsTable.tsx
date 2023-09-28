import { ActionIcon, Group, Menu, Text } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import React from "react"
import { LuMoreHorizontal, LuArrowUpRight } from "react-icons/lu"
import { DataTable } from "~/components/DataTable"
import Identicon from "~/components/Identicon"
import { Account } from "~/models/portal/sdk"
import useCommonStyles from "~/styles/commonStyles"

type OrganizationsTableProps = { accounts: Account[] }

const OrganizationsTable = ({ accounts }: OrganizationsTableProps) => {
  const { classes: commonClasses } = useCommonStyles()

  return accounts.length > 0 ? (
    <DataTable
      columns={["Organization", "No. Members", "No. Applications", ""]}
      data={accounts.map((account) => {
        return {
          organization: {
            element: (
              <Group>
                <Identicon
                  alt={`${account.id} profile picture`}
                  seed={account.id}
                  type="account"
                />
                <Text size="sm" weight={500}>
                  {account.id}
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
                    <Menu.Item icon={<LuArrowUpRight size={18} />}>
                      <Link to={`/account/${account.id}`}>
                        <Text tt="capitalize">Go to organization</Text>
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

export default OrganizationsTable
