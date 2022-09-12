import { PayPlanType } from "~/models/portal/sdk"

export function log(...messages: unknown[]): void {
  if (process.env.NODE_ENV !== "production") {
    console.log(messages)
  }
}

/**
 * Shorten a string, `charsLength` allows to change the number of
 * characters on both sides of the ellipsis.
 *
 * Examples:
 *   shorten('D19731977931271')    // D1973…1271
 *   shorten('A19731977931271', 2) // A1…71
 *   shorten('F197319')            // F197319 (already short enough)
 *
 * @param {string} string The string to shorten
 * @param {number} [charsLength=4] The number of characters to change on both sides of the ellipsis
 * @returns {string} The shortened string
 */
export function shorten(string: string, characters = 4): string {
  if (!string) {
    return ""
  }
  if (string.length < characters) {
    return string
  }
  return string.slice(0, characters) + "…"
}

export function isFreePlan(planType: PayPlanType) {
  if (planType !== PayPlanType.FreetierV0) {
    return false
  }
  return true
}

export function isPaidPlan(planType: PayPlanType) {
  if (planType !== PayPlanType.PayAsYouGoV0) {
    return false
  }
  return true
}

export function isLegacyPlan(planType: PayPlanType) {
  if (planType === PayPlanType.PayAsYouGoV0 || planType === PayPlanType.FreetierV0) {
    return false
  }
  return true
}

export const getPlanName = (planType: PayPlanType) => {
  switch (planType) {
    case PayPlanType.FreetierV0: {
      return "Always Free"
    }
    case PayPlanType.PayAsYouGoV0: {
      return "Pay As You Go"
    }
    default: {
      return "Legacy"
    }
  }
}
