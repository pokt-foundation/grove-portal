import { PayPlanType } from "~/models/portal/sdk"
export const FREE_TIER_MAX_RELAYS = 100_000

export function isFreePlan(planType: PayPlanType) {
  return planType === PayPlanType.FreetierV0
}

export function isPaidPlan(planType: PayPlanType) {
  return planType === PayPlanType.PayAsYouGoV0
}

export function isEnterprisePlan(planType: PayPlanType) {
  return planType === PayPlanType.Enterprise
}

export function isLegacyPlan(planType: PayPlanType) {
  return !(
    planType === PayPlanType.PayAsYouGoV0 ||
    planType === PayPlanType.FreetierV0 ||
    planType === PayPlanType.Enterprise
  )
}

export const getPlanName = (planType: PayPlanType) => {
  switch (planType) {
    case PayPlanType.FreetierV0: {
      return "Starter"
    }
    case PayPlanType.PayAsYouGoV0: {
      return "Auto-Scale"
    }
    case PayPlanType.Enterprise: {
      return "Enterprise"
    }
    default: {
      return "Legacy"
    }
  }
}
