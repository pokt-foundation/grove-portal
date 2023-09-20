import { Text, MantineTheme } from "@pokt-foundation/pocket-blocks"
import React from "react"
import { PortalApp, User } from "~/models/portal/sdk"
import { getAppAcceptedValue } from "~/utils/applicationUtils"

type InvitedAppRoleProps = { app: PortalApp; user: User }

const InvitedAppAcceptedLabel = ({ app, user }: InvitedAppRoleProps) => {
  const accepted = getAppAcceptedValue(app, user.portalUserID)
  return (
    <Text>
      <Text
        sx={(theme: MantineTheme) => ({
          color: accepted ? theme.colors.green[6] : theme.colors.yellow[7],
        })}
      >
        {accepted ? "Accepted" : "Pending"}
      </Text>
    </Text>
  )
}

export default InvitedAppAcceptedLabel
