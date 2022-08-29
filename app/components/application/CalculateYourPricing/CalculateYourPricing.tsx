import { useState } from "react"
import styles from "./styles.css"
import Button, { links as ButtonLinks } from "~/components/shared/Button"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"

// 365 / 12
const DAYS_IN_EACH_MONTH = 30.41

export const links = () => {
  return [
    ...TextInputLinks(),
    ...ButtonLinks(),
    ...ModalLinks(),
    {
      rel: "stylesheet",
      href: styles,
    },
  ]
}

interface CalculateYourPriceProps {
  price: number
}

export default function CalculateYourPricing({ price }: CalculateYourPriceProps) {
  const [relays, setRelays] = useState<number>(1)
  const [open, setOpen] = useState<boolean>(false)

  let totalMonthly = 0
  if (relays > FREE_TIER_MAX_RELAYS) {
    totalMonthly = Number(
      ((relays - FREE_TIER_MAX_RELAYS) * price * DAYS_IN_EACH_MONTH).toFixed(2),
    )
  } else {
    totalMonthly = 0
  }

  return (
    <section className="calculate-your-pricing-container">
      <div className="calculate-your-pricing-card">
        <h3>Calculate your pricing</h3>
        <p>
          Use the calculator below to give you an estimate of what your monthly bill could
          look like.
        </p>
        <p>
          Enter the number of relays you think your app might consume in a day. Don’t
          exclude the free relays. We will do the math for you.
        </p>
        <TextInput
          rightSection={
            <span className="calculate-your-pricing-placeholder">AVG Relays per Day</span>
          }
          rightSectionWidth={160}
          value={relays}
          onChange={({ target: { value } }) => setRelays(Number(value))}
        />

        <div className="calculate-your-pricing-footer">
          <div>
            <h4>Price per Relay</h4>
            <p>${price}</p>
          </div>
          <div className="divider" />
          <div>
            <h4>Total Monthly Estimated Price</h4>
            <p>${totalMonthly}</p>
          </div>
        </div>
      </div>
      <Button className="calculate-your-pricing-question" onClick={() => setOpen(true)}>
        How is this calculated?
      </Button>

      <Modal
        opened={open}
        title="How is this price calculated"
        onClose={() => setOpen(false)}
      >
        <div></div>
      </Modal>
    </section>
  )
}
