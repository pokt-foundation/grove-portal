// https://stackoverflow.com/a/25548654/8149512
import { dayjs } from "~/utils/dayjs"

export const getStripeAmount = (amount: number | null | undefined): number =>
  amount ? amount / 100 : 0

export const formatStripeDate = (ts: number, template: string = "Do MMM") =>
  dayjs.unix(Number(ts)).format(template)

export const getUnitPrice = (amount: string | undefined | null) => {
  if (!amount) {
    return "-"
  }
  const [whole, decimal] = amount.split(".")
  return `${whole}.00${decimal}`
}
