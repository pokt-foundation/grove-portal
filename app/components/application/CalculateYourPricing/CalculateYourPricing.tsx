import { useMemo, useState } from "react"
import styles from "./styles.css"
import Button, { links as ButtonLinks } from "~/components/shared/Button"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { FREE_TIER_MAX_RELAYS } from "~/utils/pocketUtils"

// 365 / 12
const DAYS_IN_EACH_MONTH = 30.41

/* c8 ignore start */
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
/* c8 ignore stop */

interface CalculateYourPriceProps {
  price: number
}

export default function CalculateYourPricing({ price }: CalculateYourPriceProps) {
  const [relays, setRelays] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)

  const totalMonthly = useMemo(() => {
    if (relays > FREE_TIER_MAX_RELAYS) {
      return (
        (relays - FREE_TIER_MAX_RELAYS) *
        price *
        DAYS_IN_EACH_MONTH
      ).toLocaleString("en-US", { maximumFractionDigits: 2 })
    } else {
      return 0
    }
  }, [price, relays])

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
          value={relays.toLocaleString("en-US")}
          onChange={({ target: { value } }) => {
            if (!value.length) {
              setRelays(0)
              return
            }

            const valueWithoutCommas = parseFloat(value.replace(/,/g, ""))
            if (
              isNaN(valueWithoutCommas) ||
              Number(value) === Infinity ||
              value.length > 20
            ) {
              return
            }

            setRelays(valueWithoutCommas)
          }}
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

      <Modal opened={open} size={600} onClose={() => setOpen(false)}>
        <div className="calculate-your-pricing-modal">
          <h3>How is this price calculated</h3>
          <p>
            This formula is how Pocket portal calculates and charge you app relyas montly.
            If you want to learn more see our{" "}
            <a href="https://docs.pokt.network/home/">documentation</a>.
          </p>
          <p className="calculate-your-pricing-formula">
            <span>
              (Total daily relays <span className="symbol">-</span> &nbsp;
            </span>
            <span className="column">
              <span>free relays) &nbsp;</span>
              <span className="calculate-your-pricing-formula-value">
                {FREE_TIER_MAX_RELAYS.toLocaleString("en-US")}
              </span>
            </span>
            <span className="symbol">x&nbsp;</span>
            <span className="column">
              <span>price per relay</span>
              <span className="calculate-your-pricing-formula-value">${price}</span>
            </span>
            <span>
              {" "}
              <span className="symbol">&nbsp; =</span> Cost per day
            </span>
          </p>
          <p>
            The sum of each cost per day ={" "}
            <span className="calculate-your-pricing-conclusion">Monthly fee</span>
          </p>
          <div className="calculate-your-pricing-modal-footer">
            <Button variant="filled" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
