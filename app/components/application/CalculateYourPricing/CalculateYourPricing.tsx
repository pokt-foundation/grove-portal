import { useMemo, useState } from "react"
import styles from "./styles.css"
import Button, { links as ButtonLinks } from "~/components/shared/Button"
import Modal, { links as ModalLinks } from "~/components/shared/Modal"
import TextInput, { links as TextInputLinks } from "~/components/shared/TextInput"
import { useTranslate } from "~/context/TranslateContext"
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
  const { t } = useTranslate()
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
        <h3>{t.CalculateYourPricing.title}</h3>
        <p>{t.CalculateYourPricing.firstDescription}</p>
        <p>{t.CalculateYourPricing.secondDescription}</p>
        <TextInput
          rightSection={
            <span className="calculate-your-pricing-placeholder">
              {t.CalculateYourPricing.avgRelaysPerDay}
            </span>
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
            <h4>{t.CalculateYourPricing.pricePerRelay}</h4>
            <p>${price}</p>
          </div>
          <div className="divider" />
          <div>
            <h4>{t.CalculateYourPricing.totalMonthlyPrice}</h4>
            <p>${totalMonthly}</p>
          </div>
        </div>
      </div>
      <Button className="calculate-your-pricing-question" onClick={() => setOpen(true)}>
        {t.CalculateYourPricing.howIsThisCalculated}
      </Button>

      <Modal opened={open} size={600} onClose={() => setOpen(false)}>
        <div className="calculate-your-pricing-modal">
          <h3>{t.CalculateYourPricing.modalTitle}</h3>
          <p>
            {t.CalculateYourPricing.modalDescription}{" "}
            <a href="https://docs.pokt.network/home/">
              {t.CalculateYourPricing.secondModalDescription}
            </a>
            .
          </p>
          <p className="calculate-your-pricing-formula">
            <span>
              ({t.CalculateYourPricing.totalDailyRelays} <span className="symbol">-</span>{" "}
              &nbsp;
            </span>
            <span className="column">
              <span>{t.CalculateYourPricing.freeRelays}) &nbsp;</span>
              <span className="calculate-your-pricing-formula-value">
                {FREE_TIER_MAX_RELAYS.toLocaleString("en-US")}
              </span>
            </span>
            <span className="symbol">x&nbsp;</span>
            <span className="column">
              <span>{t.CalculateYourPricing.pricePerRelay}</span>
              <span className="calculate-your-pricing-formula-value">${price}</span>
            </span>
            <span>
              {" "}
              <span className="symbol">&nbsp; =</span> {t.CalculateYourPricing.costPerDay}
            </span>
          </p>
          <p>
            {t.CalculateYourPricing.sumPerDay} ={" "}
            <span className="calculate-your-pricing-conclusion">
              {t.CalculateYourPricing.monthlyFee}
            </span>
          </p>
          <div className="calculate-your-pricing-modal-footer">
            <Button variant="filled" onClick={() => setOpen(false)}>
              {t.CalculateYourPricing.done}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
