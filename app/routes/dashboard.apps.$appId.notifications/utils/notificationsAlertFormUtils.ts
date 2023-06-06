import { MantineTheme } from "@mantine/core"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"

export type NotificationLevel = "quarter" | "half" | "threeQuarters" | "full"

export const NOTIFICATIONS_ALERT_LEVELS: NotificationLevel[] = [
  "quarter",
  "half",
  "threeQuarters",
  "full",
]

export const DEFAULT_ALERT_PERCENTAGES: Record<NotificationLevel, boolean> = {
  quarter: false,
  half: false,
  threeQuarters: true,
  full: true,
}

export const ALERT_USAGE_PERCENTAGES: Record<NotificationLevel, string> = {
  quarter: "25%",
  half: "50%",
  threeQuarters: "75%",
  full: "100%",
}

export function getBackgroundColor(usageLevel: NotificationLevel, theme: MantineTheme) {
  const colorMapping = {
    quarter: theme.colors.green[6],
    half: theme.colors.yellow[6],
    threeQuarters: theme.colors.orange[6],
    full: theme.colors.red[6],
  }

  return colorMapping[usageLevel]
}

export function getRelaysByPercentage(
  level: NotificationLevel,
  relays: number = FREE_TIER_MAX_RELAYS,
) {
  switch (level) {
    case "quarter":
      return relays * 0.25
    case "half":
      return relays * 0.5
    case "threeQuarters":
      return relays * 0.75
    case "full":
      return relays
  }
}
