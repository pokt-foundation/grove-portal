import { Text, Radio, Grid } from "@pokt-foundation/pocket-blocks"
import clsx from "clsx"
import styles from "./styles.css"
import { useTranslate } from "~/context/TranslateContext"
import { PayPlanType } from "~/models/portal/sdk"
import { useFeatureFlags } from "~/context/FeatureFlagContext"

/* c8 ignore next */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

interface AppRadioCardsProps {
  radioData: {
    name: string
    value: string
    active: string
    price: number | string
    priceText: string
    cardDescription: string
  }[]
  currentRadio: string
  setRadio: Function
}

export default function AppRadioCards({
  radioData,
  setRadio,
  currentRadio,
}: AppRadioCardsProps) {
  const {
    t: { AppPlansOverview },
  } = useTranslate()
  const { flags } = useFeatureFlags()

  return (
    <Grid align="center" className="radio-card-grid">
      {radioData.map((radio) => (
        <Grid.Col
          key={radio.name}
          className={clsx({
            "order-first":
              flags.STRIPE_PAYMENT && radio.value === PayPlanType.PayAsYouGoV0,
          })}
          sm={12 / radioData.length}
          xs={12}
        >
          <div
            className={clsx(["radio-card", { active: radio.value === currentRadio }])}
            onClick={() => radio.active === "true" && setRadio(radio.value)}
          >
            <div className="flexRow">
              <Radio
                checked={radio.value === currentRadio}
                disabled={radio.active != "true"}
                label={radio.name}
                name="app-subscription"
                value={radio.value}
              />
              <Text>{radio.priceText}</Text>
            </div>
            <Text>{radio.cardDescription}</Text>
          </div>
        </Grid.Col>
      ))}
    </Grid>
  )
}
