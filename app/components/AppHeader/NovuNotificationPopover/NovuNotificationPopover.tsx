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
        layout: {
          root: {
            background: theme.colors.dark[9],
            border: `1px solid ${theme.colors.dark[4]}`,
            boxShadow: "none",
          },
        },
        header: {
          title: {
            color: theme.colors.dark[0],
            fontSize: 18,
            fontWeight: 600,
          },
          markAsRead: {
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
            timestamp: { color: theme.colors.gray[6] },
            read: { background: theme.colors.gray[9] },
            unread: {
              background: theme.colors.dark[7],
              "::before": {
                background:
                  "linear-gradient(0deg, rgba(56,159,88,1) 20%, rgba(70,189,107,1) 80%)",
                borderRadius: "8px",
                left: "4px",
                top: "6px",
                bottom: "6px",
              },
            },
          },
        },
        actionsMenu: {
          dropdown: {
            background: theme.colors.dark[9],
            border: `1px solid ${theme.colors.dark[4]}`,
          },
          item: {
            color: theme.colors.dark[0],
            "&:hover": {
              backgroundColor: "rgba(37,38,43,0.50)",
            },
          },
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
              <LuBell color={theme.colors.dark[0]} size={20} />
            </ActionIcon>
          </Indicator>
        )}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}

export default NovuNotificationPopover
