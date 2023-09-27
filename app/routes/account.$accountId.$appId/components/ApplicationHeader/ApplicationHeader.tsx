import { Avatar, Badge, Box, Group, Menu, Text } from "@pokt-foundation/pocket-blocks"
import { Link } from "@remix-run/react"
import { Emoji } from "emoji-picker-react"
import React from "react"
import { LuPencil } from "react-icons/lu"
import ApplicationSubscription from "../ApplicationSubscription"
import ContextMenuTarget from "~/components/ContextMenuTarget"
import { PayPlanType, PortalApp } from "~/models/portal/sdk"
import DeleteApplication from "~/routes/account.$accountId.$appId/components/DeleteApplication"
import { DEFAULT_APPMOJI } from "~/routes/account_.$accountId.create/components/AppmojiPicker"
import { getPlanName } from "~/utils/planUtils"

type ApplicationHeaderProps = {
  app: PortalApp
}

const ApplicationHeader = ({ app }: ApplicationHeaderProps) => {
  return (
    <Group position="apart">
      <Group spacing="sm">
        <Avatar size="lg">
          <Emoji
            size={32}
            unified={app.appEmoji !== "" ? app.appEmoji : DEFAULT_APPMOJI}
          />
        </Avatar>
        <Box>
          <Text fw={600} fz={24}>
            {app.name}
          </Text>
          <Group spacing={8}>
            <Text mr={12}>{getPlanName(app.legacyFields.planType)}</Text>
            <Text>App ID</Text>
            <Badge px={6} radius="sm">
              {app.id}
            </Badge>
          </Group>
        </Box>
      </Group>

      <Menu>
        <ContextMenuTarget />
        <Menu.Dropdown>
          {app && <ApplicationSubscription app={app} />}
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
