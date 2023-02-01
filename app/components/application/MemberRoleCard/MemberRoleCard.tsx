import Card from "../../shared/Card"
import Text from "../../shared/Text"
import styles from "./styles.css"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

type MemberRoleProps = {
  role: "Owner" | "Admin" | "Member"
}

const MemberRole = ({ role }: MemberRoleProps) => {
  return (
    <Card>
      <div className="member-role">
        <Text>Role</Text>
        <Text>{role}</Text>
      </div>
    </Card>
  )
}

export default MemberRole
