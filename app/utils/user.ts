import { Account, User } from "~/models/portal/sdk"

const isUserAccountOwner = ({
  accounts,
  accountId,
  user,
}: {
  accounts: Account[]
  accountId: string
  user: User
}) =>
  accounts
    .find(({ id }) => accountId === id)
    ?.accountUsers.some(
      (u) => u.accountUserID === user.portalUserID && u.owner,
    ) as boolean

export default isUserAccountOwner
