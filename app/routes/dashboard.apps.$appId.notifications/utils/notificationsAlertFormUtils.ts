import { MantineTheme } from "@mantine/core"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"

export type NotificationLevel = "quarter" | "half" | "threeQuarters" | "full"

export const NOTIFICATIONS_ALERT_LEVELS: NotificationLevel[] = [
  "quarter",
  "half",
  "threeQuarters",
  "full",
]

export const DEFAULT_ALERT_PERCENTAGES = {
  quarter: false,
  half: false,
  threeQuarters: true,
  full: true,
}

export function getUsagePercentage(usageLevel: string): string {
  if (usageLevel === "quarter") {
    return "25%"
  } else if (usageLevel === "half") {
    return "50%"
  } else if (usageLevel === "threeQuarters") {
    return "75%"
  } else {
    return "100%"
  }
}

export function getBackgroundColor(usageLevel: string, theme: MantineTheme): string {
  if (usageLevel === "quarter") {
    return theme.colors.green[6]
  } else if (usageLevel === "half") {
    return theme.colors.yellow[6]
  } else if (usageLevel === "threeQuarters") {
    return theme.colors.orange[6]
  } else {
    return theme.colors.red[6]
  }
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
