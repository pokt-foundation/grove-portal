import { KeyValuePair } from "~/types/global"
import { dayjs } from "~/utils/dayjs"

export const INVOICE_STATUS_COLOR: KeyValuePair<"green" | "red" | "orange"> = {
  deleted: "red",
  uncollectible: "red",
  void: "red",
  pending: "orange",
  paid: "green",
}

export const CHARGE_STATUS_COLOR: KeyValuePair<"green" | "red" | "orange"> = {
  failed: "red",
  pending: "orange",
  succeeded: "green",
}

// https://stackoverflow.com/a/25548654/8149512
export const getStripeAmount = (amount: number | null | undefined): string =>
  (amount ? amount / 100 : 0).toFixed(2)

export const formatStripeDate = (ts: number, template: string = "Do MMM") =>
  dayjs.unix(Number(ts)).format(template)

export const getUnitPrice = (amount: string | undefined | null) => {
  if (!amount) {
    return "-"
  }
  const [whole, decimal] = amount.split(".")
  if (!decimal || Number(whole)) {
    return getStripeAmount(Number(amount))
  }
  return `${whole}.00${decimal}`
}
