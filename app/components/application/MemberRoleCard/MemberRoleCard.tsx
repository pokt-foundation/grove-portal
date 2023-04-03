import { Group, Text } from "@pokt-foundation/pocket-blocks"
import Card from "../../shared/Card"
import styles from "./styles.css"
import { RoleName } from "~/models/portal/sdk"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type MemberRoleProps = {
  role: RoleName
}

const MemberRole = ({ role }: MemberRoleProps) => {
  return (
    <Card>
      <Group position="apart">
        <Text m={0}>Role</Text>
        <Text
          m={0}
          sx={{
            textTransform: "lowercase",
            "&::first-letter": {
              textTransform: "uppercase",
            },
          }}
        >
          {role}
        </Text>
      </Group>
    </Card>
  )
}

export default MemberRole
