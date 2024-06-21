import { ActionIcon, Indicator, useMantineTheme } from "@mantine/core"
import {
  IMessage,
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center"
import { useNavigate } from "@remix-run/react"
import { LuBell } from "react-icons/lu"
import { ColorScheme } from "~/root"
import { getRequiredClientEnvVar } from "~/utils/environment"

const NOVU_APP_IDENTIFIER = getRequiredClientEnvVar("NOVU_APP_IDENTIFIER")

type NovuNotificationPopoverProps = {
  subscriberId: string
  colorScheme: ColorScheme
}
export const NovuNotificationPopover = ({
  subscriberId,
  colorScheme,
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
            background: "var(--mantine-color-body)",
            border: "1px solid var(--app-shell-border-color)",
            boxShadow: "none",
          },
        },
        popover: {
          arrow: {
            display: "none",
          },
        },
        header: {
          title: {
            color: "var(--mantine-color-text)",
            fontSize: 18,
            fontWeight: 600,
          },
          markAsRead: {
            color: "var(--mantine-color-text)",
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
              color: "var(--mantine-color-text)",
            },
            timestamp: { color: theme.colors.gray[6] },
            ...(colorScheme === "dark"
              ? { read: { background: theme.colors.gray[9] } }
              : {}),
            unread: {
              ...(colorScheme === "dark" ? { background: theme.colors.dark[7] } : {}),
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
            background: "var(--mantine-color-body)",
            border: "1px solid var(--app-shell-border-color)",
          },
          item: {
            ...(colorScheme === "dark" ? { color: theme.colors.dark[0] } : {}),
            "&:hover": {
              backgroundColor: "var(--mantine-hover-color)",
            },
          },
        },
      }}
      subscriberId={subscriberId}
    >
      <PopoverNotificationCenter
        colorScheme={colorScheme}
        showUserPreferences={false}
        onNotificationClick={onNotificationClick}
      >
        {({ unseenCount }) => (
          <Indicator
            inline
            processing
            color="red"
            disabled={!unseenCount}
            offset={6}
            size={8}
          >
            <ActionIcon
              aria-label={`${
                unseenCount ? unseenCount : "No"
              } unseen notifications. Click to open notifications popover.`}
              color="dark"
              radius="xl"
              size={40}
              variant="outline"
            >
              <LuBell size={18} />
            </ActionIcon>
          </Indicator>
        )}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}

export default NovuNotificationPopover
