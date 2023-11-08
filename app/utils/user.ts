import { Account, RoleName, User } from "~/models/portal/sdk"

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
    ?.users.some(
      (u) => u.id === user.portalUserID && u.roleName === RoleName.Owner,
    ) as boolean

export default isUserAccountOwner
