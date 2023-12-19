import { Indicator } from "@mantine/core"
import {
  IMessage,
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center"
import { ActionIcon, useMantineTheme } from "@pokt-foundation/pocket-blocks"
import { useNavigate } from "@remix-run/react"
import { LuBell } from "react-icons/lu"
import { getRequiredClientEnvVar } from "~/utils/environment"

const NOVU_APP_IDENTIFIER = getRequiredClientEnvVar("NOVU_APP_IDENTIFIER")

type NovuNotificationPopoverProps = {
  subscriberId: string
}
export const NovuNotificationPopover = ({
  subscriberId,
}: NovuNotificationPopoverProps) => {
  const navigate = useNavigate()
  const theme = useMantineTheme()

  const onNotificationClick = (message: IMessage) => {
    const { payload } = message
    const redirectUrl = payload.redirectTo
    redirectUrl && navigate(redirectUrl)
  }

  return (
    <NovuProvider
      applicationIdentifier={NOVU_APP_IDENTIFIER}
      initialFetchingStrategy={{
        fetchNotifications: true,
        fetchUserPreferences: true,
      }}
      styles={{
        header: {
          title: {
            color: theme.colors.dark[0],
          },
        },
        loader: {
          root: {
            stroke: theme.colors.green[6],
          },
        },
        unseenBadge: {
          root: {
            background:
              "linear-gradient(0deg, rgba(56,159,88,1) 20%, rgba(70,189,107,1) 80%)",
          },
        },
        notifications: {
          listItem: {
            contentLayout: {
              color: theme.colors.dark[0],
            },
            unread: {
              "::before": {
                background:
                  "linear-gradient(0deg, rgba(56,159,88,1) 20%, rgba(70,189,107,1) 80%)",
              },
            },
          },
        },
        actionsMenu: {
          item: { color: theme.colors.dark[0] },
        },
      }}
      subscriberId={subscriberId}
    >
      <PopoverNotificationCenter
        colorScheme="dark"
        showUserPreferences={false}
        onNotificationClick={onNotificationClick}
      >
        {({ unseenCount }) => (
          <Indicator
            dot
            inline
            processing
            color="red"
            disabled={!unseenCount}
            offset={6}
            size={8}
          >
            <ActionIcon radius="xl">
              <LuBell color={theme.colors.dark[0]} size={24} />
            </ActionIcon>
          </Indicator>
        )}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}

export default NovuNotificationPopover
