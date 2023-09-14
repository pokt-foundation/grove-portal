import { Avatar, Badge, Group, Menu, Text } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { Emoji } from "emoji-picker-react"
import React from "react"
import { LuPencil } from "react-icons/lu"
import Stripe from "stripe"
import ContextMenuTarget from "~/components/ContextMenuTarget"
import { PayPlanType, PortalApp } from "~/models/portal/sdk"
import AppSubscription from "~/routes/account.$accountId.$appId/components/ApplicationSubscription"
import DeleteApplication from "~/routes/account.$accountId.$appId/components/DeleteApplication"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"
import { PLAN_NAME } from "~/utils/utils"

type ApplicationHeaderProps = {
  app: PortalApp
  subscription: Stripe.Subscription | undefined
}

const ApplicationHeader = ({ app, subscription }: ApplicationHeaderProps) => {
  console.log({ app, subscription })
  return (
    <Group position="apart">
      <Group spacing="sm">
        <Avatar color="dark" radius="xl" variant="outline">
          <Emoji
            size={14}
            unified={app.appEmoji !== "" ? app.appEmoji : DEFAULT_APPMOJI}
          />
        </Avatar>
        <Text fw={600} fz="md">
          {app.name}
        </Text>
        <Badge>{PLAN_NAME[app.legacyFields.planType] ?? "Legacy"}</Badge>
      </Group>

      <Menu>
        <ContextMenuTarget />
        <Menu.Dropdown>
          {app && <AppSubscription app={app} subscription={subscription} />}
          <Menu.Item component={Link} icon={<LuPencil size={18} />} to={`update`}>
            Edit information
          </Menu.Item>
          {app && app.legacyFields.planType !== PayPlanType.PayAsYouGoV0 && (
            <DeleteApplication app={app} />
          )}
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}

export default ApplicationHeader
