import { Avatar, Badge, Group, Menu, Text } from "@pokt-foundation/pocket-blocks"
import { Emoji } from "emoji-picker-react"
import React from "react"
import { LuPencil } from "react-icons/lu"
import ContextMenuTarget from "~/components/ContextMenuTarget"
import { PayPlanType, ProcessedEndpoint } from "~/models/portal/sdk"
import { Stripe } from "~/models/stripe/stripe.server"
import AppSubscription from "~/routes/account.$accountId.$appId/components/ApplicationSubscription"
import DeleteApplication from "~/routes/account.$accountId.$appId/components/DeleteApplication"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"
import { PLAN_NAME } from "~/utils/utils"

type ApplicationHeaderProps = {
  endpoint: ProcessedEndpoint
  subscription: Stripe.Subscription | undefined
}

const ApplicationHeader = ({ endpoint, subscription }: ApplicationHeaderProps) => {
  return (
    <Group position="apart">
      <Group spacing="sm">
        <Avatar color="dark" radius="xl" variant="outline">
          <Emoji size={14} unified={DEFAULT_APPMOJI} />
        </Avatar>
        <Text fw={600} fz="md">
          {endpoint.name}
        </Text>
        <Badge>{PLAN_NAME[endpoint.appLimits.planType] ?? "Legacy"}</Badge>
      </Group>

      <Menu>
        <ContextMenuTarget />
        <Menu.Dropdown>
          <Menu.Item icon={<LuPencil size={18} />}>Edit information</Menu.Item>
          {endpoint && (
            <AppSubscription endpoint={endpoint} subscription={subscription} />
          )}
          {endpoint && endpoint.appLimits.planType !== PayPlanType.PayAsYouGoV0 && (
            <DeleteApplication endpoint={endpoint} />
          )}
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}

export default ApplicationHeader
