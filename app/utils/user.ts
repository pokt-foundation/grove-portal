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
    ?.users.some((u) => u.userID === user.portalUserID && u.owner) as boolean

export default isUserAccountOwner
